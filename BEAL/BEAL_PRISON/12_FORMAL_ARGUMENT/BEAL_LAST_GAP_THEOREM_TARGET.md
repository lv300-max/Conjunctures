# Beal Last Gap Theorem Target

## Status

THEOREM TARGET - NOT PROVEN

This file replaces the weaker phrasing:

```text
next theorem = mod-7 lifting
```

with the correct last-gap statement:

```text
next theorem = branch exhaustion plus infinite lift
```

## Last Gap Statement

Every relevant no-family candidate must either:

1. close by a known theorem,
2. reduce to a closed branch,
3. remain contained without exact no-family closure,
4. remain isolated without becoming a growing exact branch, or
5. enter a tracked 7-adic lifted family whose miss-1 path cannot become miss-0.

## Formal Target

For every no-family candidate:

```text
gcd(A,B,C)=1
```

and every candidate equality:

```text
A^x + B^y = C^z
```

the candidate belongs to one of the current topology assignments:

```text
CLOSED / REDUCED / CONTAINED / ISOLATED / LIFTED
```

and none of those assignments permits exact primitive equality.

## Two Required Parts

### Part 1 - Branch Exhaustion

Prove:

```text
No relevant no-family candidate escapes the current branch ledger.
```

That means every candidate is assigned to:

```text
pure cube
sixth bridge
fourth target
mixed power
mod-7 lifted family
```

or to a formally added branch with its own closure rule.

### Part 2 - Infinite Lift

Prove:

```text
Every tracked mod-7 family keeps Delta = +/-1
and never admits Delta = 0
at every 7-adic lift.
```

The finite table already shows this through:

```text
7, 49, 343, 2401
```

The proof needs all powers:

```text
7^k for every k >= 1
```

## Current Branch Assignments

| Branch | Assignment | Status | Remaining gap |
|---|---|---|---|
| Pure cube | closed | KNOWN_THEOREM | none for cube branch |
| Sixth bridge | reduced to cube | FORMAL_REDUCTION + KNOWN_THEOREM | none if reduction is clean |
| Fourth target | contained | CONTAINED | needs full closure |
| Mixed power | isolated | ISOLATED | needs general rule |
| Mod-7 lifted families | lifted | FINITE_GOLD + FORMAL CORE | needs branch membership stability |

## Exact Family Table Status

The exact finite family table is no longer missing.

Current status:

```text
families: 9
miss-1 families: 9
miss-0 closure families: 0
tested layers: 7,49,343,2401
```

Remaining issue:

```text
turn this finite table into an all-range branch-membership and lift theorem.
```

## What Would Prove The Last Gap

The last gap would be closed if the project proves:

```text
Every no-family candidate is forced into the ledger,
and every ledger assignment blocks exact primitive equality.
```

## What Would Break The Last Gap

1. A no-family exact equality row appears.
2. A candidate escapes the branch ledger.
3. A tracked 7-adic family admits miss-0.
4. Fourth-power containment admits exact closure.
5. Mixed-power isolation becomes a growing exact branch.

## Reviewer Sentence

The remaining theorem is not merely a mod-7 lifting lemma. It is a branch-exhaustion plus infinite-lift theorem: every no-family candidate must be forced into a closed, reduced, contained, isolated, or tracked lifted family, and the tracked lifted families must never admit miss-0 at any 7-adic level.

## Plain Read

The last gap is now named correctly. The proof target is branch exhaustion plus infinite lift, not another finite scan.
