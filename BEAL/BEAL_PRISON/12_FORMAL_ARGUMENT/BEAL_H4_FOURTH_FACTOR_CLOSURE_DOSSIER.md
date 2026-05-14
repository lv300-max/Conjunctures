# Beal H4 Fourth Factor Closure Dossier

## Status

CLOSURE TARGET - NOT PROVEN

## H4 Statement

Fourth-power target branches cannot produce exact no-family equality.

Current status:

```text
CONTAINED
```

Target status:

```text
CLOSED
```

## Factor Wall

The branch is controlled by:

```text
C^4 - B^4 = (C-B)(C+B)(C^2+B^2)
```

## WHO / WHAT / WHEN / WHERE / WHY / HOW

| Field | Answer |
|---|---|
| WHO | fourth-power target candidates |
| WHAT | must fail exact no-family closure |
| WHEN | after branch assignment |
| WHERE | fourth target branch |
| WHY | difference of fourth powers factors into structured pieces |
| HOW | use gcd, parity, and perfect-power constraints on the factors |
| WHAT ALLOWS IT | factor wall constrains any exact target |
| WHAT BLOCKS IT | factor wall is not yet formal impossibility |
| WHAT WOULD BREAK IT | exact gcd=1 solution passing the factor wall |
| DOES IT CHANGE | target is to move CONTAINED to CLOSED |
| STATUS | CLOSURE TARGET - NOT PROVEN |
| NEXT ACTION | prove factor product cannot be primitive perfect-power closure |

## Needed Lemmas

1. gcd relations among `C-B`, `C+B`, and `C^2+B^2`
2. parity restrictions
3. primitive gcd constraints from `gcd(A,B,C)=1`
4. perfect-power compatibility of the factor product
5. contradiction for exact no-family closure

## What Would Close H4

H4 closes if:

```text
(C-B)(C+B)(C^2+B^2)
```

cannot equal the required primitive perfect-power structure for any no-family exact equality.

## Current Gap

```text
NEEDS_FOURTH_POWER_FULL_CLOSURE
```

## Plain Read

H4 is already contained by the factor wall. The proof task is turning that containment into impossibility.
