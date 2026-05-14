# Beal H1 Branch Exhaustion Dossier

## Status

PROOF TARGET - NOT PROVEN

## H1 Statement

Every relevant no-family candidate receives one branch assignment.

Formal target:

```text
If gcd(A,B,C)=1,
then the candidate belongs to one of:
pure cube / sixth bridge / fourth target / mixed power / mod-7 lifted family
```

or to a newly added branch with its own closure rule.

## Current Evidence

Known topology audit:

| Metric | Value |
|---|---:|
| known branches | 4 |
| assigned known branches | 4 |
| unassigned known branches | 0 |
| assigned-open branches | 2 |

Known branch assignments:

| Branch | Assignment | Status |
|---|---|---|
| Pure cube | closed | KNOWN_THEOREM |
| Sixth bridge | reduced to cube | FORMAL_REDUCTION |
| Fourth target | contained | NEEDS_FULL_CLOSURE |
| Mixed power | isolated | NEEDS_GENERAL_RULE |
| Mod-7 lifted families | lifted | FINITE_GOLD + FORMAL_CORE |

## What H1 Must Upgrade

H1 must upgrade:

```text
all known branches are assigned
```

to:

```text
every relevant no-family candidate must be assigned
```

## WHO / WHAT / WHEN / WHERE / WHY / HOW

| Field | Answer |
|---|---|
| WHO | every no-family candidate |
| WHAT | must receive a branch assignment |
| WHEN | before applying branch closures or lift obstruction |
| WHERE | branch-exhaustion layer |
| WHY | an unassigned branch could escape every blocker |
| HOW | classify by exponent mechanism, factor structure, or mod-7 lifted family |
| WHAT ALLOWS IT | current topology has no unassigned known branches |
| WHAT BLOCKS IT | no all-range branch classification theorem yet |
| WHAT WOULD BREAK IT | any candidate outside every branch assignment |
| DOES IT CHANGE | moves from finite topology audit to universal classification |
| STATUS | PROOF TARGET - NOT PROVEN |
| NEXT ACTION | derive an exponent-pattern classification rule |

## Candidate Assignment Rule Target

For each candidate, assign by this order:

1. If all active terms are cubes, assign to pure cube.
2. If a sixth power rewrites as a cube, assign to sixth bridge.
3. If the target is controlled by fourth-power difference, assign to fourth target.
4. If exponents are mixed and do not reduce, assign to mixed power.
5. If cube-driven miss-1 behavior appears, assign to mod-7 lifted family.
6. If none apply, create a new branch and mark H1 incomplete.

## What Would Close H1

H1 closes if we prove:

```text
No relevant no-family candidate can remain outside the branch ledger.
```

## What Would Break H1

- a new exponent mechanism outside the ledger
- a candidate that changes branch assignment under lift
- a no-family exact equality from an unassigned mechanism
- a mixed-power family that cannot be classified or reduced

## Current Gap

```text
NEEDS_BRANCH_EXHAUSTION_ARGUMENT
```

## Plain Read

H1 is the assignment theorem. It does not block equality by itself. It ensures every candidate is sent to a blocker.
