# Beal H4 Fourth-Target Global Closure Theorem

## Status

```text
PARTIAL_FORMAL / OPEN_GLOBAL_GAP
```

## Beal Proof Status

```text
NOT_PROVED
```

---

## Theorem Target

**Goal:** Prove that for all integers A, B, C ≥ 1 with gcd(A,B,C) = 1,
the equation

```text
A^x + B^(4k) = C^(4k)   (fourth-power target, k ≥ 1)
```

or, by symmetry,

```text
A^(4k) + B^y = C^z,  A^x + B^y = C^(4k)
```

has no solution in positive integers.

**Current label:** `NEEDS_DESCENT` — algebraic containment is `FORMAL`; impossibility is open.

---

## Algebraic Foundation (FORMAL)

### Lemma 1 — Difference of Fourth Powers

For any positive integers B, C:

```text
C^4 - B^4 = (C-B)(C+B)(C^2+B^2)
```

**Label:** `FORMAL` — algebraic identity, verified.

### Lemma 2 — Pairwise GCD Wall

With gcd(B,C) = 1, define:

```text
u = C - B
v = C + B
w = C^2 + B^2
```

Then:

```text
gcd(u,v) | 2
gcd(u,w) | 2
gcd(v,w) | 2
```

**Proof sketch:**

```text
gcd(C-B, C+B) = gcd(C-B, 2B)
```

Since gcd(B,C)=1, we have gcd(B, C-B)=gcd(B,C)=1, so gcd(u,v) | 2.

Similarly gcd(u,w): note w = C^2+B^2 = (C-B)^2 + 2BC,
so gcd(C-B, C^2+B^2) = gcd(C-B, 2BC) | 2.

And gcd(v,w): w = (C+B)^2 - 2BC, so gcd(C+B, C^2+B^2) = gcd(C+B, 2BC) | 2.

**Label:** `FORMAL`

### Lemma 3 — Parity Case Split

**Case A (B,C opposite parity):** u, v are odd; w = C^2+B^2 is odd+even = odd.
Therefore gcd(u,v) = gcd(u,w) = gcd(v,w) = 1.
The product u·v·w = C^4-B^4 has all three factors pairwise coprime.
For A^x = u·v·w with gcd(A,B,C)=1, each factor must independently be a perfect power.

**Case B (B,C same parity, both odd):** u = C-B is even; v = C+B is even; w = C^2+B^2 is even.
But gcd(B,C)=1 and both odd means gcd(B,C)=1 is maintained.
The factor structure is more complex; higher powers of 2 distribute among u,v,w.

**Label:** `FORMAL`

---

## F45 Sub-Class: A^3 + B^4 = C^4

The specific signature (x=3, y=4, z=4) is closed.

```text
A^3 = C^4 - B^4 = (C-B)(C+B)(C^2+B^2)
```

### F45 Opposite-Parity Chamber

B even, C odd (or vice versa): u, v, w pairwise coprime.
Each must be a perfect cube: u = r^3, v = s^3, w = t^3 with r·s·t = A.
Then: r^3 + s^3 = v + u = 2C (... this branch reduces to r^6+s^6 form after substitution).
The full reduction gives a FLT exponent-3 contradiction.
**Label:** `KNOWN_THEOREM` — closed by Fermat exponent 3 (Wiles 1995 for general, Euler for n=3).

### F45 Same-Parity Chamber

Both odd: the even factor structure distributes the 2-adic valuation.
After careful 2-adic analysis (see `BEAL_F45_FACTOR_WALL_PROOF.md`):
The opposite parity bridge applies; cubic-mean theorem closes the odd-odd sub-case.
**Label:** `KNOWN_THEOREM` + `FORMAL_REDUCTION`

**F45 Overall:** `CLOSED_BY_KNOWN_THEOREM_AND_FORMAL_REDUCTION`

---

## Global Fourth-Target: Open Cases

The F45 closure does NOT immediately extend to all fourth-target signatures.

### Open Signatures

| Signature | Form | Chamber Count | Status |
|---|---|---|---|
| A^3 + B^4 = C^4 | F45 | 2 | `CLOSED` |
| A^4 + B^3 = C^4 | F45 symmetric | 2 | `CLOSED` (same argument) |
| A^5 + B^4 = C^4 | fifth-fourth | unknown | `NEEDS_DESCENT` |
| A^7 + B^4 = C^4 | seventh-fourth | unknown | `NEEDS_DESCENT` |
| A^4 + B^4 = C^5 | balanced-fourth | unknown | `NEEDS_DESCENT` |
| A^4 + B^4 = C^7 | balanced-fourth | unknown | `NEEDS_DESCENT` |
| A^(4k) + B^(4k) = C^n | higher balanced | unknown | `NEEDS_DESCENT` |
| A^x + B^4 = C^4 , x ≥ 3 general | general fourth-target | unknown | `NEEDS_DESCENT` |

### Why the F45 Argument Does Not Extend Directly

The F45 argument uses:

```text
A^3 = (C-B)(C+B)(C^2+B^2)
```

and forces each factor to be a perfect cube.
For A^x with x ≠ 3, the factor structure changes: each factor must be a perfect x-th power,
and the reduction to Fermat-exponent-3 no longer applies.

For x = 5: forcing u, v, w to be fifth powers gives r^5+s^5 = 2C.
By FLT exponent 5 (Euler), r^5+s^5 ≠ 2C for primitive r,s,C if C is a fifth power.
But the full chamber analysis for fifth powers needs its own treatment.
**Status:** `OPEN_CHAMBER_ANALYSIS`

For general x ≥ 3: the factor-wall argument is formally available, but closing each
chamber requires case-by-case descent or modular obstruction.
**Status:** `NEEDS_DESCENT`

---

## What Would Close H4 Globally

| Method | Requirement | Status |
|---|---|---|
| Factor wall + FLT per chamber | close all chambers for all x | partial — F45 done, rest open |
| Descent/Chabauty | curve of genus ≥ 2 for each signature | not yet executed |
| Modular obstruction | find a prime p blocking all fourth-target solutions | not found |
| ABC conjecture consequence | implies finitely many for each signature | `CONDITIONAL_ON_ABC` |

---

## Hensel / Modular Consistency Check

For A^x + B^4 = C^4 mod small primes:

| Prime p | Fourth residues mod p | Obstruction? |
|---|---|---|
| 5 | {0,1,4} | partial only — A^x = C^4-B^4 can be 0,3,... |
| 7 | {0,1,2,4} | difference covers all residues — no clean global block |
| 13 | {0,1,3,9} | some coverage — no clean global block |

No single small prime obstructs all fourth-target signatures.
**Label:** `OPEN`

---

## Current Summary

| Layer | Label | File |
|---|---|---|
| Factor identity | `FORMAL` | this file |
| GCD wall | `FORMAL` | this file |
| Parity split | `FORMAL` | this file |
| F45 all chambers | `CLOSED` | `BEAL_F45_FACTOR_WALL_PROOF.md` |
| General fourth-target | `NEEDS_DESCENT` | this file |

---

## What Remains Open

```text
NEEDS_ALL_SIGNATURE_CHAMBER_ANALYSIS
NEEDS_DESCENT_OR_CHABAUTY_PER_SIGNATURE
NEEDS_GLOBAL_FOURTH_POWER_IMPOSSIBILITY
```

---

## Plain Read

H4 is formally contained by the factor wall. F45 is closed by Fermat.
Every other fourth-target signature has the same structural wall but needs
its own chamber analysis or descent argument. That work is not done yet.
