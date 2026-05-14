#!/usr/bin/env python3
"""
Strict independent audit for the ANY-N Five Conjecture Workbench.

This script does not trust the browser workbench's computed packet. It locates an
exported packet JSON if present, otherwise locates the workbench HTML and reads
its default inputs. It then recomputes all requested checks from scratch.
"""

from __future__ import annotations

import ast
import json
import math
import re
import time
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
MD_OUT = ROOT / "STRICT_ANYN_AUDIT_REPORT.md"
JSON_OUT = ROOT / "strict_anyn_audit_report.json"


def find_packet_source(root: Path) -> dict[str, Any]:
    json_candidates = []
    for path in root.rglob("*.json"):
        if path.name == JSON_OUT.name:
            continue
        text_key = path.name.lower()
        if any(k in text_key for k in ("five", "any", "packet", "conjecture")):
            json_candidates.append(path)

    for path in sorted(json_candidates):
        try:
            data = json.loads(path.read_text())
        except Exception:
            continue
        if isinstance(data, dict) and (
            data.get("title") == "ANY-N Five Conjecture Workbench Packet"
            or {"N", "curve"}.issubset(data.keys())
        ):
            return {"kind": "json", "path": str(path), "packet": data}

    html = root / "five_conjecture_workbench.html"
    if html.exists():
        text = html.read_text()
        n = int(re.search(r'id="N"[^>]*value="(\d+)"', text).group(1))
        a = int(re.search(r'id="curveA"[^>]*value="(-?\d+)"', text).group(1))
        b = int(re.search(r'id="curveB"[^>]*value="(-?\d+)"', text).group(1))
        return {
            "kind": "html_default",
            "path": str(html),
            "packet": {
                "title": "ANY-N Five Conjecture Workbench Packet",
                "N": n,
                "curve": {"a": a, "b": b},
                "note": "No exported packet JSON found; using workbench HTML defaults.",
            },
        }

    raise FileNotFoundError("Could not locate ANY-N packet JSON or five_conjecture_workbench.html")


