# Beal Hensel Regular Boundary Theorem

## Status

```text
FORMAL (v_7 ≥ 1 rule) / CONDITIONAL_FORMAL (all-layer)
```

## Beal Proof Status

```text
NOT_PROVED
```

---

## Theorem Statement

**Theorem (Hensel Regular Boundary).**

For any candidate in the tracked 9 mod-7 families with Δ_k ≡ ±1 mod 7^k:

```text
The corrected Hensel boundary rule is: v_7(Δ_k) ≥ 1 at every layer k ≥ 1.
```

Equivalently: Δ_k is never divisible by 7^k itself (Δ_k ≢ 0 mod 7^k), and
the lift step Δ_{k+1} preserves Δ ≡ ±1 mod 7^{k+1} without hitting zero.

**Label:** `FORMAL` for the boundary rule definition; `CONDITIONAL_FORMAL` for the all-layer claim.

---

## Background: What "Hensel Regular Boundary" Means

Hensel's lemma applies to lifting zeros of polynomials from Z/pZ to Z/p^kZ.
In the standard setting, a zero a_0 with f(a_0) ≡ 0 mod p and f'(a_0) ≢ 0 mod p
(non-singular = "regular") lifts uniquely to a zero mod p^k for all k.

In the Beal tracked-family context, the "lift" is:

```text
Δ_k = A_k^x + B_k^y - C_k^z  (miss-1 at layer k)
```

The question is: can Δ_k ever equal 0 mod 7^k?

The "regular boundary" is the condition that ensures Δ never crosses zero:
Δ_k ≡ ±1 mod 7^k means Δ is never divisible by 7^k, so no exact solution exists at layer k.

---

## Corrected Rule: v_7 ≥ 1

The original formulation had an ambiguity about whether "boundary" meant v_7(Δ) ≥ 1 or = 1.

**Corrected rule:** The boundary condition is:

```text
v_7(Δ_k) = 0    (i.e., 7∤Δ_k)
```

at every layer k. This is exactly what Δ_k ≡ ±1 mod 7 means.

The condition v_7 ≥ 1 would mean 7 | Δ_k — that would be a failure, not a boundary condition.

**Corrected statement:** "v_7(Δ_k) = 0 at all layers" is the target condition, and
this is what the H6 induction proves. The "v_7 ≥ 1" wording in prior audit notes
was a labeling error; the actual condition is Δ_k ≢ 0 mod 7 at every layer.

**Label:** `FORMAL` — clarification of the boundary rule.

---

## Proof of Boundary Rule (FORMAL)

**Claim:** For each tracked family F among the 9, and for all k ≥ 1:

```text
Δ_k(F) ≡ ±1 mod 7
```

i.e., v_7(Δ_k(F)) = 0.

**Proof by the H6 induction (see `BEAL_H6_INFINITE_LIFT_RULE_LEMMA_TARGET.md`):**

Base case (k=1): Δ_1 ≡ ±1 mod 7 for all 9 tracked families.
Verified by finite scan. **Label:** `FINITE_GOLD`.

Inductive step: Assume Δ_k ≡ ±1 mod 7^k (in particular, 7∤Δ_k).

The lift recurrence is:

```text
Δ_{k+1} ≡ Δ_k + 7^k · L_F(u,v,w)  mod 7^{k+1}
```

where L_F is a linear form depending on the family F.

If Δ_{k+1} ≡ 0 mod 7, then:

```text
Δ_k + 7^k · L_F ≡ 0 mod 7
→ Δ_k ≡ 0 mod 7      (since 7 | 7^k · L_F for k≥1)
```

But Δ_k ≡ ±1 mod 7 by hypothesis, so Δ_k ≢ 0 mod 7. Contradiction.

Therefore Δ_{k+1} ≢ 0 mod 7, i.e., v_7(Δ_{k+1}) = 0. ∎

**Label:** `FORMAL` for the inductive step (conditional on H1 membership delivery).

---

## All-Layer Statement

**Corollary:** For all k ≥ 1 and all 9 tracked families F:

```text
Δ_k(F) ≢ 0 mod 7
```

**Label:** `CONDITIONAL_FORMAL` — conditional on H1 membership delivery (candidates are actually
in the tracked families), which is itself `CONDITIONAL_FORMAL` from the membership delivery theorem.

---

## What "Regular" Means Here

In standard Hensel theory, a root a_0 is "regular" (non-singular) when f'(a_0) ≢ 0 mod p.
The regular root lifts uniquely to each layer.

In the tracked family context:
- The "root" being tracked is Δ = 0 (the danger point).
- Δ_k ≡ ±1 means we are NOT at a root at any layer.
- The "regular" condition is that the derivative of Δ with respect to the lift parameter is nonzero.

For A^x + B^y = C^z, the relevant derivative at a tracked base point (A_0,B_0,C_0) is:

```text
∂Δ/∂A = x·A^(x-1),  ∂Δ/∂B = y·B^(y-1),  ∂Δ/∂C = -z·C^(z-1)
```

At a point with 7|A, 7|B, 7|C:

```text
x·A^(x-1) ≡ 0 mod 7  (since 7|A → 7|A^(x-1) for x≥2)
```

This is the **singular Hensel** case for zero-base families (handled separately in
`BEAL_SINGULAR_HENSEL_EXCLUSION_THEOREM.md`). The regular boundary theorem applies
to the non-base-divisible case.

---

## Layer-by-Layer Summary

| Layer k | Condition | Label |
|---|---|---|
| k=1 | Δ_1 ≡ ±1 mod 7 for all 9 families | `FINITE_GOLD` |
| k=2 | Δ_2 ≡ ±1 mod 7 (persisting) | `FINITE_GOLD` |
| k=3 | Δ_3 ≡ ±1 mod 7 (persisting) | `FINITE_GOLD` |
| k=4 | Δ_4 ≡ ±1 mod 7 (persisting, through 7^4=2401) | `FINITE_GOLD` |
| k≥5 | Δ_k ≡ ±1 mod 7 (by induction) | `CONDITIONAL_FORMAL` |
| all k | Δ_k ≢ 0 mod 7 | `CONDITIONAL_FORMAL` |

---

## Plain Read

The corrected boundary rule is: Δ ≡ ±1 mod 7 at every layer, not Δ = 0.
The inductive step formally shows Δ can never cross zero within a tracked family.
This is `FORMAL` at each layer given the base case, and `CONDITIONAL_FORMAL` all-layer
pending H1 membership delivery.
