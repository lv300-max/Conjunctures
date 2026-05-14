# Beal H1 Branch Exhaustion Fill

## Status

FINITE_FILLED / UNIVERSAL_OPEN

This fills the current H1 table and separates the finite branch audit from the universal theorem target.

## H1 Claim

Every relevant no-family candidate must be assigned before any blocker can be trusted.

Target:

```text
No no-family candidate can escape the branch ledger.
```

## Filled Assignment Rule

| Order | Candidate Shape | Branch Assignment | Blocker | Current Status | Gap |
|---:|---|---|---|---|---|
| 1 | exact cube form `a^3+b^3=c^3` | pure cube | Fermat exponent 3 | CLOSED | none for this branch |
| 2 | sixth-power bridge `a^6+b^3=c^3` or swap | sixth bridge | `a^6=(a^2)^3`, then cube wall | CLOSED | none if reduction applies |
| 3 | fourth target requiring `C^4-B^4` | fourth target | factor wall | CONTAINED | needs all-range closure |
| 4 | irreducible mixed exponent signature | mixed power | local isolation / pending rule | ISOLATED | needs mixed general rule |
| 5 | cube-driven miss-1 residue family | mod-7 lifted family | conditional H6 lift obstruction | FINITE_GOLD / CONDITIONAL_FORMAL | needs membership stability |
| 6 | none of the above | new branch | none yet | H1_FAILS | add branch and blocker |

## Branch Audit Filled

| Metric | Value |
|---|---:|
| known branches | 4 |
| assigned known branches | 4 |
| unassigned known branches | 0 |
| assigned-open branches | 2 |

Assigned-open branches:

```text
FOURTH_POWER_TARGET_BRANCH
MIXED_POWER_BRANCH
```

## Exhaustion Test

For H1 to close, every candidate must pass this decision tree:

```text
candidate
  -> cube?
  -> sixth-to-cube?
  -> fourth factor target?
  -> mixed signature?
  -> tracked mod-7 lifted family?
  -> otherwise new branch
```

If the last line occurs, H1 is not closed.

## Full Picture

| Field | Answer |
|---|---|
| WHO | every no-family candidate |
| WHAT | must enter a branch before a blocker applies |
| WHEN | before theorem conclusion |
| WHERE | branch-exhaustion layer |
| WHY | a candidate outside the ledger is unblocked |
| HOW | decision tree by exponent form, reduction, factor target, mixed signature, or mod-7 family |
| WHAT BLOCKS IT | no universal proof that the decision tree catches every candidate |
| WHAT WOULD BREAK IT | any exact candidate in the `otherwise new branch` bucket |
| WHETHER THE BLOCKER CHANGES | yes; finite topology audit must become universal branch theorem |
| CURRENT STATUS | FINITE_FILLED / UNIVERSAL_OPEN |
| NEXT ACTION | prove no candidate reaches the `otherwise new branch` bucket |

## Current H1 Conclusion

```text
Known branches are exhausted.
All branches are not universally exhausted yet.
```

## Falsification Attempt

The new-branch bucket audit checked existing result files through the available 12500 extension layer.

Result:

```text
FINITE_NO_NEW_BRANCH_BUCKET_FOUND
```

| Check | Result |
|---|---:|
| other/unknown mechanism total | 0 |
| sample rows in NEW_BRANCH bucket | 0 |
| H1 falsified by current data | no |
| H1 universally proven | no |

## Final Read

H1 is filled as a branch-routing table and is not falsified by current data. It is not closed until the `otherwise new branch` bucket is proven empty for all relevant candidates.
