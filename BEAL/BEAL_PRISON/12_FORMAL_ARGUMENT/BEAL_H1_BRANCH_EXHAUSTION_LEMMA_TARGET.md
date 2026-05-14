# Beal H1 Branch Exhaustion Lemma Target

## Status

OPEN / NEXT_GATE

This is a lemma target, not a proven lemma.

## Lemma Statement

Every relevant no-family candidate must receive a branch assignment before any closure or obstruction argument is applied.

Formal target:

```text
If gcd(A,B,C)=1 and A^x + B^y = C^z is a candidate path,
then the path belongs to one of:
pure cube,
sixth bridge,
fourth target,
mixed power,
mod-7 lifted family,
or a newly declared branch with its own blocker.
```

## Label

PROOF_TARGET

## Full Picture

| Field | Answer |
|---|---|
| WHO | every no-family candidate |
| WHAT | must be assigned to a branch |
| WHEN | before branch closure, containment, isolation, or lifting |
| WHERE | branch-exhaustion layer |
| WHY | an unassigned branch escapes every blocker |
| HOW | classify by exponent mechanism, factor structure, or mod-7 lifted family |
| WHAT BLOCKS IT | no all-range branch classification theorem yet |
| WHAT WOULD BREAK IT | a no-family candidate outside every branch |
| WHETHER THE BLOCKER CHANGES | yes; finite audit must become universal classification |
| CURRENT STATUS | OPEN / NEXT_GATE |
| NEXT ACTION | prove exponent-pattern classification covers every candidate path |

## Lemma Proof Skeleton

1. Start with `gcd(A,B,C)=1`.
2. Record exponent signature `(x,y,z)`.
3. If the active equality is cube-only, assign pure cube.
4. If one term is a sixth power reducing to cube, assign sixth bridge.
5. If a fourth-power target controls the exact closure, assign fourth target.
6. If no reduction applies and exponents are mixed, assign mixed power.
7. If the path is cube-driven near-collision, assign mod-7 lifted family.
8. If none apply, H1 is incomplete and a new branch must be added.

## Filled Branch Assignment Table

| Branch | Assignment | Current Status | WHO Blocks It | WHAT Blocks It | WHERE It Blocks | WHY It Works | WHAT Would Break It | Next Action |
|---|---|---|---|---|---|---|---|---|
| Pure cube | assigned | CLOSED | Fermat exponent 3 | no positive nontrivial `a^3+b^3=c^3` | cube branch | exact danger is the forbidden cube equation | a primitive cube equality | cite known theorem cleanly |
| Sixth bridge | assigned | CLOSED | cube reduction + Fermat exponent 3 | `a^6=(a^2)^3` | sixth bridge branch | exact danger reduces to cube equation | sixth bridge that does not reduce to cube | cite reduction cleanly |
| Fourth target | assigned-open-gap | CONTAINED | factor wall | `C^4-B^4=(C-B)(C+B)(C^2+B^2)` | fourth target branch | exact closure must pass restrictive factor pieces | primitive exact closure passing factor wall | finish H4 factor closure |
| Mixed power | assigned-open-gap | ISOLATED | local audit + pending general rule | no growing exact family found | mixed branch | current cases do not produce danger | mixed branch grows or gives exact equality | finish H5 mixed rule |
| Mod-7 lifted families | assigned for tracked cube-driven families | FINITE_GOLD / OPEN | mod-7 obstruction + lift table | miss-1 lifts, miss-0 absent through `2401` | 7-adic family layer | tracked paths stay off zero in tested layers | lifted family admits `Delta=0` | finish H6 infinite lift |

## H1 Filled Evidence

| Metric | Value | Label |
|---|---:|---|
| known branches | 4 | FINITE_EVIDENCE |
| assigned known branches | 4 | FINITE_GOLD |
| unassigned known branches | 0 | FINITE_GOLD |
| assigned open branches | 2 | OPEN_GAPS |

## H1 Current Conclusion

```text
All known branches are assigned.
Universal branch exhaustion is not proven yet.
```

This fills H1 at the finite topology level. It does not close H1.

## Filled Decision Tree

File:

```text
BEAL_H1_BRANCH_EXHAUSTION_FILL.md
```

Current filled rule:

```text
candidate
  -> cube?
  -> sixth-to-cube?
  -> fourth factor target?
  -> mixed signature?
  -> tracked mod-7 lifted family?
  -> otherwise new branch
```

H1 closes only if the final bucket is empty:

```text
otherwise new branch = empty
```

## New Branch Bucket Audit

File:

```text
BEAL_H1_NEW_BRANCH_BUCKET_AUDIT.md
```

Result:

```text
FINITE_NO_NEW_BRANCH_BUCKET_FOUND
```

Audit facts:

| Metric | Value |
|---|---:|
| highest base checked in available result files | 12500 |
| other/unknown total in known mechanism counts | 0 |
| sample rows classified as NEW_BRANCH | 0 |

Universal status:

```text
UNIVERSAL_H1_NOT_PROVEN
```

Read:

```text
H1 is not falsified by existing data. H1 is not universally proven yet.
```

## What Would Close H1

```text
No relevant no-family candidate can remain outside the branch ledger.
```

## What Remains Open

```text
NEEDS_BRANCH_EXHAUSTION_ARGUMENT
NEEDS_EXPONENT_SIGNATURE_CLASSIFICATION
NEEDS_NO_NEW_BRANCH_ARGUMENT
NEEDS_EMPTY_NEW_BRANCH_BUCKET_PROOF
```

## Plain Read

H1 is the routing lemma. It does not prove a blocker. It proves every candidate must be sent to one.
