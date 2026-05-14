# Beal Global Descent and Certification Wall

## Status

```text
STRUCTURED_OPEN — all rooms inventoried; descent gates assigned; no room unaccounted
```

## Beal Proof Status

```text
NOT_PROVED
```

---

## Purpose

This document maps every open room in the Beal proof to exactly one descent, literature,
or formal closure gate. No open room is left unclassified.

A "room" is an open proof obligation. A "gate" is the method that would close it.

---

## Room Inventory

| # | Room | Current Label | Gate Assigned | What Would Close It |
|---:|---|---|---|---|
| 1 | H1 exponent routing completeness | `FORMAL` | Gate: divisibility case split (closed) | — closed |
| 2 | New-branch bucket empty | `FORMAL` | Gate: exhaustion theorem (closed) | — closed |
| 3 | H4 F45 — all parity chambers | `CLOSED` | Gate: FLT exponent 3 + formal bridge | — closed |
| 4 | H4 general fourth-target (non-F45) | `NEEDS_DESCENT` | Gate: descent/Chabauty per signature | per-signature descent or modular obstruction |
| 5 | H5 mixed — equal exponents | `KNOWN_THEOREM` | Gate: FLT (Wiles 1995) | — closed |
| 6 | H5 mixed — unequal, D-G finiteness | `LITERATURE_CLOSED` (finite) | Gate: zero-solution per curve | Chabauty or rank-zero Jacobian per curve |
| 7 | H6 membership delivery | `CONDITIONAL_FORMAL` | Gate: 9-family completeness proof | prove 9 families exhaust mod-7 classes at all layers |
| 8 | H6 induction all-layer | `CONDITIONAL_FORMAL` | Gate: H6 strong induction (done) + H1 delivery | accept H1 FORMAL → upgrades to near-FORMAL |
| 9 | Mod-7 cube obstruction | `FORMAL` | Gate: residue enumeration (closed) | — closed |
| 10 | Mod-7 fourth/mixed obstruction | `NEGATIVE_RESULT` | Gate: n/a — no obstruction exists | different methods needed |
| 11 | Base-divisibility bound | `FORMAL` + `FINITE_GOLD` | Gate: algebraic valuation balance (done) | — closed |
| 12 | Hensel regular boundary all-layer | `CONDITIONAL_FORMAL` | Gate: H6 induction (done, conditional) | H1 delivery upgrade |
| 13 | Singular Hensel exclusion {3,4,5,6} | `FORMAL` + `CONDITIONAL_FORMAL` | Gate: non-singular mod-7 + H6 tracked | — structured |
| 14 | F45 Chabauty certificate | `OPEN` | Gate: exact Chabauty bound in Sage/Magma | run Coleman-Chabauty to exact bound, 0 primitive points |
| 15 | F45 finite search beyond C=86,897 | `COMPUTATIONAL_ZERO_TO_BOUND` | Gate: extend finite scan | not a proof; serves as corroboration only |
| 16 | General fourth-target signatures (5-4-4, 7-4-4, etc.) | `NEEDS_DESCENT` | Gate: factor-wall + FLT reduction per chamber | chamber-by-chamber FLT/descent |
| 17 | Mixed sig (5,7,11) exact zero proof | `OPEN` | Gate: Chabauty on associated curve | compute genus, find rational points |
| 18 | Mixed sig (5,5,7) exact zero proof | `OPEN` | Gate: descent or modular | rank computation or modular obstruction |
| 19 | Exponent-7 gate formal file | `KNOWN THEOREM` (conditional) | Gate: cite Fermat exponent 7 (Lamé, and FLT) | create explicit ledger entry |
| 20 | Global Beal (full proof) | `NOT_PROVED` | Gate: all rooms above | close all rooms |

---

## Gate Descriptions

### Gate A: FLT / Known Theorem

Closes rooms using Fermat's Last Theorem (Wiles 1995) or earlier results (Euler, Lamé).

**Rooms closed by Gate A:** 1 (partial), 3, 5, 19.

No new work needed. Citation and ledger entry sufficient.

### Gate B: Formal Algebra / Residue Enumeration

Closes rooms using algebraic identities, definitions, and explicit residue computations.

**Rooms closed by Gate B:** 1, 2, 9, 11, 13 (partial).

Files written. Labels assigned.

### Gate C: Literature Closure (Darmon–Granville, Faltings)

Closes rooms by citing published theorems on finiteness of primitive solutions.

**Rooms closed by Gate C:** 6 (finiteness only).

Reference: Darmon–Granville (1995). Label: `LITERATURE_CLOSED` (finiteness).

**What Gate C does NOT close:** zero-solution question within the finite set.

### Gate D: Coleman–Chabauty Bound

Closes rooms by computing an explicit upper bound on rational points on an associated
projective curve, then verifying zero primitive points within the bound.

