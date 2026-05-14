# Beal Branch Exhaustion Decision Tree Proof

## Status

```text
Proof status:   FORMAL_ARGUMENT_WRITTEN / H1_CONDITIONAL
Beal status:    NOT_PROVED (depends on H4, H5, H6)
Last updated:   May 13, 2026
```

---

## H1 Statement (formal target)

Every primitive no-family candidate $(A,B,C,x,y,z)$ with $\gcd(A,B,C)=1$
and $A^x + B^y = C^z$ belongs to exactly one branch in the ledger:

```
PURE_CUBE_BRANCH
SIXTH_BRIDGE_BRANCH
FOURTH_TARGET_BRANCH
MIXED_POWER_BRANCH
MOD7_LIFTED_FAMILY_BRANCH
```

or a **new branch**, which would mean H1 is incomplete.

---

## Branch Classification Decision Tree

Every candidate is classified by applying the following gates **in order**.
The first gate that fires assigns the branch. No candidate can satisfy two gates
simultaneously (the gates are mutually exclusive — proved below).

```
Given: A^x + B^y = C^z, gcd(A,B,C) = 1, x,y,z >= 3.

GATE 1 — Pure Cube:
  If x = y = z = 3:
    → PURE_CUBE_BRANCH
      Closed by Fermat exponent 3 (KNOWN_THEOREM).
      No primitive solution exists.

GATE 2 — Sixth Bridge:
  If any one exponent is divisible by 6 (say x = 6m):
    → rewrite A^x = (A^(2m))^3
    → reduces to PURE_CUBE_BRANCH with substitution
    → SIXTH_BRIDGE_BRANCH
      Closed by FORMAL_REDUCTION + KNOWN_THEOREM.

GATE 3 — Fourth Target:
  If any one exponent equals 4 and the others are odd >= 3:
    (or the candidate has a fourth-power difference factorisation C^4-B^4)
    → FOURTH_TARGET_BRANCH
      Current label: CONTAINED / NEEDS_FULL_CLOSURE (H4 open).

GATE 4 — Mixed Power:
  If exponents are distinct and none of the above reductions apply:
    → MIXED_POWER_BRANCH
      Current label: FINITE_EVIDENCE / NEEDS_GENERAL_RULE (H5 open).

GATE 5 — Mod-7 Lifted Family:
  If the candidate has cube-driven structure and appears in the
  9-family recurrence table (mod-7 residue pattern matches a tracked family):
    → MOD7_LIFTED_FAMILY_BRANCH
      Current label: FINITE_GOLD / CONDITIONAL_FORMAL (H6 filled).

GATE 6 — New Branch:
  If none of gates 1–5 apply:
    → NEW_BRANCH — H1 is incomplete.
      Finite audit result: NEW_BRANCH bucket = 0 in all data through base 12,500.
```

---

## Mutual Exclusivity of the Gates

**Gates 1 and 2** are exclusive: Gate 2 requires at least one exponent divisible
by 6; if all three are exactly 3, Gate 1 fires first (3 is not divisible by 6).

**Gate 1/2 vs Gate 3:** Gate 3 requires a fourth-power exponent (= 4). Neither
Gate 1 (all exponents 3) nor Gate 2 (sixth-power rewrite) can also have a factor
of 4 under the primitive condition, since a shared factor would violate $\gcd = 1$.

**Gates 1/2/3 vs Gate 4 (mixed):** If any exponent is covered by Gates 1–3, the
candidate is already assigned. Gate 4 applies only when the exponent set is
distinct and no rewrite applies.

**Gate 5 (mod-7 family):** A candidate in Gates 1–4 already has a branch. Gate 5
applies to the residual cube-driven population not fully closed by H2/H3 and not
yet assigned to H4/H5. The mod-7 family check is a secondary classifier layered
over the cube branch — it does not conflict with Gates 1–4 because those are
already closed or contained.

---

## Finite Evidence That Gate 6 Is Empty

