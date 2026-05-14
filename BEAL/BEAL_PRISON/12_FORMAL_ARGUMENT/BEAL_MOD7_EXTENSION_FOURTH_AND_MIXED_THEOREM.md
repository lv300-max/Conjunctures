# Beal Mod-7 Obstruction Extension — Cubes, Fourth Powers, and Mixed

## Status

```text
FORMAL (cubes) / NEGATIVE_RESULT (fourth and mixed: no global obstruction from mod 7)
```

## Beal Proof Status

```text
NOT_PROVED
```

---

## Purpose

This file extends the mod-7 cube obstruction theorem to fourth-power and mixed-power branches.
The honest result: mod-7 gives a clean obstruction for pure cubes.
It does NOT give a clean global obstruction for fourth-target or general mixed branches.

---

## Section 1 — Cube Residues Mod 7 (FORMAL)

For integers a with gcd(a,7) = 1:

```text
a^3 mod 7:
1^3 = 1
2^3 = 8 ≡ 1
3^3 = 27 ≡ 6
4^3 = 64 ≡ 1
5^3 = 125 ≡ 6
6^3 = 216 ≡ 6
```

Cube residues mod 7 (nonzero): **{1, 6}** = {1, -1}.

### Pure Cube Obstruction

For A^3 + B^3 = C^3 with gcd(A,B,C)=1 and 7∤A, 7∤B, 7∤C:

```text
A^3 mod 7 ∈ {1, 6}
B^3 mod 7 ∈ {1, 6}
C^3 mod 7 ∈ {1, 6}
```

Possible sums A^3 + B^3 mod 7:

```text
1 + 1 = 2   — not in {1,6}
1 + 6 = 0   — divisible by 7 → contradicts 7∤C
6 + 6 = 5   — not in {1,6}
```

Therefore: no nonzero-mod-7 primitive cube triple exists.
**Label:** `FORMAL`

---

## Section 2 — Fourth-Power Residues Mod 7

For integers a with gcd(a,7) = 1:

```text
a^4 mod 7:
1^4 = 1
2^4 = 16 ≡ 2
3^4 = 81 ≡ 4
4^4 = 256 ≡ 4
5^4 = 625 ≡ 2
6^4 = 1296 ≡ 1
```

Fourth-power residues mod 7 (nonzero): **{1, 2, 4}**.

### Fourth-Power Obstruction Analysis

For A^x + B^4 = C^4 with gcd(A,B,C)=1, x ≥ 3, 7∤A, 7∤B, 7∤C:

```text
C^4 - B^4 mod 7 ∈ differences of {1,2,4}:
{1-1, 1-2, 1-4, 2-1, 2-2, 2-4, 4-1, 4-2, 4-4}
= {0, 6, 4, 1, 0, 5, 3, 2, 0}  (mod 7)
= {0, 1, 2, 3, 4, 5, 6}
```

All residues 0–6 are achievable as C^4 - B^4 mod 7.

For A^x mod 7: depends on x.
- x = 3: A^3 mod 7 ∈ {1,6} — so we need C^4-B^4 ≡ 1 or 6 mod 7 — POSSIBLE.
- x = 5: A^5 ≡ A^(-1) mod 7 — residues {1,2,3,4,5,6} — all nonzero possible.
- x = 7: A^7 ≡ A mod 7 — residues {1,2,3,4,5,6} — no obstruction.

**Conclusion:** Mod-7 does NOT provide a global obstruction for fourth-target branches.
Nonzero-mod-7 fourth-target candidates exist at the modular level.
**Label:** `NEGATIVE_RESULT` — no mod-7 fourth-target obstruction.

---

## Section 3 — Fifth-Power Residues Mod 7

For integers a with gcd(a,7) = 1:

By Fermat's little theorem: a^6 ≡ 1 mod 7, so a^5 ≡ a^(-1) mod 7.

