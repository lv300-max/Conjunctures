# Beal Branch Exhaustion Infinite Lift Theorem

## Status

**THEOREM TARGET - NOT PROVEN**

This is the current last-gap theorem target for the Beal Prison project.

It does not claim Beal is solved.

## Theorem Name

```text
Branch Exhaustion Infinite Lift Theorem
```

## Theorem Target

Let:

```text
A^x + B^y = C^z
```

with:

```text
x,y,z >= 3
```

and:

```text
gcd(A,B,C)=1
```

Then no exact equality occurs if every no-family candidate is forced into one of these assignments:

```text
CLOSED / REDUCED / CONTAINED / ISOLATED / LIFTED
```

and every assignment blocks exact primitive equality.

## Plain Statement

Every no-family candidate must enter the ledger, and every ledger assignment must block the power gate.

## Formal Hypotheses

### H1 - Branch Exhaustion

Every relevant no-family candidate belongs to one of the current topology assignments:

```text
pure cube
sixth bridge
fourth target
mixed power
mod-7 lifted family
```

or to a formally added branch with its own closure rule.

### H2 - Pure Cube Closure

If the candidate is pure cube, exact danger becomes:

```text
a^3 + b^3 = c^3
```

This is blocked by Fermat exponent 3.

Label:

```text
KNOWN_THEOREM
```

### H3 - Sixth Bridge Reduction

If the candidate is sixth bridge:

```text
a^6 + b^3 = c^3
```

then:

```text
a^6 = (a^2)^3
```

so the exact danger reduces to the pure cube wall.

Label:

```text
FORMAL_REDUCTION + KNOWN_THEOREM
```

### H4 - Fourth Target Closure

If the candidate is fourth target, the factor wall:

```text
C^4 - B^4 = (C-B)(C+B)(C^2+B^2)
```

must block exact no-family closure.

Current label:

```text
CONTAINED / NEEDS_FULL_CLOSURE
```

### H5 - Mixed Power General Rule

If the candidate is mixed power, it must either:

1. reduce to a known branch,
2. stay isolated, or
3. be blocked by a formal mixed-power rule.

Current label:

```text
ISOLATED / NEEDS_GENERAL_RULE
```

### H6 - Infinite Lift Rule

If the candidate belongs to one of the tracked mod-7 lifted families, then for every `k >= 1`:

```text
Delta = A^x + B^y - C^z
```

stays on a tracked path with:

```text
Delta = +/-1 mod 7^k
```

and never admits:

```text
Delta = 0 mod 7^k
```

Current label:

```text
FINITE_GOLD + FORMAL_CORE / NEEDS_INFINITE_LIFT_RULE
```

## Conclusion

Under H1 through H6:

```text
No no-family candidate opens the power gate.
```

Equivalently:

```text
If A^x + B^y = C^z, then gcd(A,B,C)>1.
```

## Proof Strategy

1. Start with an arbitrary no-family candidate.
2. Apply branch exhaustion.
3. If pure cube, close by Fermat exponent 3.
4. If sixth bridge, reduce to pure cube, then close.
5. If fourth target, apply fourth-factor closure.
6. If mixed power, apply the mixed-power general rule.
7. If mod-7 lifted, apply the infinite lift rule.
8. Every assigned branch blocks exact equality.
9. Therefore no no-family exact equality remains.

## Current Evidence Supporting The Theorem Target

| Evidence | Status | Role |
|---|---|---|
| roof clean through base 12500 / exp 8 | FINITE_GOLD | no counterexample in tested roof |
| danger 0 | FINITE_GOLD | no primitive exact equality found |
| closest miss 1 | FINITE_GOLD | no miss-0 reached |
| 39 value templates | FINITE_EVIDENCE | miss-1 wall remains small |
| 106 raw miss-1 hits | FINITE_EVIDENCE | raw hits remain controlled |
| density R2 0.999825 | PATTERN_EVIDENCE | miss-1 density keeps thinning |
| pure cube closure | KNOWN_THEOREM | closes cube branch |
| sixth bridge reduction | FORMAL_REDUCTION | reduces bridge to cube |
| 9 mod-7 families | FINITE_GOLD | finite lifted family table exists |
| lift through 7,49,343,2401 | FINITE_GOLD | tested lift pattern survives |

## Current Missing Pieces

1. `NEEDS_BRANCH_EXHAUSTION_ARGUMENT`
2. `NEEDS_INFINITE_LIFT_RULE`
3. `NEEDS_BRANCH_MEMBERSHIP_STABILITY`
4. `NEEDS_MIXED_POWER_GENERAL_RULE`
5. `NEEDS_FOURTH_POWER_FULL_CLOSURE`

## What Would Break The Theorem Target

1. A no-family exact equality row appears.
2. A candidate escapes the branch ledger.
3. A tracked lifted family admits `Delta = 0`.
4. Fourth-power containment admits exact no-family closure.
5. Mixed-power isolation becomes a growing exact branch.
6. A new mechanism appears outside the topology.

## What Would Complete The Theorem Target

The theorem target would become a proof if the project proves:

```text
H1 branch exhaustion
H4 fourth target closure
H5 mixed power general rule
H6 infinite lift rule
```

because H2 and H3 are already theorem-backed or algebraically reduced.

## Full Picture Card

| Field | Answer |
|---|---|
| WHO | all no-family candidates |
| WHAT | must enter a branch assignment that blocks exact equality |
| WHEN | after branch-exhaustion and 7-adic recurrence layers |
| WHERE | final theorem target layer |
| WHY | no-family danger exists only if an assigned branch permits miss-0 |
| HOW | close, reduce, contain, isolate, or lift every branch |
| WHAT ALLOWS IT | current topology assigns all known branches |
| WHAT BLOCKS IT | unproven branch exhaustion, fourth closure, mixed rule, infinite lift |
| WHAT WOULD BREAK IT | exact gcd=1 equality or unassigned escaping branch |
| DOES IT CHANGE | converts the project from finite evidence to theorem target |
| STATUS | THEOREM TARGET - NOT PROVEN |
| NEXT ACTION | prove H1, H4, H5, and H6 |

## Reviewer Sentence

The remaining theorem is a branch-exhaustion plus infinite-lift theorem: every no-family candidate must be forced into a closed, reduced, contained, isolated, or tracked lifted family, and every such family must block exact primitive equality.

## Plain Read

This is the theorem shape. It is not a completed proof. It says exactly what must be proven for the Beal Prison proof bridge to become a theorem-level argument.
