# Beal 7-Adic Recurrence Table

## Status

FORMAL RECURRENCE LAYER - NOT FULL PROOF

## Recurrence

For a lift:

```text
A' = A0 + 7^k u
B' = B0 + 7^k v
C' = C0 + 7^k w
```

the first-order binomial lift gives:

```text
Delta_{k+1} = Delta_k + 7^k * L_F(u,v,w) mod 7^(k+1)
```

where:

```text
L_F = x*A0^(x-1)*u + y*B0^(y-1)*v - z*C0^(z-1)*w mod 7
```

## Family Recurrence Table

| Family | Mechanism | Side | Exponents | Residues | Delta | Linear correction | Layers tested | Status | Needed for proof |
|---|---|---|---|---|---|---|---|---|---|
| F1 | pure cube near-collision | RIGHT_HIGH | 3-3-3 | 0-0 -> 1 | -1 | 0u + 0v + 4w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |
| F2 | pure cube near-collision | LEFT_HIGH | 3-3-3 | 0-1 -> 0 | +1 | 0u + 3v + 0w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |
| F3 | pure cube near-collision | LEFT_HIGH | 3-3-3 | 1-1 -> 1 | +1 | 3u + 3v + 4w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |
| F4 | sixth-power to cube bridge | RIGHT_HIGH | 3-3-6 | 1-6 -> 1 | -1 | 3u + 3v + 1w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |
| F5 | sixth-power to cube bridge | LEFT_HIGH | 3-6-3 | 1-6 -> 6 | +1 | 3u + 1v + 4w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |
| F6 | pure cube near-collision | RIGHT_HIGH | 3-3-3 | 6-6 -> 6 | -1 | 3u + 3v + 4w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |
| F7 | pure cube near-collision | RIGHT_HIGH | 3-3-3 | 1-6 -> 1 | -1 | 3u + 3v + 4w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |
| F8 | sixth-power to cube bridge | LEFT_HIGH | 6-3-3 | 1-6 -> 6 | +1 | 6u + 3v + 4w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |
| F9 | pure cube near-collision | LEFT_HIGH | 3-3-3 | 1-6 -> 6 | +1 | 3u + 3v + 4w mod 7 | 7,49,343,2401 | finite gold | infinite lift rule |

## Formal Observation

If a lifted path has:

```text
Delta = +/-1 mod 7^k
```

then that same path cannot also have:

```text
Delta = 0 mod 7^k
```

and therefore cannot become:

```text
Delta = 0 mod 7^(k+1)
```

without leaving the path being tracked.

## Remaining Gap

The remaining gap is branch exhaustion: prove every relevant no-family cube-driven branch stays inside one of these obstructed lifted families, or prove the recurrence excludes miss-0 closure for every higher lift.
