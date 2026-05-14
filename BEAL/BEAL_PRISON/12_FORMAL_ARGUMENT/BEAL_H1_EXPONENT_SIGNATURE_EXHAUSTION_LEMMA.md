# Beal H1 Exponent-Signature Exhaustion Lemma

## Status

```text
FORMAL
```

## Beal Proof Status

```text
NOT_PROVED
```

This lemma closes H1's exponent-signature gap. It does not close Beal's conjecture.

---

## Lemma Statement

**Lemma (Exponent-Signature Exhaustion).**

Let x, y, z be positive integers with x, y, z ≥ 3.
Then the ordered triple (x, y, z) belongs to at least one of the following classes:

| Class | Condition |
|---|---|
| CUBE | at least one of x, y, z is divisible by 3 |
| FOURTH | none divisible by 3; at least one divisible by 4 |
| MIXED | none divisible by 3; none divisible by 4 |

These three classes are mutually exhaustive and together cover all triples (x,y,z) with x,y,z ≥ 3.

**Label:** `FORMAL`

---

## Proof

Let x, y, z ≥ 3.

Define three predicates:

```text
P3 : at least one of x, y, z is divisible by 3
P4 : none of x, y, z is divisible by 3;
     at least one of x, y, z is divisible by 4
P_M: none of x, y, z is divisible by 3;
     none of x, y, z is divisible by 4
```

**Claim:** P3 ∨ P4 ∨ P_M is a tautology for all x,y,z ≥ 3.

**Proof of claim:**

Suppose P3 is false: none of x, y, z is divisible by 3.
Then either at least one of x, y, z is divisible by 4, or none is.
If at least one is divisible by 4, P4 holds.
If none is divisible by 4, P_M holds.

Therefore exactly one of P3, P4, P_M holds for any given triple. ∎

**No exponent combination can escape this partition.** Every positive integer n ≥ 3 is
either divisible by 3, divisible by 4 (and not by 3), or neither. The partition
is exhaustive by the trichotomy of divisibility, which is a property of Z.

---

## Branch Assignment Map

| Class | Assigned Branch | Gate | Label |
|---|---|---|---|
| CUBE | pure cube or sixth bridge | Gate 1 / Gate 2 | `KNOWN_THEOREM` / `FORMAL_REDUCTION` |
| FOURTH | fourth-target branch | Gate 3 | `CONTAINED` / H4 target |
| MIXED | mixed-power branch or mod-7 lifted family | Gate 4 / Gate 5 | `FINITE_EVIDENCE` / H5 / H6 |

---

## Hard Case: x,y,z ≥ 5 with No Factor of 3 or 4

The hardest residual is:

```text
All of x, y, z ≥ 5
None divisible by 3
None divisible by 4
```

Such exponents satisfy: x ≡ 1, 2 mod 3 and x ≢ 0 mod 4.
Examples: 5, 7, 10, 11, 13, 14, ...

These exponents fall into the MIXED class and are assigned Gate 4 (mixed-power).

### Sub-case Analysis by GCD Structure

For a primitive triple (A,B,C) with gcd(A,B,C)=1 and exponents all in the MIXED class:

**Case A: Some exponent is even (but not divisible by 4).**

If x = 2m with m odd and gcd(m,2)=1, then A^x = (A^m)^2.
This does not collapse to a fourth-power or cube branch by assumption.
The candidate enters Gate 4 (mixed-power).

**Case B: All exponents are odd.**

If x, y, z all odd, none divisible by 3:
The smallest examples are (5, 5, 5), (5, 7, 11), etc.

For (5, 5, 5): A^5 + B^5 = C^5 is closed by Fermat exponent 5 (Euler proved no primitive solution exists for n=5).
This is a KNOWN_THEOREM sub-case within Gate 4.

For (7, 7, 7): closed by Fermat exponent 7 (proved by Lamé and Dirichlet for specific cases; note FLT (Wiles 1995) closes all A^n + B^n = C^n for n ≥ 3).

