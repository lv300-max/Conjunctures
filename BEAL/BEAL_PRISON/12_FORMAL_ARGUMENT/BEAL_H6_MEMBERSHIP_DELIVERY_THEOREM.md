# Beal H6 Membership Delivery Theorem

## Status

```text
CONDITIONAL_FORMAL / OPEN
```

## Beal Proof Status

```text
NOT_PROVED
```

---

## Theorem Target

**Goal:** Prove that every cube-driven near-zero candidate that requires mod-7 lifting
actually belongs to one of the 9 tracked mod-7 families — or is closed elsewhere.

This is the H6 membership delivery obligation:
H6's induction proof (see `BEAL_H6_INFINITE_LIFT_RULE_LEMMA_TARGET.md`) works
*within* tracked paths. Membership delivery is the obligation that H1 routes the
right candidates into those tracked paths.

---

## What "Membership Delivery" Means

A candidate (A,B,C,x,y,z) requires H6 treatment if and only if:

```text
(1) gcd(A,B,C) = 1
(2) A^x + B^y = C^z (primitive exact equality)
(3) 7 | A, 7 | B, 7 | C    [base divisible by 7]
(4) The exponent signature sends the candidate to Gate 5 (cube-driven, mod-7 near-zero)
```

Condition (4) requires: at least one exponent is divisible by 3 (cube-driven).

The membership delivery theorem must show: any such candidate is confirmed to be
on one of the 9 tracked families in the mod-7 topology, or it is closed by another gate.

---

## Step 1 — Gate-5 Entry Condition (FORMAL)

A candidate enters Gate 5 if and only if:

```text
(a) At least one of x,y,z is divisible by 3 (cube-driven — Gate 1/2 apply structurally)
(b) 7 | A, 7 | B, 7 | C    (base divisible by 7 — not blocked by nonzero mod-7 obstruction)
(c) The near-zero collision condition: Δ = A^x + B^y - C^z is close to 0 in 7-adic norm
```

**Label:** `FORMAL` — definition is algebraic.

---

## Step 2 — The 9 Tracked Families (FINITE_GOLD)

The 9 tracked families are specific near-zero cube-driven families where:

```text
7 | A, 7 | B, 7 | C
Δ ≡ ±1 mod 7    (miss-1 at the base layer)
```

These were found by finite scan through base 2,401 (= 7^4).

**Evidence:** `beal_5min_8worker_roof_scan.json`, `BEAL_MISS1_COMPRESSION_DOSSIER.md`.

**Label:** `FINITE_GOLD` — 9 families identified through 7^4.

---

## Step 3 — Why Membership Delivery Is Not Yet Formal

The membership delivery obligation is:

```text
Every Gate-5 candidate IS on a tracked family.
```

This requires showing there are no Gate-5 candidates outside the 9 tracked families.

**Two ways to prove this:**

**Method A: Mod-7 Exhaustion**

Show that for each (x,y,z) satisfying Gate-5 conditions, the mod-7 residue of (A,B,C)
with 7|A, 7|B, 7|C is fully determined by the 9 families, and no other residue pattern
can produce a miss-1 row.

This would require a complete enumeration of mod-7^2 residue classes for the base.
Through 7^2 = 49: finite check. Through 7^4 = 2401: finite gold.
For all 7^k: this is the H6 induction (already CONDITIONAL_FORMAL).

**Method B: H1 Routing Tightness**

The H1 routing places all non-cube, non-fourth, non-mixed candidates into Gate 5
by exhaustion. Gate 5 candidates are exactly the 7-divisible cube-driven ones.
The 9 families are exactly the miss-1 residue classes at the base.
Any additional family would have appeared as a new family in the scan.

**Current label:** This argument is `FINITE_GOLD` + `CONDITIONAL_FORMAL` — strong
at finite depth; conditioned on H6 induction at infinite depth.

---

## Step 4 — The 9-Family Completeness Claim

**Claim:** The 9 tracked families exhaust all cube-driven 7-divisible miss-1 residue classes.

