# Beal Branch Exhaustion Plus Infinite Lift Rule

## Status

**RULE TARGET - NOT FULL PROOF**

This is the active rule after the 7-adic recurrence layer.

The formal divisibility point is now clear:

```text
If a tracked path has Delta = +/-1 mod 7^k,
then that same tracked path cannot become Delta = 0 mod 7^(k+1).
```

The remaining proof problem is branch exhaustion.

## Rule Name

```text
BRANCH_EXHAUSTION_PLUS_INFINITE_LIFT_RULE
```

## Rule Statement

Every no-family cube-driven candidate must do one of these:

1. close by the pure cube wall
2. reduce to the cube wall through the sixth-power bridge
3. enter one of the 9 mod-7 lifted families whose tracked path has `Delta = +/-1`
4. be sent to a non-cube open branch: fourth target or mixed power

If it enters one of the 9 lifted families, then the tracked path cannot become miss-0 without leaving that family.

## Formal Core

Let:

```text
Delta = A^x + B^y - C^z
```

If:

```text
Delta = +/-1 mod 7^k
```

then:

```text
Delta != 0 mod 7^k
```

and therefore:

```text
Delta != 0 mod 7^(k+1)
```

along the same tracked residue path.

This part is formal.

## Finite Gold Input

The current table gives:

| Item | Value |
|---|---:|
| mod-7 families | 9 |
| miss-1 families | 9 |
| miss-0 closure families | 0 |
| lift layers tested | 7, 49, 343, 2401 |
| side mixing | 0 |
| mechanism mixing | 0 |

Label:

```text
FINITE_GOLD
```

## Branch Exhaustion Target

To make the rule useful for proof, show:

```text
Every relevant no-family cube-driven branch
is either closed by Fermat exponent 3,
reduced to that closed cube wall,
or belongs to one of the 9 tracked lifted families.
```

This is the current missing bridge.

## What The Rule Blocks

It blocks this path:

```text
known cube-driven miss-1 family -> same lifted path -> miss-0
```

because a path that remains `+/-1 mod 7^k` cannot become `0 mod 7^(k+1)`.

## What The Rule Does Not Yet Block

It does not yet block:

1. a new cube-driven family outside the 9-family table
2. a mixed-power branch becoming non-isolated
3. a fourth-power target escaping factor containment
4. a candidate that changes family instead of staying on the tracked path

## What Would Break The Rule

1. A no-family exact equality row appears.
2. A new cube-driven family appears outside the 9 tracked families.
3. A tracked family admits `Delta = 0`.
4. A lift from `7^k` to `7^(k+1)` changes the family classification.
5. Mixed-power cases form a growing branch.
6. Fourth-power factor containment admits exact no-family closure.

## What Strengthens The Rule

1. Prove every pure-cube candidate closes by Fermat exponent 3.
2. Prove every sixth bridge reduces cleanly to pure cube.
3. Prove every cube-driven miss-1 candidate maps into one of the 9 families.
4. Prove family membership is stable under 7-adic lift.
5. Prove no tracked family can change from `Delta = +/-1` to `Delta = 0`.
6. Upgrade fourth-power containment to closure.
7. Upgrade mixed-power isolation to a general rule.

## Full Picture Card

| Field | Answer |
|---|---|
| WHO | no-family cube-driven branches |
| WHAT | must close, reduce, or enter a tracked lifted family |
| WHEN | after mod-7 obstruction and recurrence table |
| WHERE | formal argument layer |
| WHY | miss-1 tracked paths cannot become miss-0 on the same lift path |
| HOW | divisibility: `+/-1 mod 7^k` is incompatible with `0 mod 7^(k+1)` |
| WHAT ALLOWS IT | 9 finite-gold families, no side mixing, no mechanism mixing |
| WHAT BLOCKS IT | branch exhaustion is not formal yet |
| WHAT WOULD BREAK IT | new family, exact no-family equality, or family-changing lift |
| DOES IT CHANGE | moves the open gap from lift behavior to branch exhaustion |
| STATUS | RULE TARGET - NOT FULL PROOF |
| NEXT ACTION | build branch exhaustion ledger |

## Next Action

Build:

```text
BEAL_BRANCH_EXHAUSTION_LEDGER.md
```

It must list every active branch and answer:

```text
closed / reduced / contained / isolated / lifted / open
```

The proof goal is:

```text
no unassigned no-family branch remains.
```

## One Sentence

The lift rule blocks miss-1 from becoming miss-0 on the same tracked path; the remaining job is proving every relevant branch is forced onto a closed, reduced, contained, isolated, or lifted path.
