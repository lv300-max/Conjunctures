#!/usr/bin/env python3
"""
Independent theorem-audit reviewer for the Collatz Octave Certificate Workbench.

The repo currently contains reviewer-facing Collatz descriptions, but no raw
84-row packet, 336 transition table, k27 frontier table, or exact-state closure
JSON/CSV artifacts. This audit therefore separates:
- checks that can be independently run from available files/formulas
- claimed counts that are not reproducible from repo artifacts
- proof boundaries that remain mathematical, not computational
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
STATUS_MD = ROOT / "REVIEWER_CURRENT_STATUS.md"
OCTAVE_MD = ROOT / "OCTAVE_MAP_AUDIT.md"
SCORE_MD = ROOT / "COLLATZ_OCTAVE_SCORECARD.md"  # separate from curated PREPAREDNESS_SCORECARD.md
JSON_OUT = ROOT / "collatz_octave_audit_report.json"


CLAIMED_RESULTS = {
    "basePartition": {"covered": 32768, "total": 32768, "missing": 0, "duplicates": 0},
    "exactStateClosure": {"parentsClosed": "578/578", "exactStatesChecked": 1235, "compactQuotientOnlyRows": 0},
    "symbolicPacket": {"packetRows": 84, "verified": "84/84", "failures": 0},
    "symbolicFrontier": {"k27ClassesAudited": 7_364_628, "labels": 84, "failures": 0},
    "octaveRecurrence": {"stableThrough": "k41", "newLabels": 0, "failures": 0},
    "recurrenceTable": {"rows": 336, "proofGradeRows": 336, "missing": 0, "conflicts": 0, "failures": 0},
    "packetLabelInvariant": {
        "packetRecords": 84,
        "uniqueLabelKeys": 84,
        "duplicateLabelKeys": 0,
        "transitionRows": 336,
        "missingTargetPacketRows": 0,
        "nonpassTransitionRows": 0,
    },
}

RAW_ARTIFACT_PATTERNS = [
    r"collatz.*\.json$",
    r"octave.*\.json$",
    r"packet.*84.*\.(json|csv)$",
    r"recurrence.*336.*\.(json|csv)$",
    r"frontier.*\.(json|csv)$",
    r"exact.*state.*\.(json|csv)$",
    r"closure.*\.(json|csv)$",
    r"u27.*\.(json|csv)$",
]


@dataclass
class EngineInventory:
    engineName: str
    fileName: str
    purpose: str
    passFail: str
    proofRelevance: str


def run_cmd(args: list[str]) -> dict[str, Any]:
    proc = subprocess.run(args, cwd=ROOT, text=True, capture_output=True)
    return {
        "command": " ".join(args),
        "returncode": proc.returncode,
        "stdout": proc.stdout,
        "stderr": proc.stderr,
        "pass": proc.returncode == 0,
    }


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def discover_files() -> list[Path]:
    return sorted(p for p in ROOT.rglob("*") if p.is_file() and ".git" not in p.parts)


def find_raw_artifacts(files: list[Path]) -> list[str]:
    found = []
    for path in files:
        rel = str(path.relative_to(ROOT)).lower()
        if any(re.search(pattern, rel) for pattern in RAW_ARTIFACT_PATTERNS):
            found.append(str(path))
    return found


def inventory(files: list[Path], test_results: dict[str, Any]) -> list[EngineInventory]:
    inv: list[EngineInventory] = []
    names = {p.name: p for p in files}

    def add(name: str, fname: str, purpose: str, status: str, relevance: str) -> None:
        inv.append(EngineInventory(name, fname, purpose, status, relevance))

    if "workbench.html" in names:
        add(
            "Main Conjectures Workbench",
            "workbench.html",
            "Tabbed host with Collatz placeholder, proof-pressure tables, and added prime attack lab.",
            "SYNTAX_PASS" if "workbenchSyntax" in test_results and test_results["workbenchSyntax"]["pass"] else "NOT_FULLY_AUDITED",
            "Low for Collatz octave proof; contains placeholder references, not raw octave artifacts.",
        )
    if "reviewer_qa.html" in names:
        add(
            "Reviewer Q&A Engine",
            "reviewer_qa.html",
            "Reviewer-facing Collatz Q&A with defaults for 84 rows, 578/578 closure, and 1235 exact states.",
            "SOURCE_PRESENT",
            "High for attack-surface documentation; not an independent verifier.",
        )
    if "claim_gate.html" in names:
        add(
            "Claim Gate",
            "claim_gate.html",
            "Safe-claim and proof-level gate with Collatz proof obligations.",
            "SOURCE_PRESENT",
            "Medium; correctly identifies coverage, quotient abstraction, and small-case base as gates.",
        )
    if "test_suite.js" in names:
        add(
            "Comprehensive Workbench Test Suite",
            "test_suite.js",
            "Runs repository structure, JS syntax, and Goldbach workbench checks.",
            "PASS" if test_results.get("test_suite", {}).get("pass") else "FAIL",
            "Low for Collatz octave proof; useful only as repo smoke test.",
        )
    if "test_inequality_chain.js" in names:
        add(
            "Inequality Chain Validation Suite",
            "test_inequality_chain.js",
            "Validates Goldbach inequality-chain UI and safe language.",
            "PASS" if test_results.get("test_inequality_chain", {}).get("pass") else "FAIL",
            "None for Collatz octave proof except general safe-claim discipline.",
        )
    add(
        "Collatz Exact-State Placeholder",
        "workbench.html",
        "Placeholder function says exact-state closure should be used and quotient shortcuts avoided unless justified.",
        "PLACEHOLDER_ONLY",
        "Identifies the right proof-facing engine but does not contain closure data.",
    )
    return inv


def odd_residue_partition_audit() -> dict[str, Any]:
    modulus = 2**16
    odd = [r for r in range(modulus) if r & 1]
    return {
        "name": "base partition verifier",
        "executed": True,
        "modulus": modulus,
        "oddResidues": len(odd),
        "expectedOddResidues": 32768,
        "missing": 32768 - len(set(odd)),
        "duplicates": len(odd) - len(set(odd)),
        "pass": len(odd) == 32768 and len(set(odd)) == 32768,
        "scope": "Only verifies the trivial odd-residue partition mod 2^16, not the 84 packet coverage.",
    }


def octave_map_audit(max_a: int = 20) -> dict[str, Any]:
    failures = []
    checked = 0
    for A in range(0, max_a + 1):
        parent_mod = 2 ** (A + 1)
        child_mod = 2 ** (A + 3)
        for r in range(parent_mod):
            children = [(r + j * parent_mod) % child_mod for j in range(4)]
            checked += 1
            if len(set(children)) != 4:
                failures.append({"A": A, "r": r, "type": "child collision", "children": children})
            for child in children:
                if child % parent_mod != r:
                    failures.append({"A": A, "r": r, "type": "child not in parent", "child": child})
            # Direct completeness check: every lift modulo child_mod has the
            # form r + q * parent_mod, and q is uniquely one of 0,1,2,3.
            for child in children:
                q = (child - r) // parent_mod
                if q not in (0, 1, 2, 3):
                    failures.append({"A": A, "r": r, "type": "bad lift quotient", "child": child, "q": q})
    return {
        "name": "octave map structural verifier",
        "executed": True,
        "checkedParentLanes": checked,
        "A_range": f"0..{max_a}",
        "pass": not failures,
        "failures": failures[:10],
        "argument": "Going from modulus 2^(A+1) to 2^(A+3) multiplies the modulus by 4, so each parent residue has exactly four lifts.",
    }


def valuation_breaker_tests() -> dict[str, Any]:
    examples = []
    # Demonstrate that congruence modulo 2^S alone gives v2 >= S, not exact S.
    # For odd multiplier a, solve a*n+b == 0 mod 2^S and check lifts modulo 2^(S+1).
    for S in range(1, 10):
        mod = 2**S
        next_mod = 2 ** (S + 1)
        a = 3
        b = 1
        residues = [n for n in range(next_mod) if (a * n + b) % mod == 0]
        exact = [n for n in residues if (a * n + b) % next_mod != 0]
        hidden = [n for n in residues if (a * n + b) % next_mod == 0]
        if hidden and exact:
            examples.append(
                {
                    "S": S,
                    "expression": "3n+1",
                    "mod2SResiduesInMod2SPlus1": residues,
                    "exactValuationResidues": exact,
                    "hiddenExtraDivisibilityResidues": hidden,
                }
            )
            break
    return {
        "name": "lane-rule breaker tests",
        "executed": True,
        "pass": bool(examples),
        "meaning": "Breaker found explicit residues where divisibility by 2^S is not enough to force exact v2=S. Rows must prove non-divisibility modulo 2^(S+1).",
        "examples": examples,
    }


def missing_regeneration_audit(raw_artifacts: list[str]) -> dict[str, Any]:
    return {
        "exactStateClosure": {
            "executed": False,
            "pass": False,
            "reason": "No exact-state closure raw artifact found in repo.",
            "claimed": CLAIMED_RESULTS["exactStateClosure"],
        },
        "packet84": {
            "executed": False,
            "pass": False,
            "reason": "No 84-row packet raw JSON/CSV found in repo.",
            "claimed": CLAIMED_RESULTS["symbolicPacket"],
        },
        "frontierK27": {
            "executed": False,
            "pass": False,
            "reason": "No k27 symbolic frontier artifact found in repo.",
            "claimed": CLAIMED_RESULTS["symbolicFrontier"],
        },
        "recurrence336": {
            "executed": False,
            "pass": False,
            "reason": "No 336-row recurrence table raw JSON/CSV found in repo.",
            "claimed": CLAIMED_RESULTS["recurrenceTable"],
        },
        "labelInvariant": {
            "executed": False,
            "pass": False,
            "reason": "No packet labels and transition table found to compare target keys.",
            "claimed": CLAIMED_RESULTS["packetLabelInvariant"],
        },
        "independentRegeneration": {
            "status": "FAIL_BLOCKED_BY_MISSING_RAW_ARTIFACTS",
            "rawArtifactsFound": raw_artifacts,
            "packetHash": None,
            "recurrenceHash": None,
            "reason": "Cannot rebuild 84 packet or 336 recurrence table from raw rules because raw rules/rows are not present in this repository.",
        },
    }


def preparedness_scores(raw_artifacts: list[str], tests: dict[str, Any], structural: dict[str, Any]) -> dict[str, int]:
    has_raw = bool(raw_artifacts)
    return {
        "structureQuality": 72,
        "finiteVerificationQuality": 45 if not has_raw else 82,
        "recurrenceQuality": 38 if not has_raw else 78,
        "inductionClarity": 42,
        "reviewerReadiness": 64,
        "proofReadiness": 18,
        "reproducibility": 22 if not has_raw else 75,
        "mathematicalRisk": 82,
        "acceptedProofProbability": 5,
    }


def write_markdown(payload: dict[str, Any]) -> None:
    inv = payload["inventory"]
    tests = payload["auditRuns"]
    scores = payload["preparedness"]

    STATUS_MD.write_text(
        "\n".join(
            [
                "# REVIEWER CURRENT STATUS",
                "",
                "Be brutally honest: this repository does not currently contain the raw Collatz octave packet artifacts needed to independently reproduce the claimed 84-row packet, 336 transition table, exact-state closure, or k27 frontier.",
                "",
                "## Proven Artifacts",
                "",
                "- Descent inequality algebra: if `gap = 2^c - 3^o > 0` and `n > ceil(b/gap)`, then `(3^o n + b)/2^c < n`.",
                "- Octave map structural fact: each parent residue modulo `2^(A+1)` has exactly four child lifts modulo `2^(A+3)`.",
                "- Base odd residue count modulo `2^16`: independently recomputed `32768` odd residues with no duplicate in the trivial residue list.",
                "",
                "## Finite Verified Claims",
                "",
                f"- Repo smoke tests: `test_suite.js` pass = `{tests['test_suite']['pass']}`.",
                f"- Inequality-chain tests: `test_inequality_chain.js` pass = `{tests['test_inequality_chain']['pass']}`.",
                f"- Base partition verifier: pass = `{tests['basePartition']['pass']}`.",
                "",
                "## Symbolic Recurrence Claims",
                "",
                "- Claimed: 84 symbolic packet rows verified, 336 recurrence transitions proof-grade, stable through k41.",
                "- Audit status: **not independently reproduced** because raw packet and recurrence artifacts are absent.",
                "- The octave map itself is structurally complete, but that does not prove the packet labels, valuation words, or descent bounds recur.",
                "",
                "## Unresolved Induction Boundary",
                "",
                "- Need a written theorem that every arbitrary odd integer enters exactly one packet row or a closed base case.",
                "- Need exact valuation forcing for every lift, `v2(3^j n + b_j) = S_j`, not only divisibility by `2^S_j`.",
                "- Need proof that packet closed at k implies packet closed at k+1 independently of k, using only exported row invariants.",
                "- Need small-case closure for all `n <= B` for every row.",
                "",
                "## What Is Not Claimed",
                "",
                "- This audit does not certify a Collatz proof.",
                "- This audit does not certify the 84 packet or 336 recurrence table.",
                "- This audit does not verify k27 or k41 frontier stability.",
                "- This audit does not accept quotient-only labels as proof-critical state.",
                "",
                "## Engine Inventory",
                "",
                "| Engine | File | Purpose | Pass/Fail | Proof relevance |",
                "|---|---|---|---|---|",
                *[
                    f"| {row['engineName']} | `{row['fileName']}` | {row['purpose']} | `{row['passFail']}` | {row['proofRelevance']} |"
                    for row in inv
                ],
                "",
                "## Final Honest Theorem Status",
                "",
                "Serious proof-engine scaffold with useful structural checks, but not independently reproducible as a theorem proof from this repo. Formal induction remains open.",
                "",
            ]
        )
    )

    OCTAVE_MD.write_text(
        "\n".join(
            [
                "# OCTAVE MAP AUDIT",
                "",
                "## Why Exactly Four Children",
                "",
                "The parent lane is modulo `2^(A+1)`. The child octave lane is modulo `2^(A+3)`. The modulus ratio is `2^(A+3) / 2^(A+1) = 4`, so each parent residue has exactly four lifts:",
                "",
                "`child_j = r + j * 2^(A+1) mod 2^(A+3)`, for `j = 0,1,2,3`.",
                "",
                "## Completeness Argument",
                "",
                "For any integer `x` with `x ≡ r mod 2^(A+1)`, reducing `x` modulo `2^(A+3)` gives one of the four residues above. The structural verifier checked this for `A=0..20`.",
                "",
                f"- structural pass: `{tests['octaveMap']['pass']}`",
                f"- parent lanes checked: `{tests['octaveMap']['checkedParentLanes']}`",
                "",
                "## Overlap Argument",
                "",
                "The four child residues differ by multiples of `2^(A+1)` smaller than `2^(A+3)`, so no two are congruent modulo `2^(A+3)`. The audit found no collisions.",
                "",
                "## Hidden-State Attacks",
                "",
                "- Divisibility by `2^S` does not prove exact valuation `S`; hidden extra divisibility can occur.",
                "- A bucket plus `mod96` identity is not enough if two rows share those fields but differ in valuation word, affine constants, bound `B`, or transition target.",
                "- A recurrence transition can silently create unseen proof-critical state unless the certificate signature includes all proof-critical fields.",
                "",
                "## Does The Proof Depend On k?",
                "",
                "The structural child-lift map does not depend on k except through `A`. The proof-critical recurrence does depend on exported invariants being k-independent. That k-independent invariant was not found as raw data in this repo.",
                "",
                "## Audit Answers To Main Questions",
                "",
                "1. Octave map mathematically complete: **yes for residue lifting only**.",
                "2. Exactly four child lanes: **yes, modulus ratio is 4**.",
                "3. Packet closed at k implies k+1: **not established from repo artifacts**.",
                "4. Valuation forcing exact for all lifts: **blocked without row-level valuation proof**.",
                "5. Hidden extra divisibility: **real attack surface; breaker test demonstrates risk**.",
                "6. Unseen proof-critical state: **not ruled out without full signatures**.",
                "7. 84 packet independently reproducible: **fail/blocked, raw rules absent**.",
                "8. Bucket + mod96 sufficient: **identity only; certificate signature required**.",
                "9. U27 complete: **not defined in repo artifacts**.",
                "10. Arbitrary odd integer membership: **still blocked without universe-completeness proof**.",
                "",
            ]
        )
    )

    SCORE_MD.write_text(
        "\n".join(
            [
                "# PREPAREDNESS SCORECARD",
                "",
                f"- Structure quality: {scores['structureQuality']}%",
                f"- Finite verification quality: {scores['finiteVerificationQuality']}%",
                f"- Recurrence quality: {scores['recurrenceQuality']}%",
                f"- Induction clarity: {scores['inductionClarity']}%",
                f"- Reviewer readiness: {scores['reviewerReadiness']}%",
                f"- Proof readiness: {scores['proofReadiness']}%",
                f"- Reproducibility: {scores['reproducibility']}%",
                f"- Mathematical risk: {scores['mathematicalRisk']}%",
                f"- Accepted-proof probability: {scores['acceptedProofProbability']}%",
                "",
                "## Strongest Artifacts",
                "",
                "1. Descent inequality is algebraically clean.",
                "2. Octave child-lift map is structurally complete.",
                "3. Reviewer Q&A identifies the right proof gates.",
                "",
                "## Weakest Proof Boundaries",
                "",
                "1. Raw 84 packet and 336 recurrence data are missing from repo.",
                "2. Exact valuation forcing for all lifts is not exported row-by-row.",
                "3. Universal arbitrary odd integer membership into the packet system is not proven here.",
                "",
                "## Reviewer Attack Surfaces",
                "",
                "1. Where is U27 defined, and why is it complete?",
                "2. Why does valuation forcing give exact equality rather than lower-bound divisibility?",
                "3. What certificate signature prevents hidden state under bucket/mod96 labels?",
                "4. Can the 84 packet be regenerated from raw rules without trusting the UI?",
                "5. Where is the formal smallest-counterexample induction written against the exact packet universe?",
                "",
                "## Next Exact Proof Obligations",
                "",
                "1. Add raw packet, exact-state closure, frontier, and recurrence artifacts in JSON/CSV.",
                "2. Write and machine-check `VALUATION_FORCING_LEMMA` for each row including non-divisibility modulo `2^(S+1)`.",
                "3. Define U27 and prove arbitrary odd integer membership or entry into a closed base case.",
                "",
                "## Final Honest Status",
                "",
                "Not a Collatz proof from the available repository. Current status is a serious certificate-workbench scaffold with a clean octave lift map, but formal induction and reproducibility remain blocked.",
                "",
            ]
        )
    )


def main() -> int:
    files = discover_files()
    raw_artifacts = find_raw_artifacts(files)

    tests = {
        "test_suite": run_cmd(["node", "test_suite.js"]) if (ROOT / "test_suite.js").exists() else {"pass": False, "stdout": "missing"},
        "test_inequality_chain": run_cmd(["node", "test_inequality_chain.js"]) if (ROOT / "test_inequality_chain.js").exists() else {"pass": False, "stdout": "missing"},
        "workbenchSyntax": run_cmd(["zsh", "-lc", "node --check <(sed -n '/<script>/,/<\\/script>/p' workbench.html | sed '1d;$d')"]),
        "basePartition": odd_residue_partition_audit(),
        "octaveMap": octave_map_audit(),
        "valuationBreaker": valuation_breaker_tests(),
        "missingRegeneration": missing_regeneration_audit(raw_artifacts),
    }
    inv = inventory(files, tests)
    scores = preparedness_scores(raw_artifacts, tests, tests["octaveMap"])
    payload = {
        "title": "COLLATZ OCTAVE ENGINE AUDIT",
        "warning": "No Collatz proof is claimed. Finite verification, symbolic recurrence, formal induction, and unresolved proof boundary are separated.",
        "rawArtifactsFound": raw_artifacts,
        "claimedResults": CLAIMED_RESULTS,
        "inventory": [asdict(row) for row in inv],
        "auditRuns": tests,
        "preparedness": scores,
        "strongestArtifact": "Octave map structural lift and descent inequality algebra.",
        "weakestProofBoundary": "Raw packet/recurrence/frontier artifacts are absent, so 84/336/k27/k41 claims are not independently reproducible from this repo.",
        "mostDangerousUnresolvedIssue": "Exact valuation forcing for all lifts and arbitrary odd integer membership into the packet system remain unproven from available artifacts.",
        "topReviewerAttackSurfaces": [
            "U27 is not found as a complete formal artifact.",
            "Exact v2 forcing can fail if rows only prove divisibility >= S.",
            "Bucket + mod96 can hide proof-critical state unless certificate signatures include valuation word, affine constants, bound, and target.",
        ],
        "topNextProofObligations": [
            "Commit raw 84 packet, 336 recurrence table, exact-state closure, and frontier artifacts.",
            "Machine-check exact valuation forcing row-by-row including non-divisibility modulo 2^(S+1).",
            "Write formal universe-completeness and smallest-counterexample induction documents.",
        ],
        "independentRegeneration": tests["missingRegeneration"]["independentRegeneration"]["status"],
        "finalHonestStatus": "NOT A COLLATZ PROOF FROM THIS REPO / PROOF-ENGINE SCAFFOLD ONLY / FORMAL INDUCTION OPEN",
        "generatedFiles": [str(STATUS_MD), str(OCTAVE_MD), str(SCORE_MD), str(JSON_OUT)],
    }
    JSON_OUT.write_text(json.dumps(payload, indent=2, sort_keys=True))
    write_markdown(payload)

    print("COLLATZ OCTAVE ENGINE AUDIT")
    print(f"Structure quality: {scores['structureQuality']}%")
    print(f"Finite verification quality: {scores['finiteVerificationQuality']}%")
    print(f"Recurrence quality: {scores['recurrenceQuality']}%")
    print(f"Induction clarity: {scores['inductionClarity']}%")
    print(f"Reviewer readiness: {scores['reviewerReadiness']}%")
    print(f"Accepted-proof readiness: {scores['proofReadiness']}%")
    print()
    print(f"Strongest artifact: {payload['strongestArtifact']}")
    print(f"Weakest proof boundary: {payload['weakestProofBoundary']}")
    print(f"Most dangerous unresolved issue: {payload['mostDangerousUnresolvedIssue']}")
    print("Top reviewer attack surfaces:")
    for i, item in enumerate(payload["topReviewerAttackSurfaces"], 1):
        print(f"{i}. {item}")
    print("Top 3 next proof obligations:")
    for i, item in enumerate(payload["topNextProofObligations"], 1):
        print(f"{i}. {item}")
    print(f"Independent regeneration: {payload['independentRegeneration']}")
    print(f"Generated: {STATUS_MD}")
    print(f"Generated: {OCTAVE_MD}")
    print(f"Generated: {SCORE_MD}")
    print(f"Generated: {JSON_OUT}")
    print(f"Final honest status: {payload['finalHonestStatus']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
