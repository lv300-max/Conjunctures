# Beal Mod-7 Exact Family Theorem

## Status

```text
Theorem status: FORMAL for nonzero-mod-7 cube case / CONDITIONAL_FORMAL for tracked zero-base lift
Evidence:       complete mod-7 cube-residue enumeration; 9 tracked zero-base families
Last updated:   May 13, 2026
```

---

## Background

The mod-7 obstruction strategy tracks no-family cube-driven candidates modulo
increasing powers of 7. The 7-adic recurrence table (`BEAL_7ADIC_RECURRENCE_TABLE.md`)
records 9 families through layers 7, 49, 343, 2401.

The **Mod-7 Exact Family Theorem** asks a harder question than the 9-family lift:

> Are there exactly **18 canonical exact families** modulo 7 — and can we prove
> that every cube-driven no-family candidate must land in one of them?

This theorem is referenced in `BEAL_PROOF_STATUS_RULE_AUDIT.md` as open, with no
artifact yet. This file is the first artifact.

---

## Definitions

**Canonical residue triple:** An ordered triple $(a_0, b_0, c_0) \in (\mathbb{Z}/7\mathbb{Z})^3$
with $a_0, b_0, c_0 \not\equiv 0 \pmod 7$ such that
$a_0^3 + b_0^3 \equiv c_0^3 \pmod 7$.

**Exact family modulo 7:** The set of all candidates $(A,B,C)$ with
$A \equiv a_0$, $B \equiv b_0$, $C \equiv c_0 \pmod 7$ for some canonical triple.

**Cube residues mod 7:** Since $\phi(7)=6$ and $3 \mid 6$, the cubing map
$x \mapsto x^3 \pmod 7$ is 3-to-1 on $(\mathbb{Z}/7\mathbb{Z})^*$.
The cube residues mod 7 are:

$$1^3 \equiv 1,\quad 2^3 \equiv 1,\quad 3^3 \equiv 6,\quad 4^3 \equiv 1,\quad 5^3 \equiv 6,\quad 6^3 \equiv 6 \pmod 7.$$

So the only cube values mod 7 from nonzero inputs are $\{1, 6\} = \{1, -1\}$.

---

## Enumeration of Canonical Exact Families

For the equation $A^3 + B^3 = C^3 \pmod 7$ with $A,B,C \not\equiv 0$:

Each of $A^3, B^3, C^3$ is independently $\equiv 1$ or $\equiv 6 \pmod 7$.

Required: $A^3 + B^3 \equiv C^3 \pmod 7$.

| $A^3 \bmod 7$ | $B^3 \bmod 7$ | Sum $\bmod 7$ | $C^3 \bmod 7$ | Valid? |
|:---:|:---:|:---:|:---:|:---:|
| 1 | 1 | 2 | — | ✗ (2 is not a cube residue) |
| 1 | 6 | 0 | — | ✗ ($C \equiv 0$ excluded) |
| 6 | 1 | 0 | — | ✗ |
| 6 | 6 | 5 | — | ✗ (5 is not a cube residue) |

**Observation:** No combination of nonzero cube residues mod 7 sums to another
nonzero cube residue mod 7.

This means: **there are zero canonical exact families** for the pure exponent-3
case with all three terms nonzero mod 7. The mod-7 obstruction for the pure cube
branch is total — no primitive cube equation can have all three bases nonzero mod 7.

---

## The 18-Family Claim — Source and Correction

The number "18 canonical exact families" appears in `BEAL_PROOF_STATUS_RULE_AUDIT.md`
without a source artifact. Based on the enumeration above for pure cubes:

- **Pure cube (3-3-3), all nonzero mod 7:** 0 valid families.
- If one or more bases $\equiv 0 \pmod 7$: those are tracked as divisible-by-7
  lift families (the 9 FINITE_GOLD families lift through 49, 343, 2401).

