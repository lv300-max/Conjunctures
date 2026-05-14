# Beal H1 / H6 Final Gap Attack

## Status

ACTIVE PROOF-BRIDGE WORK ORDER - NOT FULL PROOF

You now have the right target.

Not scan more.

Not find random patterns.

The target is:

```text
branch exhaustion + infinite lift closure
```

That is the proof bridge.

## Current Theorem Target

```text
BEAL_BRANCH_EXHAUSTION_INFINITE_LIFT_THEOREM
```

Current missing hypotheses:

```text
H1 branch exhaustion
H4 fourth target closure
H5 mixed power general rule
H6 infinite lift rule
```

## Move 1 - H1 Branch Exhaustion Dossier

### Mission

Prove or test:

```text
Every no-family candidate receives one branch assignment.
```

### Current Evidence

Known topology branches:

| Branch | Assignment | Status |
|---|---|---|
| pure cube | closed | KNOWN_THEOREM |
| sixth bridge | reduced | FORMAL_REDUCTION |
| fourth target | contained | OPEN CLOSURE |
| mixed power | isolated | OPEN GENERAL RULE |
| mod-7 lifted families | lifted | FINITE_GOLD + FORMAL CORE |

Known branch audit:

```text
knownBranches: 4
assignedKnownBranches: 4
unassignedKnownBranches: 0
```

### What H1 Must Prove

H1 must upgrade:

```text
all known branches are assigned
```

to:

```text
every relevant no-family candidate must be assigned
```

### Needed Output

```text
BEAL_H1_BRANCH_EXHAUSTION_DOSSIER.md
```

Status:

```text
CREATED
```

### What Would Break H1

- a new branch outside the topology
- a candidate that is not pure cube, sixth bridge, fourth target, mixed power, or mod-7 lifted
- a candidate that changes assignment under lift

## Move 2 - H6 Infinite Lift Rule

### Mission

Formalize:

```text
mod 7 -> 49 -> 343 -> 2401 -> forever
```

### Current Evidence

The finite-gold family table gives:

```text
families: 9
miss-1 exists: 9/9
miss-0 closure absent: 9/9
tested layers: 7,49,343,2401
```

### Formal Core Already Built

If a tracked path has:

```text
Delta = +/-1 mod 7^k
```

then it cannot also have:

```text
Delta = 0 mod 7^k
```

and cannot be:

```text
Delta = 0 mod 7^(k+1)
```

on the same tracked path.

### What H6 Must Prove

H6 must upgrade:

```text
the tracked path stays miss-1 through 2401
```

to:

```text
the tracked path stays miss-1 for every 7^k
```

and:

```text
candidate membership in that tracked path is stable.
```

### Needed Output

```text
BEAL_H6_INFINITE_LIFT_RULE_DOSSIER.md
```

Status:

```text
CREATED
```

### What Would Break H6

- a tracked family admits `Delta = 0`
- a lift changes side or mechanism
- a candidate leaves the tracked family
- a new cube-driven family appears outside the 9-family table

## Move 3 - H4 / H5 Cleanup

### H4 Mission

Turn:

```text
fourth contained
```

into:

```text
fourth closed
```

### H4 Needed Output

```text
BEAL_H4_FOURTH_FACTOR_CLOSURE_DOSSIER.md
```

Status:

```text
CREATED
```

### H5 Mission

Turn:

```text
mixed isolated
```

into:

```text
mixed general rule
```

### H5 Needed Output

```text
BEAL_H5_MIXED_POWER_GENERAL_RULE_DOSSIER.md
```

Status:

```text
CREATED
```

## Attack Order

| Order | Gate | Reason |
|---:|---|---|
| 1 | H1 Branch Exhaustion | If H1 fails, a branch can escape the theorem. |
| 2 | H6 Infinite Lift Rule | If H6 succeeds, tracked lifted families cannot reach miss-0. |
| 3 | H4 Fourth Closure | Turns contained into closed. |
| 4 | H5 Mixed Rule | Turns isolated into a general rule. |

## Lemma Targets Created

| Hypothesis | Lemma Target File | Status |
|---|---|---|
| H1 | `BEAL_H1_BRANCH_EXHAUSTION_LEMMA_TARGET.md` | OPEN / NEXT_GATE |
| H6 | `BEAL_H6_INFINITE_LIFT_RULE_LEMMA_TARGET.md` | FINITE_GOLD / OPEN_FORMAL_TARGET |
| H4 | `BEAL_H4_FOURTH_FACTOR_CLOSURE_LEMMA_TARGET.md` | CONTAINED / OPEN_CLOSURE_TARGET |
| H5 | `BEAL_H5_MIXED_POWER_GENERAL_RULE_LEMMA_TARGET.md` | ISOLATED / OPEN_GENERAL_RULE_TARGET |

Ledger:

```text
BEAL_FORMAL_LEMMA_LEDGER.md
```

## Current Formalization Status

The dossiers are now formal lemma targets.

Current status:

```text
TARGET_NOT_PROVEN
```

Next action:

```text
fill the lemma targets with exact proof tables
```
| 4 | H5 Mixed Rule | Turns isolated into general rule. |

## Current Proof Bridge Read

The project has moved from:

```text
finite roof scans
```

to:

```text
theorem-shaped branch ledger
```

The proof bridge now depends on whether every no-family candidate is exhausted by the ledger and whether tracked lifted families block miss-0 forever.

## Final Read

You now have the right target. Not "scan more." Not "find random patterns."

The target is:

```text
branch exhaustion + infinite lift closure
```

That is the proof bridge.