```text
1^5 ≡ 1
2^5 ≡ 4 (since 2·4=8≡1 mod 7, so 2^(-1)=4)
3^5 ≡ 5 (since 3·5=15≡1 mod 7)
4^5 ≡ 2
5^5 ≡ 3
6^5 ≡ 6
```

Fifth-power residues mod 7 (nonzero): **{1, 2, 3, 4, 5, 6}** — all nonzero residues.

**Conclusion:** No mod-7 obstruction for fifth-power terms. Every nonzero residue is a
fifth power mod 7.

---

## Section 4 — General Mixed Residues Mod 7

For any exponent n ≥ 3 with gcd(n, 6) = 1 (i.e., n coprime to 6: n ∈ {5,7,11,13,...}):

By Fermat: a^6 ≡ 1 mod 7, so a^n ≡ a^(n mod 6) mod 7.

For gcd(n,6) = 1: n mod 6 ∈ {1,5} (since gcd(1,6)=1, gcd(5,6)=1).
Thus a^n ≡ a^1 or a^5 mod 7.

- n ≡ 1 mod 6: a^n ≡ a mod 7 — all nonzero residues.
- n ≡ 5 mod 6: a^n ≡ a^5 ≡ a^(-1) mod 7 — all nonzero residues.

**Conclusion:** For all exponents n coprime to 6, the n-th power residues mod 7 hit all
nonzero residues {1,2,3,4,5,6}. No mod-7 obstruction exists for any mixed-power
combination of such exponents.
**Label:** `FORMAL` (residue computation) + `NEGATIVE_RESULT` (no obstruction).

---

## Section 5 — Summary Table

| Branch | Exponents | Mod-7 Residues | Obstruction? | Label |
|---|---|---|---|---|
| Pure cube | all 3 ≡ 0 mod 3 | {1,6} | YES — no nonzero triple sums | `FORMAL` |
| Sixth bridge | all div by 6 → cubes | same as cube | YES (reduces to cube) | `FORMAL` |
| Fourth target | some div by 4, none by 3 | A^4 ∈ {1,2,4}; differences cover all | NO | `NEGATIVE_RESULT` |
| FLT sub-cases (equal exp ≥5) | all equal n≥5 | all residues | NO | `NEGATIVE_RESULT` |
| General mixed (gcd(n,6)=1) | all n coprime to 6 | all residues | NO | `NEGATIVE_RESULT` |
| Mixed with n≡2 mod 6 (e.g., n=8) | n^2 structure | {0,1,2,4} (squares×squares) | partial only | `OPEN` |

---

## Section 6 — Why Cubes Are Special

The cube obstruction works because the cube residues mod 7 are only {1,-1} (two values).
With only two values, the sum of two such residues (1+1=2, 1+(-1)=0, (-1)+(-1)=-2)
never hits {1,-1} at the nonzero level.

For fourth powers (residues {1,2,4}) and higher powers (often all nonzero residues),
there is room for the sum to hit a valid residue.

This is NOT a flaw in the proof structure — it correctly identifies cube branches as having
the strongest modular obstruction. Fourth-target and mixed branches need different tools.

---

## Section 7 — What This Tells Us About the Proof Strategy

| Branch | Mod-7 | What to Use Instead |
|---|---|---|
| Pure cube | strong obstruction | `FORMAL` by mod-7 |
| Sixth bridge | reduces to cube | `FORMAL` |
| Fourth target | no mod-7 help | factor wall (H4) + descent |
| Mixed power | no mod-7 help | D-G finiteness + FLT sub-cases + descent |

Mod-7 is a precision tool for the cube branch. Other branches need other tools.

---

## Plain Read

Mod-7 cube obstruction is `FORMAL` and tight. Extending it to fourth-target or mixed-power
is a `NEGATIVE_RESULT`: those branches are not blocked by mod 7. The residues for
fourth powers and higher-coprime-to-6 exponents cover all nonzero values mod 7,
leaving no arithmetic gap. Fourth-target and mixed-power branches require descent,
factor-wall, or literature closure — not mod-7 arithmetic.