| Base scanned | New-branch bucket | Other/unknown mechanisms | Result |
|---:|---:|---:|---|
| 2,000 | 0 | 0 | `FINITE_NO_NEW_BRANCH` |
| 3,000 | 0 | 0 | `FINITE_NO_NEW_BRANCH` |
| 4,000 | 0 | 0 | `FINITE_NO_NEW_BRANCH` |
| 5,000 | 0 | 0 | `FINITE_NO_NEW_BRANCH` |
| 7,500 | 0 | 0 | `FINITE_NO_NEW_BRANCH` |
| 10,000 | 0 | 0 | `FINITE_NO_NEW_BRANCH` |
| 12,500 | 0 | 0 | `FINITE_NO_NEW_BRANCH` |

Source: `BEAL_H1_NEW_BRANCH_BUCKET_AUDIT.md`, `BEAL_BRANCH_EXHAUSTION_AUDIT.md`.

---

## What Remains Open in H1

The decision tree is written and the finite audit shows no escape. The universal
gap is:

> **No exponent-signature classification theorem has been proved that guarantees
> every possible triple $(x,y,z)$ with $x,y,z \geq 3$ must enter Gates 1–5.**

Specifically needed:

1. **Exponent-signature exhaustion lemma** — for every unordered triple
   $\{x,y,z\}$ with $x,y,z \geq 3$, show it falls into at least one of the five
   structural categories above. The key cases are:
   - At least one exponent $\equiv 0 \pmod 3$: candidate enters Gate 1 or Gate 2.
   - At least one exponent $= 4$: Gate 3.
   - All exponents $\geq 5$ and distinct, no factor of 6: Gate 4 or Gate 5.
   - No exponent divisible by 3 or 6, none equals 4: this is the uncategorised
     residual — the main gap.

2. **No-new-family guarantee for mod-7 tracking** — even inside Gate 5, the 9
   currently tracked families may not exhaust all cube-driven mod-7 residue
   patterns at arbitrarily high bases.

---

## Dependency Table

| Gate | Branch | Closed by | Current label |
|---|---|---|---|
| 1 | Pure Cube | Fermat exp 3 | `KNOWN_THEOREM` |
| 2 | Sixth Bridge | `a^6=(a²)^3` + Fermat exp 3 | `FORMAL` + `KNOWN_THEOREM` |
| 3 | Fourth Target | Factor wall containment | `CONTAINED` / `NEEDS_H4` |
| 4 | Mixed Power | Local audit | `FINITE_EVIDENCE` / `NEEDS_H5` |
| 5 | Mod-7 Lifted Family | 9-family table + H6 induction | `CONDITIONAL_FORMAL` / `NEEDS_MEMBERSHIP` |
| 6 | New Branch | Finite audit shows 0 | `FINITE_GOLD` / `OPEN_UNIVERSAL` |

---

## What Would Close H1 Fully

H1 upgrades from `FORMAL_ARGUMENT_WRITTEN` to `FORMAL` when **all three** of the
following are proved:

1. The exponent-signature exhaustion lemma (no triple escapes Gates 1–5).
2. H4: fourth-target branch closes to impossibility (not just containment).
3. H5: mixed-power general rule (not just local audit).

H6 (mod-7 lift) is already conditional-formal and does not block H1 further once
membership is confirmed by H1 itself.

---

## What Would Break H1

- Any candidate sample classified as `NEW_BRANCH` in a higher-base scan.
- A new exponent mechanism outside the five structural categories.
- A mixed-power family that grows without entering Gate 5.

---

## Full Picture

| Field | Answer |
|---|---|
| WHO | every primitive no-family candidate |
| WHAT | must enter one of five branches via the decision tree |
| WHEN | before applying H2–H6 closure rules |
| WHERE | H1 routing layer |
| WHY | an unrouted candidate escapes every blocker |
| HOW | five-gate decision tree by exponent structure |
| CURRENT STATUS | `FORMAL_ARGUMENT_WRITTEN` / Gate 6 finite-empty |
| WHAT BLOCKS FULL CLOSE | exponent-signature exhaustion lemma; H4 and H5 open |
| NEXT ACTION | write exponent-signature exhaustion lemma for $x,y,z \geq 5$, no factor of 3 or 6 |

---

## Plain Read

The decision tree is now written. Every candidate route is documented. Finite
data through base 12,500 puts zero candidates in the new-branch bucket. The one
remaining universal gap is proving that no exponent triple can escape all five
gates — specifically the case where all exponents are $\geq 5$, distinct, and
divisible by neither 3 nor 6. That is the next proof obligation for H1.