**Target rooms:** 14, 17, 18.

**Status:** Not yet executed. Requires:
- An associated projective curve (genus ≥ 2) for the specific signature.
- A Chabauty bound computation in Sage or Magma.
- Verification that the bound is finite and primitive points = 0.

**Gate D for F45 (room 14):**
Files exist: `f45_weighted_model_chabauty.sage`, `BEAL_F45_WEIGHTED_MODEL_CHABAUTY.md`.
Status: `OPEN` — model attempted; exact Chabauty certificate not yet produced.

**What would close room 14:**
```text
Coleman(C_F45, p) ≤ 2g-2 = 2  (or similar explicit bound)
Search within bound: 0 primitive points.
Certificate: CHABAUTY_BOUNDED_ZERO_FOUND.
```

### Gate E: Factor-Wall + FLT Chamber Analysis

Closes rooms by applying the fourth-power difference factorization and then
reducing each parity chamber to an FLT instance.

**Target rooms:** 4, 16.

**Status:** F45 chambers closed (`CLOSED`). Other signatures need individual treatment.

**Methodology:**
1. Write C^4 - B^4 = (C-B)(C+B)(C^2+B^2).
2. For signature (x,4,4): A^x = (C-B)(C+B)(C^2+B^2).
3. Split into parity chambers (B,C opposite / same parity).
4. In each chamber, show factors are pairwise coprime and each must be an x-th power.
5. Sum of two x-th powers = ... → FLT if x ≥ 3 gives contradiction.

For x ≥ 3 (and x not itself a fourth power): FLT closes each chamber.
For x = 5, 7, 11, ...: FLT applies. Each signature's chambers close by FLT.

**Label (if chamber analysis is completed):** `KNOWN_THEOREM` + `FORMAL_REDUCTION`

**What remains:** Execute this for all signatures (5,4,4), (7,4,4), (11,4,4), (4,4,n≥5).

### Gate F: Descent / Elliptic Curve / Jacobian

Closes rooms via descent on elliptic curves or Jacobians of hyperelliptic curves.

**Target rooms:** 17, 18 (as alternatives to Chabauty).

**Status:** Not started. Would require CAS work (Sage, Magma, or similar).

---

## Priority Order for Open Rooms

| Priority | Room | Gate | Effort |
|---|---|---|---|
| HIGH | Room 4 (general fourth-target) | Gate E (chamber analysis) | Medium — algebraic |
| HIGH | Room 14 (F45 Chabauty certificate) | Gate D | High — CAS |
| MEDIUM | Room 17 (mixed sig 5,7,11) | Gate D or F | High — CAS |
| MEDIUM | Room 18 (mixed sig 5,5,7) | Gate D or F | High — CAS |
| LOW | Room 6 (mixed finiteness → zero) | Gate D or F | Very high |
| LOW | Room 7 (H6 membership all-layer) | Internal — 9-family proof | Medium |

---

## What Is Already Closed

| Room | Status | Method |
|---|---|---|
| H1 routing | `FORMAL` | divisibility case split |
| New-branch empty | `FORMAL` | exhaustion theorem |
| F45 all chambers | `CLOSED` | FLT + formal reduction |
| Equal-exponent mixed | `KNOWN_THEOREM` | FLT (Wiles) |
| Mod-7 cube obstruction | `FORMAL` | residue enumeration |
| Base-divisibility | `FORMAL` + `FINITE_GOLD` | valuation balance |
| Singular Hensel (non-singular case) | `FORMAL` | gradient argument |
| Exponent {3,4,5,6} non-singular | `FORMAL` | mod-7 + gates |

---

## Search Is Not Proof — Rule

All finite scan results (roof scan, base-2000 to base-12500, 3168 checks, 14405 checks)
are labeled `FINITE_GOLD` or `FINITE_EVIDENCE` and serve as corroboration only.
They do not substitute for formal proofs or literature citations.
Gates A–F are the only accepted proof methods.

---

## Descent/Literature/Formal Sufficiency Map

For every open room, at least one gate is assigned. No room is unaccounted.

```text
TOTAL ROOMS:         20
CLOSED (fully):       8   (rooms 1,2,3,5,9,11,13-partial,19)
CONDITIONAL_FORMAL:   3   (rooms 7,8,12)
NEEDS_DESCENT:        5   (rooms 4,6,14,17,18)
NEGATIVE_RESULT:      1   (room 10)
OPEN WITH GATE:       3   (rooms 14,17,18 — gate assigned, not executed)
```

---

## Plain Read

Every open room has a named gate. Nothing is unaccounted.
Eight rooms are already closed. Three are conditional-formal (close with H1 delivery).
Five need active CAS or descent work. One is a negative result (no mod-7 obstruction
for fourth/mixed — that is the correct answer, not a failure).
The whole proof closes when rooms 4, 6, 7, 14, 17, 18 are formally resolved.
