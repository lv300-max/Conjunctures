# Beal Branch Membership Stability Ledger

## Status

TARGET LEDGER - NOT FULL PROOF

The branch-exhaustion audit showed:

```text
known branches: 4
assigned known branches: 4
unassigned known branches: 0
assigned-open branches: FOURTH_POWER_TARGET_BRANCH, MIXED_POWER_BRANCH
```

This file asks the next question:

```text
What keeps each branch inside its assignment?
```

## Stability Table

| Branch | Assignment | What keeps it there | What would let it escape | Current status | Next action |
|---|---|---|---|---|---|
| Pure cube | CLOSED | exact form is `a^3+b^3=c^3` | a positive integer solution to Fermat exponent 3 | stable by known theorem | cite theorem cleanly |
| Sixth bridge | REDUCED_TO_CUBE | `a^6=(a^2)^3` | a sixth bridge that does not rewrite as a cube equation | stable by algebraic reduction | keep reduction explicit |
| Fourth target | CONTAINED | `C^4-B^4=(C-B)(C+B)(C^2+B^2)` | factor wall admits exact no-family closure | assigned but open | build factor-wall closure |
| Mixed power | ISOLATED | local audit found no growing branch | mixed cases form a growing exact family | assigned but open | build mixed-power general rule |
| Mod-7 lifted families | LIFTED | tracked path has `Delta=+/-1 mod 7^k` | candidate leaves tracked family or admits `Delta=0` | finite gold plus formal core | prove family-membership stability |

## Membership Stability Target

Every no-family candidate must remain inside one of these assignments:

```text
closed / reduced / contained / isolated / lifted
```

The target is not merely to say every known branch has a label.

The target is:

```text
no candidate can move from an assigned branch into an untracked exact-equality branch.
```

## Full Picture For The Current Block

| Field | Answer |
|---|---|
| WHO | no-family candidates inside known branch types |
| WHAT | must remain in assigned branch classes |
| WHEN | after branch-exhaustion audit |
| WHERE | formal argument layer |
| WHY | the lift rule only works if the candidate stays on a tracked path |
| HOW | prove closure, reduction, containment, isolation, or lifted-family membership |
| WHAT ALLOWS IT | current topology has no unassigned known branches |
| WHAT BLOCKS IT | fourth target and mixed power are assigned but still open |
| WHAT WOULD BREAK IT | a candidate escapes all assignments and reaches exact equality |
| DOES IT CHANGE | shifts focus from counting branches to proving assignment stability |
| STATUS | TARGET - NOT PROVEN |
| NEXT ACTION | build fourth-factor closure target and mixed-power general rule |

## Immediate Subgates

1. `FOURTH_FACTOR_WALL_CLOSURE_TARGET`
2. `MIXED_POWER_GENERAL_RULE_TARGET`
3. `MOD7_FAMILY_MEMBERSHIP_STABILITY_TARGET`

## Plain Read

The known branches are assigned. The next proof task is proving those assignments are stable and exhaustive.
