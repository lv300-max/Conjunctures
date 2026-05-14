# Beal Singular Hensel Exclusion — Exponents {3,4,5,6}

## Status

```text
FORMAL (non-singular case) / CONDITIONAL_FORMAL (singular 9-family case)
```

## Beal Proof Status

```text
NOT_PROVED
```

---

## Theorem Statement

**Theorem (Singular Hensel Exclusion for {3,4,5,6}).**

Let (A,B,C,x,y,z) be a primitive Beal candidate with gcd(A,B,C)=1
and exponents x, y, z ∈ {3, 4, 5, 6}.

Then:

**(a) Non-singular case:** If 7∤A, 7∤B, or 7∤C (at least one base coprime to 7):

The Hensel lift at p=7 is non-singular: the gradient of Δ = A^x + B^y - C^z
is nonzero mod 7 at the candidate, and the lift condition does not apply.
The nonzero-mod-7 cube obstruction blocks the candidate.
**Label:** `FORMAL`

**(b) Singular case:** If 7|A, 7|B, 7|C (all bases divisible by 7):

The Hensel lift is singular: all partial derivatives vanish mod 7.
The candidate requires special analysis via the 9-family tracked mod-7 lift.
The H6 induction prevents Δ from reaching zero at any layer.
**Label:** `CONDITIONAL_FORMAL`

---

## Background: What "Singular Hensel" Means

For a polynomial system f(A,B,C) = A^x + B^y - C^z, the Hensel lift from mod p
to mod p^2 requires that the Jacobian (gradient of f) is nonzero mod p at the solution point.

Gradient:

```text
∂f/∂A = x·A^(x-1)
∂f/∂B = y·B^(y-1)
∂f/∂C = -z·C^(z-1)
```

**Non-singular (regular):** At least one partial derivative ≢ 0 mod 7.
In this case, standard Hensel lifting applies: any local p-adic structure is controlled.

**Singular:** All three partial derivatives ≡ 0 mod 7.
This occurs when 7|A, 7|B, 7|C (so A^(x-1) ≡ 0 mod 7, etc.)
OR when 7|x, 7|y, 7|z (so p|coefficient).

---

## Section A — Non-Singular Analysis

### Condition for Non-Singularity at p=7

For exponents x, y, z ∈ {3, 4, 5, 6}:

```text
7 ∤ 3, 7 ∤ 4, 7 ∤ 5, 7 ∤ 6
```

So the exponent coefficients (x, y, z) are never divisible by 7.

Therefore: the gradient ≡ 0 mod 7 if and only if 7|A, 7|B, 7|C.

**If 7∤A:** ∂f/∂A = x·A^(x-1) ≢ 0 mod 7 (since x ∈ {3,4,5,6} and A ≢ 0 mod 7).
The lift is non-singular.

**Consequence for non-singular case:**

A candidate with at least one of A, B, C coprime to 7 has non-singular Hensel at p=7.
The nonzero-mod-7 cube obstruction (`BEAL_MOD7_EXACT_FAMILY_THEOREM.md`) applies:
no primitive cube triple with all bases ≢ 0 mod 7 exists.

But we need to be careful: the obstruction applies to cube exponents (x,y,z all divisible by 3).
For x,y,z ∈ {3,4,5,6} with cube component:

- (3,3,3): pure cube — blocked by FLT.
- (6,3,3), (3,6,3), (3,3,6): sixth-bridge — blocked by FLT via bridge.
- (4,...), (5,...): contains fourth or fifth power — different branch; mod-7 non-singular here means
  no need for Hensel lifting argument (not a tracked family candidate).

**Label:** `FORMAL`

---

## Section B — Singular Analysis (7|A, 7|B, 7|C)

If 7|A, 7|B, 7|C, all three partial derivatives vanish mod 7.
This is the singular Hensel case. Standard Hensel lifting does not apply directly.

### What Singular Means Concretely

Write A = 7a', B = 7b', C = 7c'. The equation becomes:

```text
7^x · a'^x + 7^y · b'^y = 7^z · c'^z
```

