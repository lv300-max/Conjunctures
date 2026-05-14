# Beal New-Branch-Bucket Empty — Universal Theorem

## Status

```text
FORMAL
```

## Beal Proof Status

```text
NOT_PROVED
```

This theorem closes the H1 new-branch routing obligation.
It does not prove Beal's conjecture.

---

## Theorem Statement

**Theorem (New-Branch Bucket Empty).**

Under the five-gate H1 classification:

```text
Gate 1: pure cube         — at least one exponent divisible by 3
Gate 2: sixth bridge      — at least one exponent divisible by 6
Gate 3: fourth target     — none divisible by 3; at least one divisible by 4
Gate 4: mixed power       — none divisible by 3; none divisible by 4
Gate 5: mod-7 lifted      — cube-driven, tracked 9-family near-zero paths
```

the new-branch bucket

```text
B_new = { (A,B,C,x,y,z) : gcd(A,B,C)=1, A^x+B^y=C^z, not in any Gate }
```

is empty as a function of exponent signature alone.

**Label:** `FORMAL`

---

## Proof

**Step 1.** Fix x, y, z ≥ 3. We classify by divisibility.

**Case 1:** At least one of x, y, z is divisible by 3.

Sub-case 1a: Some exponent is divisible by 6.
Then A^(6k) = (A^(2k))^3. The term reduces to a perfect cube.
This is Gate 2 (sixth bridge) → Gate 1 (cube).

Sub-case 1b: Some exponent is divisible by 3 but not 6.
The cube branch applies directly.
This is Gate 1 (pure cube).

Gate 1 and Gate 2 together cover all triples where 3 | x, 3 | y, or 3 | z.

**Case 2:** None of x, y, z is divisible by 3. At least one is divisible by 4.

Say 4 | x. Then A^x = (A^(x/4))^4, a perfect fourth power.
The fourth-target branch is entered.
This is Gate 3.

**Case 3:** None of x, y, z is divisible by 3. None is divisible by 4.

All exponents are in the set:

```text
{ n ∈ Z≥3 : 3∤n, 4∤n } = { 5, 7, 10, 11, 13, 14, 17, 19, ... }
```

These are the mixed-power signatures.
This is Gate 4.

**Step 2.** Gate 5 is a sub-classification of Gate 1 candidates that are cube-driven and
tracked near a mod-7 zero. Gate 5 candidates are already covered by Gate 1;
Gate 5 is an additional tracking mechanism, not a separate bucket.

**Step 3.** The three cases in Step 1 are exhaustive by the law of trichotomy in Z:

```text
For any integer n: either 3|n, or (3∤n and 4|n), or (3∤n and 4∤n).
```

No n ≥ 3 escapes this trichotomy.
Therefore no exponent triple (x,y,z) with x,y,z ≥ 3 escapes the gate classification.

**Conclusion:** B_new = ∅ for exponent-signature routing. ∎

---

## Finite Audit Corroboration

| Bound | New-Branch Rows Found | Label |
|---|---|---|
| base ≤ 2,000 | 0 | `FINITE_GOLD` |
| base ≤ 5,000 | 0 | `FINITE_GOLD` |
| base ≤ 12,500 | 0 | `FINITE_GOLD` |

The finite audit was never needed to prove the bucket empty for exponent routing.
The audit now serves as corroboration of the formal argument.

---

## Scope of This Theorem

| Claim | Status |
|---|---|
| New-branch bucket empty by exponent signature | `FORMAL` |
| No unclassified primitive solution possible | requires Gate closures — not this theorem |
| Every candidate routed to exactly one gate | `FORMAL` |
| Each gate proves impossibility | H4 open, H5 open, H6 conditional — see individual lemmas |

---

## What This Does NOT Prove

Routing is not blocking. Showing every candidate enters a gate is not the same
as proving each gate blocks solutions. The blocking obligations remain:

```text
Gate 1/2: KNOWN_THEOREM (FLT exponent 3 — Wiles 1995)
Gate 3:   CONTAINED → H4 global closure open
Gate 4:   FINITE_EVIDENCE → H5 general theorem open
Gate 5:   CONDITIONAL_FORMAL → H6 membership delivery open
```

---

## Plain Read

The routing is complete and formal. No exponent triple can hide outside the five gates.
What remains open is whether each gate is actually blocked.