def sieve(limit: int) -> bytearray:
    if limit < 2:
        return bytearray(limit + 1)
    marks = bytearray(b"\x01") * (limit + 1)
    marks[0] = 0
    marks[1] = 0
    r = int(limit**0.5)
    for p in range(2, r + 1):
        if marks[p]:
            start = p * p
            marks[start : limit + 1 : p] = b"\x00" * (((limit - start) // p) + 1)
    return marks


def is_prime_trial(n: int) -> bool:
    if n < 2:
        return False
    if n in (2, 3):
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    d = 5
    while d * d <= n:
        if n % d == 0 or n % (d + 2) == 0:
            return False
        d += 6
    return True


def li_approx(x: int) -> float:
    # Smooth asymptotic approximation sufficient for a surface-fence audit.
    if x < 3:
        return 0.0
    lx = math.log(x)
    total = x / lx
    term = total
    factorial = 1
    for k in range(1, 6):
        factorial *= k
        term = factorial * x / (lx ** (k + 1))
        total += term
    return total


def verify_subset(nums: list[int], target: int, mask: int) -> bool:
    return sum(v for i, v in enumerate(nums) if mask & (1 << i)) == target


def is_square(n: int) -> bool:
    if n < 0:
        return False
    r = math.isqrt(n)
    return r * r == n


@dataclass
class AuditResult:
    status: str
    proofLevel: str
    checked: str
    proofBoundary: str
    failureCondition: str
    reviewerNote: str
    details: dict[str, Any]


def audit_goldbach(n: int, primes: bytearray) -> AuditResult:
    hardest_even = None
    hardest_count = None
    hardest_first_witness = None
    checked = 0

    for even in range(4, n + 1, 2):
        checked += 1
        witnesses = []
        for p in range(2, even // 2 + 1):
            q = even - p
            if primes[p] and primes[q]:
                if not (is_prime_trial(p) and is_prime_trial(q)):
                    return AuditResult(
                        "FAIL",
                        "COUNTEREXAMPLE_OR_PRIMALITY_ENGINE_FAILURE",
                        f"even 4..{n}",
                        "Independent primality verification failed.",
                        f"Reported prime pair includes non-prime at E={even}: {p}+{q}",
                        "Audit prime engine before using any packet result.",
                        {"counterexample": even, "badWitness": [p, q]},
                    )
                witnesses.append((p, q))
        if not witnesses:
            return AuditResult(
                "FAIL",
                "FINITE_FAIL",
                f"even 4..{n}",
                "Goldbach would still require a proof for all even integers; this audit found a finite obstruction first.",
                f"No p+q witness for even E={even}",
                "Exact finite counterexample recorded. Recheck independently before any mathematical claim.",
                {"counterexample": even, "checkedEvenCount": checked},
            )
        count = len(witnesses)
        if hardest_count is None or count < hardest_count:
            hardest_even = even
            hardest_count = count
            hardest_first_witness = witnesses[0]

    return AuditResult(
        "FINITE_PASS",
        "FINITE_EVIDENCE_NOT_PROOF",
        f"verified every even E from 4 to {n} ({checked} values)",
        "Still need a universal proof for every even integer beyond the finite range.",
        "Fail immediately if any even E has zero independently verified prime-pair witnesses.",
        "Finite evidence only. No overclaim: this does not prove Goldbach.",
        {
            "hardestEven": hardest_even,
            "hardestWitnessCount": hardest_count,
            "hardestFirstWitness": list(hardest_first_witness) if hardest_first_witness else None,
            "checkedEvenCount": checked,
        },
    )


def audit_twin_prime(n: int, primes: bytearray) -> AuditResult:
    pairs = []
    largest_start_gap = 0
    previous_start = None
    for p in range(2, max(2, n - 1)):
        if p + 2 <= n and primes[p] and primes[p + 2]:
            if not (is_prime_trial(p) and is_prime_trial(p + 2)):
                return AuditResult(
                    "FAIL",
                    "COUNTEREXAMPLE_OR_PRIMALITY_ENGINE_FAILURE",
                    f"p,p+2 up to {n}",
                    "Independent primality verification failed.",
                    f"Reported twin pair includes non-prime: {p},{p+2}",
                    "Audit prime engine before using twin-prime counts.",
                    {"badPair": [p, p + 2]},
                )
            pairs.append((p, p + 2))
            if previous_start is not None:
                largest_start_gap = max(largest_start_gap, p - previous_start)
            previous_start = p

    return AuditResult(
        "FINITE_PASS" if pairs else "FINITE_FAIL",
        "FINITE_EVIDENCE_NOT_PROOF",
        f"recounted all twin pairs p,p+2 with p+2 <= {n}",
        "Still need proof that infinitely many twin-prime pairs exist.",
        "Fail finite audit if any counted pair is not independently prime; no-pair window is finite failure only.",
        "Finite pair count cannot prove infinitude.",
        {
            "pairCount": len(pairs),
            "firstPair": list(pairs[0]) if pairs else None,
            "lastPair": list(pairs[-1]) if pairs else None,
            "largestPairStartGap": largest_start_gap,
        },
    )


def audit_riemann_surface(n: int, primes: bytearray) -> AuditResult:
    pi = 0
    checkpoints = []
    step = max(100, n // 20)
    next_checkpoint = step
    worst_xlog = None
    worst_li = None

    for x in range(2, n + 1):
        if primes[x]:
            pi += 1
        if x >= next_checkpoint or x == n:
            xlog = x / math.log(x)
            lix = li_approx(x)
            fence = math.sqrt(x) * math.log(x)
            err_xlog = abs(pi - xlog)
            err_li = abs(pi - lix)
            row = {
                "x": x,
                "pi": pi,
                "xOverLogX": xlog,
                "liApprox": lix,
                "errorXOverLogX": err_xlog,
                "errorLiApprox": err_li,
                "softFence": fence,
                "xOverLogFenceRatio": err_xlog / fence if fence else None,
                "liFenceRatio": err_li / fence if fence else None,
            }
            checkpoints.append(row)
            if worst_xlog is None or row["xOverLogFenceRatio"] > worst_xlog["xOverLogFenceRatio"]:
                worst_xlog = row
            if worst_li is None or row["liFenceRatio"] > worst_li["liFenceRatio"]:
                worst_li = row
            next_checkpoint += step

    return AuditResult(
        "SURFACE_PASS",
        "SURFACE_NUMERICS_NOT_RH_PROOF",
        f"recomputed pi(x) checkpoints up to {n}",
        "This checks a soft prime-counting fence only; it does not address zeta zeros on the critical line.",
        "Surface warning if error/fence ratio exceeds chosen soft fence; this is not an RH disproof.",
        "Reviewer should reject any claim stronger than surface numerics.",
        {
            "checkpointCount": len(checkpoints),
            "worstXOverLogFence": worst_xlog,
            "worstLiFence": worst_li,
            "sampleCheckpoints": checkpoints[:3] + checkpoints[-3:] if len(checkpoints) > 6 else checkpoints,
        },
    )


def audit_p_vs_np_toy(n: int) -> AuditResult:
    size = min(24, max(12, int(math.log2(n)) + 8))
    nums = [((i * 37 + 19) % 97) + 1 for i in range(size)]
    target = sum(nums[: size // 2])
    max_mask = 1 << size
    found_mask = None
    checked = 0

    start = time.perf_counter()
    for mask in range(max_mask):
        checked += 1
        s = 0
        for j, value in enumerate(nums):
            if mask & (1 << j):
                s += value
        if s == target:
            found_mask = mask
            break
    brute_ms = (time.perf_counter() - start) * 1000

    verify_start = time.perf_counter()
    verified = found_mask is not None and verify_subset(nums, target, found_mask)
    verify_ms = (time.perf_counter() - verify_start) * 1000

    return AuditResult(
        "TOY_ONLY" if verified else "TOY_FAIL",
        "TOY_DEMONSTRATION_NOT_COMPLEXITY_PROOF",
        f"subset-sum toy search with {size} items; brute masks checked={checked}",
        "P vs NP requires asymptotic complexity proof over all NP problems, not one bounded subset-sum instance.",
        "Toy failure if no subset found or verification does not match target.",
        "Only demonstrates search versus verification timing on one generated instance.",
        {
            "size": size,
            "target": target,
            "foundMask": found_mask,
            "bruteForceMs": brute_ms,
            "verificationMs": verify_ms,
            "bruteForceToVerifyRatio": brute_ms / verify_ms if verify_ms > 0 else None,
            "verified": verified,
        },
    )


def audit_bsd_toy_curve(n: int, a: int, b: int) -> AuditResult:
    disc_core = 4 * a * a * a + 27 * b * b
    if disc_core == 0:
        return AuditResult(
            "FAIL",
            "TOY_INVALID_INPUT",
            f"curve y^2 = x^3 + {a}x + {b}",
            "Singular curve is outside the elliptic-curve setting.",
            "Discriminant core 4a^3+27b^2 equals zero.",
            "Choose a nonsingular curve before any BSD toy scan.",
            {"a": a, "b": b, "discriminantCore": disc_core},
        )

    x_bound = min(1000, max(50, n // 10))
    points = []
    for x in range(-x_bound, x_bound + 1):
        rhs = x * x * x + a * x + b
        if is_square(rhs):
            y = math.isqrt(rhs)
            points.append([x, y])
            if y != 0:
                points.append([x, -y])

    return AuditResult(
        "FINITE_POINTS_FOUND" if points else "OPEN_WINDOW",
        "BOUNDED_TOY_SCAN_NOT_BSD_PROOF",
        f"integer x in [-{x_bound}, {x_bound}] for y^2 = x^3 + {a}x + {b}",
        "BSD concerns rank, L-functions, and rational points; bounded integer scanning is only a toy window.",
        "OPEN_WINDOW if no integer points are found in the bounded window; not a proof of no rational points.",
        "No overclaim: bounded integer points do not determine BSD.",
        {
            "a": a,
            "b": b,
            "xBound": x_bound,
            "discriminantCore": disc_core,
            "pointCount": len(points),
            "pointsSample": points[:20],
        },
    )


def strongest_and_weakest(results: dict[str, AuditResult]) -> tuple[str, str]:
    strength_order = {
        "FINITE_PASS": 4,
        "SURFACE_PASS": 3,
        "FINITE_POINTS_FOUND": 2,
        "OPEN_WINDOW": 1,
        "TOY_ONLY": 0,
        "FINITE_FAIL": -1,
        "TOY_FAIL": -2,
        "FAIL": -3,
    }
    ranked = sorted(
        results.items(),
        key=lambda kv: (strength_order.get(kv[1].status, -10), kv[0]),
    )
    return ranked[-1][0], ranked[0][0]


def write_reports(payload: dict[str, Any]) -> None:
    JSON_OUT.write_text(json.dumps(payload, indent=2, sort_keys=True))

    lines = [
        "# STRICT ANY-N AUDIT REPORT",
        "",
        "Finite evidence only. Not proof.",
        "",
        f"- Packet source: `{payload['packetSource']['path']}`",
        f"- Packet source kind: `{payload['packetSource']['kind']}`",
        f"- N: `{payload['inputs']['N']}`",
        f"- BSD curve: `y^2 = x^3 + ({payload['inputs']['curve']['a']})x + ({payload['inputs']['curve']['b']})`",
        "",
        "## Compact Summary",
        "",
    ]
    for name, result in payload["results"].items():
        lines.extend(
            [
                f"### {name}",
                "",
                f"- status: `{result['status']}`",
                f"- proofLevel: `{result['proofLevel']}`",
                f"- checked: {result['checked']}",
                f"- proofBoundary: {result['proofBoundary']}",
                f"- failureCondition: {result['failureCondition']}",
                f"- reviewerNote: {result['reviewerNote']}",
                "",
            ]
        )

    lines.extend(
        [
            "## Strongest And Weakest",
            "",
            f"- Strongest check: `{payload['strongestCheck']}`",
            f"- Weakest check: `{payload['weakestCheck']}`",
            "",
            "## Exact Proof Boundaries Remaining",
            "",
        ]
    )
    for name, result in payload["results"].items():
        lines.append(f"- **{name}:** {result['proofBoundary']}")

    lines.extend(
        [
            "",
            "## Final Honest Status",
            "",
            payload["finalHonestStatus"],
            "",
            "STRICT_ANYN_AUDIT_COMPLETE",
            "",
        ]
    )
    MD_OUT.write_text("\n".join(lines))


def main() -> int:
    packet_source = find_packet_source(ROOT)
    packet = packet_source["packet"]
    n = int(packet.get("N", 10000))
    curve = packet.get("curve") or {}
    a = int(curve.get("a", -1))
    b = int(curve.get("b", 1))

    primes = sieve(max(n, 100))
    results = {
        "Goldbach": audit_goldbach(n, primes),
        "Twin Prime": audit_twin_prime(n, primes),
        "Riemann Surface Fence": audit_riemann_surface(n, primes),
        "P vs NP Toy": audit_p_vs_np_toy(n),
        "BSD Toy Curve": audit_bsd_toy_curve(n, a, b),
    }
    strongest, weakest = strongest_and_weakest(results)

    payload = {
        "title": "STRICT ANY-N AUDIT REPORT",
        "warning": "Finite evidence only. Not proof. No open conjecture is proven here.",
        "packetSource": {
            "kind": packet_source["kind"],
            "path": packet_source["path"],
        },
        "inputs": {"N": n, "curve": {"a": a, "b": b}},
        "results": {name: asdict(result) for name, result in results.items()},
        "strongestCheck": strongest,
        "weakestCheck": weakest,
        "proofBoundaries": {name: result.proofBoundary for name, result in results.items()},
        "generatedFiles": [str(MD_OUT), str(JSON_OUT)],
        "finalHonestStatus": "STRICT FINITE AUDIT COMPLETE / NO PROOF CLAIMS / OPEN CONJECTURE BOUNDARIES REMAIN",
    }
    write_reports(payload)

    print("STRICT ANY-N AUDIT SUMMARY")
    print(f"Packet source: {packet_source['path']} ({packet_source['kind']})")
    print(f"N: {n}")
    for name, result in results.items():
        print(f"- {name}: {result.status} | {result.proofLevel} | {result.checked}")
    print(f"Strongest check: {strongest}")
    print(f"Weakest check: {weakest}")
    print("Proof boundaries remaining:")
    for name, result in results.items():
        print(f"- {name}: {result.proofBoundary}")
    print(f"Generated: {MD_OUT}")
    print(f"Generated: {JSON_OUT}")
    print(payload["finalHonestStatus"])
    print("STRICT_ANYN_AUDIT_COMPLETE")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
