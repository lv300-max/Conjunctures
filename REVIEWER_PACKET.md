# Goldbach Proof-Pressure Workbench — Reviewer Packet

**Date:** May 5, 2026
**File:** `workbench.html` (single-file, client-side, no dependencies)

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

## Safe Claim

This workbench provides proof-pressure evidence and a finite certificate. It is **not a proof of Goldbach's conjecture**. All PASS results apply to the tested range [1000, 1000000] only. The universal theorem remains open.