For (x, x, x) with x ≥ 5: FLT (Wiles 1995) closes all such cases.
Label: `KNOWN_THEOREM`.

For (x, y, z) not all equal with x,y,z ≥ 5: these are the mixed-signature rows.
By Darmon–Granville (1995): for fixed exponents (p,q,r) with 1/p + 1/q + 1/r < 1,
the equation A^p + B^q = C^r has only finitely many primitive solutions.
For all x,y,z ≥ 5: 1/x + 1/y + 1/z ≤ 3/5 < 1.
Therefore finitely many primitive solutions exist for each such signature.
Label: `LITERATURE_CLOSED` (finiteness). Zero-solution claim is the H5 open gap.

---

## Full Coverage Table for x,y,z ≥ 3

| Exponent Pattern | Example | Gate | Current Label | What Remains |
|---|---|---|---|---|
| All divisible by 3 | (3,3,3), (6,3,9) | Gate 1 — pure cube | `KNOWN_THEOREM` | none |
| Some divisible by 6 | (6,3,3) | Gate 2 — sixth bridge | `FORMAL_REDUCTION` + `KNOWN_THEOREM` | none |
| Some divisible by 4, none by 3 | (4,4,5), (8,5,7) | Gate 3 — fourth target | `CONTAINED` | H4 global closure |
| All odd coprime to 3, equal | (5,5,5), (7,7,7) | Gate 4 — FLT | `KNOWN_THEOREM` | none |
| All odd coprime to 3, not equal | (5,7,11) | Gate 4 — mixed, D-G finite | `LITERATURE_CLOSED` (finite) | H5 zero-solution proof |
| Even coprime to 4 and 3, mixed | (10,7,11) | Gate 4 — mixed | `LITERATURE_CLOSED` (finite) | H5 zero-solution proof |
| Cube-driven near-zero collision | tracked mod-7 families | Gate 5 — mod-7 lift | `CONDITIONAL_FORMAL` | H6 membership + H1 delivery |

---

## New-Branch Bucket

The new-branch bucket contains every candidate not assigned to Gates 1–5.

**Claim:** The new-branch bucket is empty.

**Proof:**
Every triple (x,y,z) with x,y,z ≥ 3 belongs to CUBE, FOURTH, or MIXED by the partition proved above.

- CUBE → Gates 1 and 2.
- FOURTH → Gate 3.
- MIXED → Gates 4 and 5.

No exponent triple falls outside these gates. Therefore no candidate can enter an unclassified
new branch based on its exponent signature alone. ∎

**Label:** `FORMAL` — the new-branch bucket is empty for exponent-signature routing.

**Caveat:** Gate 5 (mod-7 lifted families) requires the additional condition that the candidate is
cube-driven and near-zero in the mod-7 sense. The H6 membership delivery question (whether
a specific candidate is confirmed to be in a tracked path) remains open.

---

## What This Closes

| Obligation | Status |
|---|---|
| Every x,y,z ≥ 3 enters a known bucket | `FORMAL` |
| Hard case x,y,z ≥ 5, no factor of 3 or 4 | `FORMAL` routing to Gate 4 |
| New-branch bucket empty (by exponent) | `FORMAL` |
| Gate 4 zero solutions | H5 open gap — `FINITE_EVIDENCE` |
| Gate 3 impossibility | H4 open gap — `CONTAINED` |
| Gate 5 membership delivery | H6 open gap — `CONDITIONAL_FORMAL` |

---

## What Remains Open

```text
NEEDS_H4_FOURTH_TARGET_GLOBAL_CLOSURE
NEEDS_H5_MIXED_ZERO_SOLUTION_PROOF
NEEDS_H6_MEMBERSHIP_DELIVERY
```

---

## Plain Read

Every exponent triple is sorted into a known bucket by simple divisibility.
No triple can escape the partition. The bucket routing is `FORMAL`.
What remains open is proving each bucket empty (H4, H5) or fully tracked (H6).