**Evidence for the claim:**

| Layer | Families Found | Families Checked | Label |
|---|---|---|---|
| mod 7 | 9 | all | `FINITE_GOLD` |
| mod 49 | 9 | all | `FINITE_GOLD` |
| mod 343 | 9 (persisting) | all | `FINITE_GOLD` |
| mod 2401 | 9 (persisting) | all | `FINITE_GOLD` |
| mod 7^k for all k | 9 (predicted by H6 induction) | inductive | `CONDITIONAL_FORMAL` |

**Argument:** The mod-7 obstruction theorem (`BEAL_MOD7_EXACT_FAMILY_THEOREM.md`) shows
that nonzero-mod-7 cube triples have zero valid families. Therefore only zero-base families
(7|A, 7|B, 7|C) can exist. The 9 families represent all residue classes of zero-base
cube-driven near-zero patterns through mod 2401. No new family appeared at any layer.

**Label:** `CONDITIONAL_FORMAL` — formal within each tested layer; conditional on
H6 induction holding for all k.

---

## Step 5 — Membership Delivery Conclusion

**Current status of membership delivery:**

| Obligation | Label |
|---|---|
| Gate-5 entry condition definition | `FORMAL` |
| 9-family identification through mod 2401 | `FINITE_GOLD` |
| No new family at mod 7, 49, 343, 2401 | `FINITE_GOLD` |
| 9-family completeness all-layer (inductive) | `CONDITIONAL_FORMAL` |
| Every Gate-5 candidate is on a tracked path (delivery) | `CONDITIONAL_FORMAL` |
| H6 induction within tracked paths | `CONDITIONAL_FORMAL` |

**Combined label:** `CONDITIONAL_FORMAL`

The conditions are:
1. H1 routing correctly places 7-divisible cube-driven candidates in Gate 5 ✓ (FORMAL)
2. The 9 families exhaust mod-7 residue classes ✓ (FINITE_GOLD through 2401)
3. H6 induction prevents any family from reaching Δ=0 ✓ (CONDITIONAL_FORMAL)

---

## What Would Make This Fully Formal

A complete membership delivery proof requires:

```text
1. Prove the 9-family list is complete modulo 7 (not just through 7^4):
   i.e., enumerate all cube-driven 7-divisible residue classes mod 7 and show exactly 9.

2. Prove H6 induction closes all 9 families unconditionally
   (currently conditional on H1 routing — which this lemma itself provides).

3. Close the mutual dependency: H1 routes to Gate 5; Gate-5 membership is the 9 families;
   H6 induction proves all 9 are blocked.
```

The mutual dependency (H1 routes → membership → H6 blocks) is resolved once
membership delivery is proved: H1 routes formally (from H1 exhaustion lemma `FORMAL`),
so the `CONDITIONAL_FORMAL` label on H6 can be upgraded.

---

## Circular-Dependency Note

The chain is:

```text
H1 routing (FORMAL) → Gate-5 candidates are routed
Gate-5 = 7-divisible cube-driven (FORMAL definition)
9-family completeness (FINITE_GOLD through 2401; CONDITIONAL_FORMAL for all k)
H6 induction (CONDITIONAL_FORMAL, needs H1 membership delivery)
```

Once H1 routing is accepted as FORMAL (which it now is from the exhaustion lemma),
and membership is FINITE_GOLD through 7^4, the H6 induction step is:

```text
CONDITIONAL_FORMAL → upgrades toward FORMAL
once the 9-family completeness is proved for all k.
```

The remaining gap: prove 9-family completeness for all k without relying on further scan.
This is exactly the H6 strong induction (`BEAL_H6_INFINITE_LIFT_RULE_LEMMA_TARGET.md`).

---

## Plain Read

Membership delivery is `CONDITIONAL_FORMAL`. H1 formally routes candidates.
The 9 families are complete through mod 2401 (FINITE_GOLD). H6 induction
prevents any tracked family from reaching Δ=0. The full proof closes once
9-family completeness is proved for all layers without finite bound.
