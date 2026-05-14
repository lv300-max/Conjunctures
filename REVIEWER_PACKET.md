# Goldbach Proof-Pressure Workbench — Reviewer Packet

**Date:** May 6, 2026
**File:** `workbench.html` (single-file, client-side, no dependencies)  
**Static test runner:** `_test_runner.js` — **146/146 PASS**  
**Runtime harnesses:** `_fpb_runtime_test.js`, `_maynard_cert_test.js` (Node v24, no browser needed)

---

## Status at a Glance

| Item | Status |
|------|--------|
| Computation (finite range) | **PASS** |
| Finite certificate | **PASS** |
| Lemma board (7 lemmas) | **PASS** |
| Proof pressure | 98–99% |
| Accepted universal proof | **0–5%** |

> **PASS means no obstruction was found inside the tested range. PASS does not mean proof.**

---

## What Was Tested

For every even E in **[1000, 1000000]**:

- Goldbach pair count S(E) was computed directly.
- S(E) was confirmed positive for all tested E.
- The density constant was measured: **c ≥ 0.652438696**
- Finite certificate: `S(E) >= 0.652438696 * E/log(E)^2` holds on the tested range.

**Weakest row:** E = 2672 | S(E) = 28 | Witness: 2672 = 13 + 2659 | Hash: acbf4b62

---

## Main Theorem Target (Still Open)

> **S(E) ≥ c · E / log(E)² for all sufficiently large even E.**

This is the universal inequality that would complete the proof. It has not been proved.

---

## Seven Lemmas

| ID | Name | Finite | Universal |
|----|------|--------|-----------|
| A | Survivor Lower Bound | FINITE PASS | UNIVERSAL OPEN |
| B | Growth Floor | FINITE PASS | UNIVERSAL OPEN |
| C | No Full Cover Wall | FINITE PASS | UNIVERSAL OPEN |
| D | Residue Opening | FINITE PASS | UNIVERSAL OPEN |
| E | Open Lane Prime Survivor | FINITE PASS | UNIVERSAL OPEN |
| F | Rescue Prime | FINITE PASS | UNIVERSAL OPEN |
| G | Puzzle Hub Bridge | STRUCTURE PASS | IMPLICATION OPEN |

Each lemma passes finite verification. No lemma has been proved universally.

---

## What Is Still Missing

A universal analytic lower-bound theorem proving:

> S(E) ≥ c · E / log(E)² for all sufficiently large even E.

No such theorem is established here. The gap is identified and documented; it remains open.

---

---

## Additional Prime-Gap Engines (added May 6, 2026)

### HL Constant Compare
- Inputs: gap k (default 2), scan limit N (default 100,000)
- Measures empirical density `c(k) = count / (N / ln²N)` and compares to Hardy–Littlewood constant `2·C₂·∏(p-1)/(p-2)`
- Honest label: **Hardy–Littlewood conjecture is OPEN. This is finite evidence only.**

### Failure Simulator
- Checkpoints 1K → 500K; compares real cumulative pair counts vs. a fake "stops at N=50,000" plateau
- Demonstrates why early-halt verification is disqualifying

### Fingerprint Batch Runner (runtime-verified May 6, 2026)
- 5 presets run sequentially; shared motif tracker; JSON/MD export
- **Results:** 101,572 primes | 101,567 gaps | 20 shared motifs | strongest motif: `"3,1,3"` (3 runs, total 94)
- Octave match: high 15.4% (Base fabric) → low 7.3% (Largest dead-zone area)
- Batch hash: `5e5237f0`

### Maynard Cert (runtime-verified May 6, 2026)
- k=49 admissible tuple, diameter=242 (< current 246 bound)
- All q≤241 admissibility checks: **PASS**
- Gate status locks (source + static test):

| Gate | Name | Status |
|------|------|--------|
| 1 | Diameter | PASS (242 < 246) |
| 2 | Admissibility | PASS (all q≤241) |
| 3 | Maynard weights | **OPEN** |
| 4 | Analytic inequality | **OPEN** |
| 5 | Infinite bounded-gap conclusion | **OPEN** |

- `infiniteCertificate: 'MISSING'` | `universalProof: 'OPEN'` | Record beat: **NO**
- All 6 gate assertions are source-locked in `_test_runner.js` (checks 141–146)

---

## Safe Claim

This workbench provides proof-pressure evidence and a finite certificate. It is **not a proof of Goldbach's conjecture**. All PASS results apply to the tested range [1000, 1000000] only. The universal theorem remains open. All prime-gap engines (HL, Fingerprint Batch, Maynard Cert) correctly label their conjectures OPEN; no false closure is claimed anywhere in the source.
