#!/usr/bin/env python3
"""Independent numeric run for the Polignac Weakest k Engine."""

from __future__ import annotations

import json
import math
from pathlib import Path


ROOT = Path(__file__).resolve().parent
JSON_OUT = ROOT / "POLIGNAC_WEAKEST_K_RUN.json"
MD_OUT = ROOT / "POLIGNAC_WEAKEST_K_RUN.md"


def sieve(limit: int) -> bytearray:
    marks = bytearray(b"\x01") * (limit + 1)
    if limit >= 0:
        marks[0] = 0
    if limit >= 1:
        marks[1] = 0
    r = int(limit**0.5)
    for p in range(2, r + 1):
        if marks[p]:
            start = p * p
            marks[start : limit + 1 : p] = b"\x00" * (((limit - start) // p) + 1)
    return marks


def local_obstruction_pass(k: int) -> bool:
    for q in [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]:
        blocked = 0
        for r in range(q):
            if ((r % q) * ((r + k) % q)) % q == 0:
                blocked += 1
        if blocked >= q:
            return False
    return True


def run(N: int = 100_000, Kmax: int = 200) -> dict:
    primes = sieve(N + Kmax)
    prime_list = [p for p in range(2, N + 1) if primes[p]]
    expected = N / (math.log(N) ** 2)
    rows = []
    for k in range(2, Kmax + 1, 2):
        count = 0
        first = None
        last = None
        prev = None
        max_gap = 0
        for p in prime_list:
            if primes[p + k]:
                count += 1
                if first is None:
                    first = p
                last = p
                if prev is not None:
                    max_gap = max(max_gap, p - prev)
                prev = p
        obstruction = local_obstruction_pass(k)
        rows.append(
            {
                "k": k,
                "T_N_k": count,
                "c_k": count / expected if expected else 0,
                "firstPair": [first, first + k] if first is not None else None,
                "lastPair": [last, last + k] if last is not None else None,
                "largestPairStartDeadZone": max_gap,
                "localObstructionPass": obstruction,
                "status": "FAIL" if not obstruction else "WARNING" if count == 0 else "PASS",
            }
        )
    ranked = sorted(rows, key=lambda r: (r["T_N_k"], r["c_k"], -r["largestPairStartDeadZone"], r["k"]))
    return {
        "engine": "Polignac Weakest k Engine",
        "definition": "T(N,k) counts primes p <= N with p+k prime; p+k may lie up to N+Kmax.",
        "N": N,
        "Kmax": Kmax,
        "evenKTested": len(rows),
        "expectedScale_N_over_log2N": expected,
        "passCount": sum(1 for r in rows if r["status"] == "PASS"),
        "warningCount": sum(1 for r in rows if r["status"] == "WARNING"),
        "failCount": sum(1 for r in rows if r["status"] == "FAIL"),
        "weakestByCount": ranked[:20],
        "lowestDensity": sorted(rows, key=lambda r: (r["c_k"], r["k"]))[:20],
        "largestDeadZone": sorted(rows, key=lambda r: (-r["largestPairStartDeadZone"], r["k"]))[:20],
        "finalHonestStatus": "FINITE POLIGNAC PRESSURE RUN COMPLETE / UNIVERSAL PROOF OPEN",
    }


def write_reports(payload: dict) -> None:
    JSON_OUT.write_text(json.dumps(payload, indent=2, sort_keys=True))
    lines = [
        "# POLIGNAC WEAKEST K RUN",
        "",
        "Finite support only. Not proof.",
        "",
        f"- N: `{payload['N']}`",
        f"- Kmax: `{payload['Kmax']}`",
        f"- even k tested: `{payload['evenKTested']}`",
        f"- PASS: `{payload['passCount']}`",
        f"- WARNING: `{payload['warningCount']}`",
        f"- FAIL: `{payload['failCount']}`",
        f"- final status: `{payload['finalHonestStatus']}`",
        "",
        "## Weakest k By T(N,k)",
        "",
        "| rank | k | T(N,k) | c(k) | first pair | last pair | largest dead zone |",
        "|---:|---:|---:|---:|---|---|---:|",
    ]
    for i, row in enumerate(payload["weakestByCount"], 1):
        lines.append(
            f"| {i} | {row['k']} | {row['T_N_k']} | {row['c_k']:.5f} | "
            f"{row['firstPair']} | {row['lastPair']} | {row['largestPairStartDeadZone']} |"
        )
    lines.extend(["", "## Largest Pair-Start Dead Zones", "", "| rank | k | dead zone | T(N,k) | c(k) |", "|---:|---:|---:|---:|---:|"])
    for i, row in enumerate(payload["largestDeadZone"], 1):
        lines.append(f"| {i} | {row['k']} | {row['largestPairStartDeadZone']} | {row['T_N_k']} | {row['c_k']:.5f} |")
    MD_OUT.write_text("\n".join(lines) + "\n")


def main() -> int:
    import sys

    N = int(sys.argv[1]) if len(sys.argv) > 1 else 100_000
    Kmax = int(sys.argv[2]) if len(sys.argv) > 2 else 200
    payload = run(N, Kmax)
    write_reports(payload)
    print("POLIGNAC WEAKEST K RUN")
    print(f"N={payload['N']} Kmax={payload['Kmax']} even_k={payload['evenKTested']}")
    print(f"PASS={payload['passCount']} WARNING={payload['warningCount']} FAIL={payload['failCount']}")
    print("Weakest by T(N,k):")
    for row in payload["weakestByCount"][:10]:
        print(
            f"- k={row['k']:3d} T={row['T_N_k']:4d} c={row['c_k']:.5f} "
            f"first={row['firstPair']} last={row['lastPair']} dead={row['largestPairStartDeadZone']}"
        )
    print("Largest dead zones:")
    for row in payload["largestDeadZone"][:5]:
        print(f"- k={row['k']:3d} dead={row['largestPairStartDeadZone']:4d} T={row['T_N_k']:4d} c={row['c_k']:.5f}")
    print(f"Generated: {MD_OUT}")
    print(f"Generated: {JSON_OUT}")
    print(payload["finalHonestStatus"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
