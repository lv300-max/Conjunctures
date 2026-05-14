# Beal H6 Infinite Lift Rule Dossier

## Status

PROOF TARGET - NOT PROVEN

## H6 Statement

Every tracked mod-7 lifted family blocks miss-0 at every 7-adic level.

Formal target:

```text
For every k >= 1,
Delta = +/-1 mod 7^k
stays off
Delta = 0 mod 7^k
```

inside the same tracked lifted family.

## Current Finite-Gold Evidence

| Item | Value |
|---|---:|
| tracked families | 9 |
| miss-1 families | 9 |
| miss-0 closure families | 0 |
| tested layers | 7, 49, 343, 2401 |
| side mixing | 0 |
| mechanism mixing | 0 |

## Formal Core Already Available

If a tracked path has:

```text
Delta = +/-1 mod 7^k
```

then it cannot also have:

```text
Delta = 0 mod 7^k
```

and therefore cannot be:

```text
Delta = 0 mod 7^(k+1)
```

without leaving the tracked path.

## WHO / WHAT / WHEN / WHERE / WHY / HOW

| Field | Answer |
|---|---|
| WHO | the 9 tracked mod-7 lifted families |
| WHAT | miss-1 persists while miss-0 closure stays absent |
| WHEN | through tested layers and target all layers |
| WHERE | 7-adic lifting layer |
| WHY | `+/-1 mod 7^k` is incompatible with `0 mod 7^k` |
| HOW | use the recurrence `Delta_{k+1}=Delta_k+7^k L_F` |
| WHAT ALLOWS IT | family table has no side mixing and no mechanism mixing |
| WHAT BLOCKS IT | all-range membership stability is not yet formal |
| WHAT WOULD BREAK IT | tracked family admits `Delta=0` or leaves the tracked path |
| DOES IT CHANGE | moves from finite-gold lift to infinite-lift theorem target |
| STATUS | PROOF TARGET - NOT PROVEN |
| NEXT ACTION | prove family membership is stable under every lift |

## Recurrence

For a lift:

```text
A' = A0 + 7^k u
B' = B0 + 7^k v
C' = C0 + 7^k w
```

the first-order recurrence is:

```text
Delta_{k+1} = Delta_k + 7^k * L_F(u,v,w) mod 7^(k+1)
```

where:

```text
L_F = x*A0^(x-1)*u + y*B0^(y-1)*v - z*C0^(z-1)*w mod 7
```

## What H6 Must Prove

H6 must prove:

```text
the tracked family path cannot change from Delta=+/-1 to Delta=0
at any 7-adic layer.
```

It must also prove:

```text
candidate membership in the tracked family is stable.
```

## What Would Close H6

H6 closes if each of the 9 families has an all-layer recurrence proof:

```text
F_i: Delta=+/-1 forever, Delta=0 never.
```

## What Would Break H6

- a tracked family admits `Delta=0`
- a lift changes side or mechanism
- a candidate leaves the tracked family
- a new cube-driven family appears outside the 9-family table

## Current Gap

```text
NEEDS_INFINITE_LIFT_RULE
NEEDS_BRANCH_MEMBERSHIP_STABILITY
```

## Plain Read

H6 is the lift theorem. It turns the finite `7,49,343,2401` pattern into an all-layer 7-adic obstruction.