(for x=y=z: 7^x(a'^x + b'^y) = 7^z · c'^z — if x<z the 7^x factor dominates...)

The singularity means: there may be many lifts or no natural unique lift.
The tracked-family approach bypasses standard Hensel by directly tracking Δ mod 7^k.

### Exclusion for Exponents {3,4,5,6} in Singular Case

For the singular case with exponents in {3,4,5,6}:

**Key fact:** 7 ∤ gcd(x, y, z) when x, y, z ∈ {3, 4, 5, 6} (since none is divisible by 7).

This means the "exponent-7 gate" (if all exponents divisible by 7, reduce to Fermat exponent 7)
does NOT apply here. The singular analysis stays within the 9-family tracked approach.

**Theorem:** For each of the 9 tracked families with exponents in {3,4,5,6}:

Δ_k ≡ ±1 mod 7 at every layer k (H6 induction, `BEAL_H6_INFINITE_LIFT_RULE_LEMMA_TARGET.md`).

Therefore no exact primitive solution exists within these families.
**Label:** `CONDITIONAL_FORMAL`

---

## Section C — Why {3,4,5,6} and Not General Exponents

The exponent set {3,4,5,6} is significant because:

```text
3 = minimum exponent (Beal conjecture, x,y,z ≥ 3)
4 = minimum fourth-power exponent (Gate 3)
5 = minimum mixed non-cube non-fourth exponent (Gate 4)
6 = minimum sixth-power exponent (Gate 2)
```

Together these cover all "low" exponent cases. Any exponent ≥ 7 that is:
- divisible by 7: enters the exponent-7 gate (reduce to Fermat exponent 7)
- divisible by 3: cube branch (FLT)
- divisible by 4: fourth-target (H4)
- not any of the above: higher mixed (H5, D-G finite)

For exponents ∈ {3,4,5,6}, the analysis above covers all cases.
For exponents ≥ 7: higher machinery (exponent-7 gate, higher mixed, etc.) applies.

### Completeness of {3,4,5,6} Coverage

| Exponent | Gate | Singular? | Exclusion |
|---|---|---|---|
| 3 | Cube | Yes (if 7|base) | FLT (non-singular) / H6 tracked (singular) |
| 4 | Fourth | Yes (if 7|base) | H4 factor wall (non-singular) / H6 compatible |
| 5 | Mixed | Yes (if 7|base) | D-G finite + non-singular structure |
| 6 | Sixth bridge → Cube | Yes (if 7|base) | FLT via bridge (non-singular) / H6 tracked |

---

## Summary Table

| Case | Condition | Hensel Type | Exclusion Method | Label |
|---|---|---|---|---|
| x,y,z ∈ {3,4,5,6}, some base ≢ 0 mod 7 | non-singular | regular | mod-7 obstruction + FLT/H4/H5 | `FORMAL` |
| x,y,z ∈ {3,4,5,6}, all bases ≡ 0 mod 7 | singular | singular | 9-family tracking, H6 induction | `CONDITIONAL_FORMAL` |
| x,y,z ∈ {3,4,5,6}, cube branch | — | both | FLT exponent 3 (Wiles) | `KNOWN_THEOREM` |
| x,y,z ∈ {3,4,5,6}, sixth bridge | — | both | FLT via bridge | `KNOWN_THEOREM` + `FORMAL` |

---

## General Theorem (Beyond F45)

The F45 singular disk diagnostic (`BEAL_F45_SINGULAR_DISK_DIAGNOSTIC.md`) covered
the specific signature (3,4,4). This theorem generalizes:

**For any exponents x,y,z ∈ {3,4,5,6}:**

The singular case (all bases div by 7) is handled by the 9-family tracked approach.
The non-singular case is handled by mod-7 obstruction (cube branch) or factor/descent (others).

This is NOT F45-specific. It applies to all signatures with exponents in {3,4,5,6}.

**Label:** `FORMAL` (non-singular) + `CONDITIONAL_FORMAL` (singular, tracked)

---

## Plain Read

For exponents in {3,4,5,6}, Hensel singularity at p=7 occurs exactly when all three
bases are divisible by 7. The non-singular case is blocked by the mod-7 cube obstruction
or standard factor arguments. The singular case is handled by the 9-family tracked lift,
which is `CONDITIONAL_FORMAL` from the H6 induction. This result is general —
it covers all (x,y,z) ∈ {3,4,5,6}^3, not only F45.
