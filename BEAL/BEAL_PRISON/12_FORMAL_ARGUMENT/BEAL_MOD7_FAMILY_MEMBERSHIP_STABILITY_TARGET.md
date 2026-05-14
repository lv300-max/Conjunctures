# Beal Mod-7 Family Membership Stability Target

## Status

MEMBERSHIP TARGET - NOT PROVEN

The 7-adic lift rule controls a tracked path.

This file states the missing membership rule:

```text
cube-driven candidates must stay inside one of the tracked mod-7 families
or close by the cube wall.
```

## Current Evidence

| Item | Value |
|---|---:|
| tracked families | 9 |
| miss-1 families | 9 |
| miss-0 closure families | 0 |
| tested lift layers | 7, 49, 343, 2401 |
| side mixing | 0 |
| mechanism mixing | 0 |

## Membership Target

For every cube-driven no-family candidate:

```text
candidate is pure cube
or sixth bridge
or one of the 9 lifted mod-7 families.
```

If pure cube:

```text
closed by Fermat exponent 3.
```

If sixth bridge:

```text
reduces to pure cube.
```

If lifted family:

```text
tracked Delta=+/-1 path cannot become Delta=0 on that same path.
```

## What Would Break It

1. A cube-driven candidate outside the 9-family table.
2. A candidate changing side or mechanism under lift.
3. A candidate with miss-0 closure in a lifted layer.
4. A new cube mechanism not represented by pure cube or sixth bridge.

## Full Picture

| Field | Answer |
|---|---|
| WHO | cube-driven no-family candidates |
| WHAT | must stay in closed/reduced/lifted family classes |
| WHEN | after 7-adic recurrence table |
| WHERE | mod-7 family layer |
| WHY | lift obstruction only applies to tracked family membership |
| HOW | prove residue family membership is stable under lift |
| WHAT ALLOWS IT | no side mixing and no mechanism mixing in current table |
| WHAT BLOCKS IT | membership stability is not yet formal |
| WHAT WOULD BREAK IT | family-changing lift or new cube family |
| DOES IT CHANGE | turns the next problem into family membership proof |
| STATUS | TARGET - NOT PROVEN |
| NEXT ACTION | derive family membership recurrence |

## Plain Read

The lift path is controlled. The next proof need is proving candidates cannot leave the controlled family list.