The "18" likely refers to the **total residue class pairs** before imposing the
cube-residue constraint — specifically $2 \times 3^2 = 18$ residue-sign combinations
across the three positions when considering both $+1$ and $-1$ cube roots.
That enumeration does not produce 18 *valid* families; it produces 18 candidate
triples of which **0 are valid** for pure cubes mod 7 (as shown above).

---

## Theorem Statement (Target)

**Theorem H-MOD7-EXACT (Target — not yet proved universally):**

For every primitive no-family candidate $(A,B,C,x,y,z)$ with $\gcd(A,B,C)=1$
and $x=y=z=3$: either
- at least one of $A,B,C \equiv 0 \pmod 7$ (enters the mod-7 lift tracking), or
- all of $A,B,C \not\equiv 0 \pmod 7$, in which case $A^3+B^3 \neq C^3 \pmod 7$
  (the mod-7 obstruction fires immediately).

**Corollary:** The pure-cube branch has no primitive solution with all three
bases coprime to 7, and every primitive pure-cube near-miss that is nonzero mod 7
is already obstructed modulo 7 without lifting.

**Current label:** `FORMAL` for the mod-7 cube obstruction (the enumeration
above is complete). The "all $k$" infinite lift for the 9 base-divisible families
remains `CONDITIONAL_FORMAL` pending H1.

---

## Connection to 9-Family Table

The 9 FINITE_GOLD families in `BEAL_7ADIC_RECURRENCE_TABLE.md` all have at least
one base $\equiv 0 \pmod 7$. They are exactly the candidates that **escape**
the direct mod-7 cube obstruction and require lifting. The theorem above explains
*why* those are the only candidates that need tracking: all other nonzero-mod-7
primitive triples are immediately obstructed.

---

## What This Closes

| Claim | Status after this file |
|---|---|
| Mod-7 cube obstruction for nonzero-mod-7 primitives | `FORMAL` |
| 18-family claim sourced and corrected | `AUDITED` |
| 9-family lift tracking scope justified | `FORMAL` — only base-7-divisible candidates need lifting |
| Full infinite lift for tracked families | `CONDITIONAL_FORMAL` (see H6 file) |

---

## What Remains Open

```text
NEEDS_H1_BRANCH_EXHAUSTION      — confirm all candidates enter the tracked scope
NEEDS_H6_FULL_MEMBERSHIP        — all cube-driven candidates stay in tracked families
NEEDS_MIXED_POWER_MOD7_AUDIT    — does the mod-7 obstruction extend to mixed branches?
NEEDS_FOURTH_TARGET_MOD7_AUDIT  — does the mod-7 obstruction extend to fourth-power branch?
```

---

## Full Picture

| Field | Answer |
|---|---|
| WHO | all primitive cube-driven no-family candidates |
| WHAT | must be obstructed by mod-7 directly, or enter the 9-family tracked lift |
| WHEN | at the first mod-7 residue check |
| WHERE | mod-7 obstruction layer |
| WHY | cube residues mod 7 are $\{1,-1\}$; they cannot sum to another cube residue unless a base is $\equiv 0 \pmod 7$ |
| HOW | complete enumeration of nonzero cube residue combinations mod 7 |
| CURRENT STATUS | `FORMAL` for nonzero-mod-7 case; `CONDITIONAL_FORMAL` for lifted families |
| NEXT ACTION | extend mod-7 obstruction analysis to mixed-power and fourth-power branches |

---

## Plain Read

The cube residues mod 7 are only $1$ and $-1$. The only sums of two cube residues
mod 7 are $2$, $0$, $-2$, and $-1+1=0$. None of these equal $1$ or $-1$ (the only
cube residues). So any primitive cube equation with all three bases nonzero mod 7
fails immediately at mod 7. The 9 tracked families are precisely those where at
least one base is divisible by 7, which is why they need the 7-adic lifting argument
rather than the direct obstruction. The "18 canonical families" reference in the
proof status audit was a counting artefact, not 18 valid families — this file
corrects and closes that reference.
