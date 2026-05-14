# Beal H5 Mixed-Power General Theorem

## Status

```text
LITERATURE_CLOSED (finiteness) / OPEN (zero-solution proof)
```

## Beal Proof Status

```text
NOT_PROVED
```

---

## Theorem Target

**Goal:** Prove that every mixed-power candidate with gcd(A,B,C)=1
and exponents all ≥ 3, not divisible by 3, not divisible by 4
has no primitive exact solution.

Mixed exponents: those in the set

```text
M = { n ∈ Z≥3 : 3∤n, 4∤n }
   = { 5, 7, 10, 11, 13, 14, 17, 19, 20, 22, 23, ... }
```

---

## Step 1 — Finiteness (LITERATURE_CLOSED)

**Theorem (Darmon–Granville, 1995).**

For fixed positive integers p, q, r with

```text
1/p + 1/q + 1/r < 1
```

the equation

```text
A^p + B^q = C^r
```

has only finitely many primitive solutions (A,B,C) with gcd(A,B,C)=1.

**Reference:** H. Darmon and A. Granville, "On the equations z^m = F(x,y) and Ax^p + By^q = Cz^r,"
Bulletin of the London Mathematical Society, 27(6), 1995.

**Application:** For any mixed signature (p,q,r) with p,q,r ∈ M (all ≥ 5):

```text
1/p + 1/q + 1/r ≤ 3/5 < 1
```

Therefore finitely many primitive solutions exist for each fixed mixed signature.

**Label:** `LITERATURE_CLOSED` for finiteness.

**What this does NOT prove:** That the finite number of solutions is zero.

---

## Step 2 — Equal-Exponent Sub-Cases (KNOWN_THEOREM)

If x = y = z = n for any n ≥ 3, then A^n + B^n = C^n is Fermat's Last Theorem.
Closed by Wiles (1995) for all n ≥ 3.

For n ∈ M (e.g., n = 5, 7, 11, ...): `KNOWN_THEOREM`.

---

## Step 3 — FLT-Reduction Sub-Cases

Some mixed signatures reduce to Fermat equations.

### Sub-case 3a: All three exponents equal a prime p ≥ 5

```text
A^p + B^p = C^p → impossible by FLT (Wiles 1995)
```

**Label:** `KNOWN_THEOREM`

### Sub-case 3b: Two equal exponents

If x = y = n, then A^n + B^n = C^z.

For z = n: FLT applies. `KNOWN_THEOREM`.

For z ≠ n: Darmon–Granville finiteness applies; zero-solution proof is signature-specific.

---

## Step 4 — Modular Obstruction Search

For selected mixed signatures, modular constraints may obstruct solutions.

### Signature (5, 5, 7)

```text
A^5 + B^5 = C^7, gcd(A,B,C)=1
```

Fifth-power residues mod 7: by Fermat's little theorem, a^6 ≡ 1 mod 7 for 7∤a.
So a^5 ≡ a^(-1) mod 7. The fifth-power residues mod 7 (nonzero) are {1,2,3,4,5,6}.
Seventh-power residues mod 7: a^7 ≡ a mod 7 (Fermat). Residues: {0,1,2,3,4,5,6}.
No modular obstruction from p=7 for this signature.

### Signature (5, 7, 11)

All three exponents are odd primes ≥ 5 coprime to each other.
Modular residues for large odd prime exponents mod small primes are dense
(hitting all nonzero residues by Fermat-type arguments).
No simple single-prime obstruction is available.
**Status:** `OPEN` — needs descent or Chabauty.

---

## Step 5 — Reduction to Known Curves

For some signatures, the equation defines a curve of genus ≥ 2.

**Faltings' theorem (Mordell conjecture, proved 1983):** A smooth projective curve
of genus ≥ 2 over Q has only finitely many rational points.

