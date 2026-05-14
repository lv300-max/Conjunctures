# Beal Branch Membership Stability Target

## Status

TARGET - NOT PROVEN

## Target Statement

Every relevant no-family candidate remains in one of the current topology assignments:

```text
closed / reduced / contained / isolated / lifted
```

No candidate may leave the assigned branch and become a new untracked exact-equality family.

## Why This Is The Next Gate

The lift rule handles one tracked path:

```text
Delta = +/-1 mod 7^k cannot become Delta = 0 mod 7^(k+1)
```

The branch-exhaustion problem is wider:

```text
prove the candidate must be on a tracked path,
or prove it closes by an existing wall.
```

## What Must Be Proven

1. Pure cube candidates stay in the Fermat-closed branch.
2. Sixth bridge candidates reduce to pure cube.
3. Cube-driven miss-1 candidates enter the 9 lifted families.
4. Fourth-power target candidates cannot produce exact no-family closure.
5. Mixed-power candidates cannot become a growing exact branch.
6. No new mechanism appears outside the topology.

## What Would Break It

- a new no-family exact-equality branch
- a cube-driven candidate outside the 9 lifted families
- a fourth-power exact closure
- a mixed-power growing family
- a topology branch with no assignment

## Plain Read

The known branches are assigned. The remaining problem is proving the assignment list is exhaustive and stable.
