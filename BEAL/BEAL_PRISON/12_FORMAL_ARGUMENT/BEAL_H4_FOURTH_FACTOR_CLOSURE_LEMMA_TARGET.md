# Beal H4 Fourth Factor Closure Lemma Target

## Status

CONTAINED / OPEN_CLOSURE_TARGET

This is a closure target, not a completed proof.

## Lemma Statement

Fourth-power target branches cannot produce exact primitive no-family equality.

Formal target:

```text
If gcd(A,B,C)=1 and the branch requires a fourth-power target closure,
then the factor wall prevents A^x + B^y = C^z.
```

## Label

CONTAINED_TO_CLOSED_TARGET

## Factor Wall

```text
C^4 - B^4 = (C-B)(C+B)(C^2+B^2)
```

## Full Picture

| Field | Answer |
|---|---|
| WHO | fourth-power target candidates |
| WHAT | must fail exact no-family closure |
| WHEN | after branch assignment |
| WHERE | fourth target branch |
| WHY | exact closure must pass the difference-of-fourths factor wall |
| HOW | analyze gcd, parity, and perfect-power compatibility of factor pieces |
| WHAT BLOCKS IT | factor wall is not yet converted into full impossibility |
| WHAT WOULD BREAK IT | a primitive exact equality passing the factor wall |
| WHETHER THE BLOCKER CHANGES | target is to upgrade CONTAINED to CLOSED |
| CURRENT STATUS | CONTAINED / OPEN |
| NEXT ACTION | prove factor product cannot match primitive perfect-power closure |

## Lemma Proof Skeleton

1. Assume a fourth-power target exact no-family equality.
2. Move terms to obtain a difference of fourth powers.
3. Factor:

```text
C^4 - B^4 = (C-B)(C+B)(C^2+B^2)
```

4. Compute gcd relations among the three factors.
5. Apply parity constraints.
6. Apply `gcd(A,B,C)=1` primitive constraints.
7. Show the product cannot equal the required perfect-power target.
8. Conclude no exact primitive closure in this branch.

## Filled Factor Table

| Row | Equation | C-B | C+B | C^2+B^2 | gcd(C-B,C+B) | gcd(C-B,C^2+B^2) | gcd(C+B,C^2+B^2) | Perfect-Power Possible | Danger | Status |
|---:|---|---:|---:|---:|---:|---:|---:|---|---:|---|
| 1 | `3^4 - 2^4 - 2^6 = 1` | 1 | 5 | 13 | 1 | 1 | 1 | no in tested factor audit | 0 | CONTAINED |
| 2 | `37^4 - 14^5 - 34^4 = 1` | 3 | 71 | 2525 | 1 | 1 | 1 | no in tested factor audit | 0 | CONTAINED |

## H4 Filled Evidence

| Metric | Value | Label |
|---|---:|---|
| fourth target rows | 2 | FINITE_EVIDENCE |
| factorized rows | 2 | FORMAL / FINITE |
| perfect-power possible count | 0 | FINITE_EVIDENCE |
| danger | 0 | FINITE_EVIDENCE |
| contained count | 2 | FINITE_EVIDENCE |

## H4 Current Conclusion

```text
Both known fourth-target rows are factor-wall contained.
No tested fourth target admits exact danger.
Full fourth-power closure is not proven yet.
```

## What Would Close H4

```text
The factor wall forces a contradiction for every no-family exact fourth-target closure.
```

## What Remains Open

```text
NEEDS_GCD_FACTOR_TABLE
NEEDS_PARITY_CASE_SPLIT
NEEDS_PERFECT_POWER_COMPATIBILITY_PROOF
NEEDS_FOURTH_POWER_FULL_CLOSURE
NEEDS_ALL_RANGE_FOURTH_TARGET_CASE_SPLIT
```

## Plain Read

H4 has the wall. The proof task is proving nothing primitive can pass through it.
