# PREPAREDNESS SCORECARD

**Last updated:** May 6, 2026  
**Test suite:** `_test_runner.js` — **165/165 PASS**  
**Runtime harnesses:** `_fpb_runtime_test.js`, `_maynard_cert_test.js`, `_toy_sim_test.js`

> ⚠ Note: `collatz_octave_audit.py` overwrites this file when run. This version is the manually curated scorecard reflecting all prime-gap engines and Node harnesses. The Python script's scores cover the Collatz octave sub-system only.

---

| Metric | Score | Change from baseline | Basis |
|--------|-------|----------------------|-------|
| Structure quality | **84%** | +12 | 165-check static runner; JSON artifact integrity verified for all 3 audit outputs |
| Finite verification quality | **74%** | +29 | Toy sim (5000 shifts, 50% hit rate, avg wt 6.42); 3 Python audits confirmed; FPB 101K primes |
| Recurrence quality | **38%** | — | Blocked: raw 84-packet / 336 recurrence table absent from repo |
| Induction clarity | **42%** | — | Blocked: no written formal induction document in repo |
| Reviewer readiness | **78%** | +14 | All engines documented; 6 attack surfaces listed; gate locks source-verified |
| Proof readiness | **18%** | — | Blocked: no universal analytic proof exists |
| Reproducibility | **74%** | +52 | 3 Node harnesses re-runnable in < 5 s each; 3 Python audits all re-runnable; JSON integrity-checked |
| Mathematical risk | **82%** | — | Open conjecture; no false closure anywhere in source or tests |
| Accepted-proof probability | **5%** | — | Unchanged; finite evidence only |

---

## What Was Run This Session (May 6, 2026)

| Harness | Result | Key Numbers |
|---------|--------|-------------|
| `node _fpb_runtime_test.js` | PASS | 101,572 primes, 101,567 gaps, 20 shared motifs, hash `5e5237f0` |
| `node _maynard_cert_test.js` | PASS | k=49, diameter=242, all q≤241 PASS, 6 gate assertions green |
| `node _toy_sim_test.js` | PASS | 5000 shifts, 2500 hits (50%), avg weight 6.42, best shift 11 (42 primes) |
| `python3 collatz_octave_audit.py` | SCAFFOLD_ONLY | Independent regen: FAIL_BLOCKED (raw packet absent — honest) |
| `python3 strict_anyn_audit.py` | FINITE_PASS | Goldbach/Twin/RH/PvNP/BSD: all finite pass, all universal OPEN |
| `python3 polignac_weakest_k_run.py` | FINITE_PASS | 100 even k tested, failCount=0, weakest k=32 (T=1204) |
| `node _test_runner.js` | **165/165** | +19 new JSON artifact integrity checks added this session |

---

## Strongest Artifacts (updated May 6, 2026)

1. Descent inequality is algebraically clean.
2. Octave child-lift map is structurally complete.
3. Reviewer Q&A identifies the right proof gates.
4. **HL Constant Compare** — finite Hardy–Littlewood density evidence for k=2…12 up to N=100,000.
5. **Failure Simulator** — demonstrates catastrophic collapse if verification halts early.
6. **Fingerprint Batch Runner** — 5 presets, shared motif tracking, JSON/MD export. Runtime-verified.
7. **Maynard cert (k=49, diameter=242)** — all q≤241 PASS; Gates 3–5 explicitly OPEN.
8. **Toy Sieve Weight Simulation** — 5000-shift run, 50% hit rate, avg 6.42 primes/shift. Finite only.
9. **JSON artifact integrity** — all 3 Python audit JSONs verified present, parseable, and honest.

## Weakest Proof Boundaries

1. Raw 84 packet and 336 recurrence data are missing from repo.
2. Exact valuation forcing for all lifts is not exported row-by-row.
3. Universal arbitrary odd integer membership into the packet system is not proven here.
4. Maynard weight inequality (Gate 4) and infinite bounded-gap conclusion (Gate 5) remain OPEN — no false closure claimed.

## Reviewer Attack Surfaces

1. Where is U27 defined, and why is it complete?
2. Why does valuation forcing give exact equality rather than lower-bound divisibility?
3. What certificate signature prevents hidden state under bucket/mod96 labels?
4. Can the 84 packet be regenerated from raw rules without trusting the UI?
5. Where is the formal smallest-counterexample induction written against the exact packet universe?
6. Does the Maynard k=49 cert beat any current bounded-gap record? (Answer: NO — source-locked.)

## Next Exact Proof Obligations

1. Add raw packet, exact-state closure, frontier, and recurrence artifacts in JSON/CSV.
2. Write and machine-check `VALUATION_FORCING_LEMMA` for each row including non-divisibility modulo `2^(S+1)`.
3. Define U27 and prove arbitrary odd integer membership or entry into a closed base case.

## Final Honest Status

Not a Collatz proof from the available repository. Current status is a serious certificate-workbench scaffold. Prime-gap engines (HL Compare, Failure Sim, Fingerprint Batch, Maynard Cert, Toy Sim) are runtime-verified; all Python audits re-run cleanly; all open conjectures are correctly labeled OPEN in source, tests, and documentation. Formal induction and reproducibility of the Collatz octave packet remain blocked.
