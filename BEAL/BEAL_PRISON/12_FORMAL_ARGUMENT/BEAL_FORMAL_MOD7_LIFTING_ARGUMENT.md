# Beal Formal Mod-7 Lifting Argument

## Status

**TARGET ARGUMENT - NOT FULL PROOF**

This document converts the current gold mod-7 obstruction and lifting results into a formal proof-bridge target.

It does not claim Beal is solved.

## Core Definitions

Beal equation:

```text
A^x + B^y = C^z
```

Family:

```text
gcd(A,B,C) > 1
```

No-family:

```text
gcd(A,B,C) = 1
```

Danger:

```text
no-family and exact equality
```

Miss:

```text
Delta = A^x + B^y - C^z
```

Miss-1:

```text
|Delta| = 1
```

Miss-0:

```text
Delta = 0
```

## Known Finite Results

| Result | Value |
|---|---:|
| highest base | 12500 |
| exp max | 8 |
| danger | 0 |
| closest miss | 1 |
| value templates | 39 |
| raw miss-1 hits | 106 |
| density-collapse R2 | 0.999825 |
| density slope | 2.680313 |
| proof bridge | 62-70% |

## Branch Closures

| Branch | Status | Reason | Label |
|---|---|---|---|
| Pure cube | CLOSED | Exact danger becomes `a^3 + b^3 = c^3`; closed by Fermat exponent 3. | KNOWN_THEOREM |
| Sixth bridge | CLOSED | `a^6 = (a^2)^3`; reduces to the cube wall. | FORMAL_REDUCTION + KNOWN_THEOREM |
| Fourth target | CONTAINED | `C^4 - B^4 = (C-B)(C+B)(C^2+B^2)`. | CONTAINED |
| Mixed power | ISOLATED | Local audit found no growing family. | ISOLATED |

## Mod-7 Core Fact

For any integer `n`:

```text
n^3 mod 7 is in {0,1,6}
```

This is the reason mod 7 is a natural cube obstruction lens. Cube-driven branches do not spread freely across every residue.

## Tested Mod-Fit Result

| Mod | Families | Read |
|---:|---:|---|
| 12 | 22 | still too fine |
| 9 | 19 | useful |
| 7 | 16 | best fit |
| 63 | 22 | too much clothing |
| 2520 | 28 | fully too fine |

Read:

```text
mod 7 compresses the miss-1 structure without mixing side or mechanism.
```

## Obstruction Claim

For the known cube-driven no-family branches, the mod-7 family permits miss-1 residue behavior but does not permit miss-0 closure in the tested ledger.

Label:

```text
FINITE_GOLD_OBSTRUCTION
```

Current finite table:

| Metric | Value |
|---|---:|
| mod-7 families | 9 |
| families with miss-1 | 9 |
| families with miss-0 closure possible | 0 |
| side mixing | 0 |
| mechanism mixing | 0 |

## Lifting Claim

The mod-7 obstruction persists through lifted layers:

```text
7 -> 49 -> 343
```

The available runner table also includes:

```text
2401 tested
```

In the tested table, miss-1 lifts and miss-0 closure remains absent through `2401`.

Label:

```text
FINITE_GOLD_LIFTING
```

## Formal Lemma Target

### Lemma Target - Mod-7 Lifting Obstruction

For every cube-driven no-family branch in the current topology, if the branch belongs to a mod-7 family whose miss-1 residue path lifts through mod 49 and mod 343 while miss-0 closure does not lift, then that branch is obstructed from becoming exact equality inside that lifted family.

Plain:

```text
The branch can travel near the door, but the lifted residue path does not land on the door.
```

## What This Proves If Formalized

It would formally support:

```text
No-family near-collision branches cannot become exact equality through the known cube-driven topology.
```

It would not automatically prove the entire Beal conjecture unless every possible branch is shown to enter one of the closed, contained, isolated, or obstructed families.

## Formal Argument Flow

1. Start with a no-family branch.
2. Assign it a mechanism.
3. If pure cube, close by Fermat exponent 3.
4. If sixth bridge, reduce to cube, then close by Fermat exponent 3.
5. If fourth target, send to factor-wall containment.
6. If mixed-power, mark isolated/open unless a formal general rule is added.
7. If branch is cube-driven miss-1, assign a mod-7 family.
8. Check whether a miss-1 residue path exists.
9. Check whether miss-0 residue closure exists.
10. Lift to mod 49 and mod 343.
11. If miss-1 lifts but miss-0 does not, mark lifted obstruction.
12. Remaining proof gap is proving the lifting obstruction for all higher layers and all branch members.

## Exact Family Table Status

The current project has a runner-filled family table at:

```text
BEAL_PRISON/09_FORMAL_PROOF_BRIDGE/MOD7_LIFTING_FAMILY_TABLE.md
```

It records `9` gold families. Each family supports miss-1, lifts through `7 -> 49 -> 343`, and has no miss-0 closure in the tested ledger.

This is finite gold evidence, not all-range proof.

## Claim Labels

| Claim | Label | Status | Reason |
|---|---|---|---|
| Danger definition | FORMAL | locked | definition of danger |
| Roof clean base 12500 | FINITE_GOLD | finite evidence | danger 0, closest miss 1 |
| Pure cube closure | KNOWN_THEOREM | closed | Fermat exponent 3 |
| Sixth bridge closure | FORMAL_REDUCTION + KNOWN_THEOREM | closed | `a^6 = (a^2)^3` |
| Fourth target | CONTAINED | not fully closed | factor wall contains but does not finish |
| Mixed power | ISOLATED | open general rule | local audit only |
| Mod7 obstruction | FINITE_GOLD | tested gold | miss-0 blocked in current ledger |
| Mod7 lifting | FINITE_GOLD | tested gold | lift survives through tested layers |
| All-range mod7 lifting | OPEN / NEXT_GATE | not proven | needs all-range argument |

## What Would Break The Argument

1. A no-family exact equality row appears.
2. Closest miss becomes 0.
3. A new branch appears outside known topology.
4. Mixed-power cases form a growing family.
5. Fourth-power factor wall admits exact no-family closure.
6. Mod-7 miss-0 closure appears in lifted layers.
7. The lifting obstruction fails beyond mod343.

## What Strengthens The Argument

1. Exact mod-7 family table filled.
2. Mod49 and mod343 family table filled.
3. Mod2401 optional lift also blocks miss-0.
4. Mixed-power isolation upgraded to formal rule.
5. Fourth-power containment upgraded to closure.
6. Density-collapse law stays stable at larger roofs.
7. Every branch gets a full-picture forensic card.

## Final Read

The formal argument is not a Beal proof yet. It is the next proof bridge. It organizes the current gold results into a structured argument: known cube branches are closed, sixth-power branches reduce to cube, fourth-power branches are factor-contained, mixed-power branches are isolated, and the mod-7 obstruction/lifting path is the strongest remaining bridge. The next required object is the exact mod-7 to mod-49 to mod-343 family table as a formal all-range proof object.