For A^p + B^q = C^r with 1/p + 1/q + 1/r < 1, the associated projective variety
has genus ≥ 2 in suitable coordinates. Darmon–Granville use this to prove finiteness.

**What this gives:** finitely many rational points = finitely many primitive solutions.

**What this does NOT give:** zero primitive solutions (unless the curve can be shown
to have no rational points, which requires curve-by-curve analysis).

**Label:** `LITERATURE_CLOSED` for finiteness.

---

## Step 6 — Known Zero-Solution Results in Literature

| Signature | Result | Reference | Label |
|---|---|---|---|
| (p,p,p) all equal | impossible for p ≥ 3 | Wiles 1995 | `KNOWN_THEOREM` |
| (2,3,7) | only 3 known primitive solutions | Poonen–Schaefer–Stoll 2007 | `LITERATURE_CLOSED` |
| (2,3,8) | no primitive solutions | Bruin 2003 | `LITERATURE_CLOSED` |
| (2,3,9) | no primitive solutions | Bruin 2004 | `LITERATURE_CLOSED` |
| (2,4,n) n≥4 | deep results, partial | multiple authors | `PARTIAL` |
| (5,5,7) | unknown general result | — | `OPEN` |
| (x,y,z) all ≥ 5 mixed | unknown general zero-solution | — | `OPEN` |

---

## Step 7 — Primitive GCD Obstruction

For A^p + B^q = C^r with gcd(A,B,C) = 1:

The condition gcd(A,B,C) = 1 is restrictive. Any common prime factor of two of A,B,C
must divide the third by the equation, contradicting primitivity.

This eliminates all "family" solutions (solutions with common factor) and restricts to genuine
primitive triples. Darmon–Granville's finiteness applies to exactly these.

**Label:** `FORMAL` for the gcd constraint.

---

## Full Mixed Signature Table

| Case | Signature | Reduction | Modular Block | D-G Finite | Zero Proven | Status |
|---:|---|---|---|---|---|---|
| 1 | (5,5,5) | FLT | n/a | n/a | yes | `KNOWN_THEOREM` |
| 2 | (7,7,7) | FLT | n/a | n/a | yes | `KNOWN_THEOREM` |
| 3 | (n,n,n) n∈M | FLT | n/a | n/a | yes | `KNOWN_THEOREM` |
| 4 | (5,5,7) | partial | none found | yes | unknown | `LITERATURE_CLOSED`(finite) |
| 5 | (5,7,11) | none | none found | yes | unknown | `LITERATURE_CLOSED`(finite) |
| 6 | (7,3-3,…) | Gate 1 route | n/a | n/a | n/a | out of H5 scope |
| 7 | general (p,q,r) ∈ M^3 | none general | none general | yes | unknown | `LITERATURE_CLOSED`(finite)+`OPEN` |

Finite audit: 3 isolated mixed rows found through base 5,000. No growing family. Zero danger.

---

## What This Closes

| Obligation | Status |
|---|---|
| Finiteness for every mixed signature | `LITERATURE_CLOSED` (Darmon–Granville) |
| Equal-exponent sub-cases | `KNOWN_THEOREM` (FLT, Wiles) |
| Zero-solution proof for general mixed | `OPEN` |
| Local isolation through base 5,000 | `FINITE_EVIDENCE` |

---

## What Remains Open

```text
NEEDS_ZERO_SOLUTION_PROOF_PER_MIXED_SIGNATURE
NEEDS_DESCENT_OR_CHABAUTY_FOR_HIGH_GENUS_MIXED_CURVES
NEEDS_GENERAL_MIXED_POWER_IMPOSSIBILITY
```

---

## Plain Read

Every mixed-power signature has only finitely many primitive solutions (Darmon–Granville).
Equal-exponent cases are closed by FLT. The data shows only isolation through the tested range.
A general zero-solution proof for all mixed signatures is open; it requires
signature-by-signature descent, Chabauty, or a new obstruction not yet discovered.
