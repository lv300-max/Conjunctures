# Beal H5 Mixed Power General Rule Lemma Target

## Status

ISOLATED / OPEN_GENERAL_RULE_TARGET

This is a general-rule target, not a completed theorem.

## Lemma Statement

Mixed-power candidates cannot form an exact primitive no-family equality branch.

Formal target:

```text
If gcd(A,B,C)=1 and the exponent signature is mixed,
then the candidate either reduces to a known branch,
hits a formal obstruction,
or cannot produce exact equality.
```

## Label

ISOLATED_TO_GENERAL_RULE_TARGET

## Full Picture

| Field | Answer |
|---|---|
| WHO | mixed-power candidates |
| WHAT | must not become a growing exact no-family branch |
| WHEN | after branch assignment |
| WHERE | mixed-power branch |
| WHY | current data shows isolation but not universal impossibility |
| HOW | classify mixed signatures, reduce what reduces, and obstruct primitive closure |
| WHAT BLOCKS IT | no all-range mixed-power theorem yet |
| WHAT WOULD BREAK IT | a growing exact mixed-power family |
| WHETHER THE BLOCKER CHANGES | target is to upgrade ISOLATED to GENERAL_RULE |
| CURRENT STATUS | ISOLATED / OPEN |
| NEXT ACTION | create exact mixed exponent-signature table and prove each row |

## Lemma Proof Skeleton

1. List all mixed exponent signatures that survive branch exhaustion.
2. For each signature, test reduction to pure cube, sixth bridge, or fourth target.
3. For irreducible signatures, derive primitive gcd constraints.
4. Add modular or factor obstruction where available.
5. Prove no signature forms a primitive exact equality family.
6. If any signature remains unresolved, H5 remains open.

## Filled Mixed Signature Table

| Case | Signature | Side | Sample | First Base | Last Base | Local Rows Checked | New Miss-1 Rows | New Templates | Danger | Current Status |
|---:|---|---|---|---:|---:|---:|---:|---:|---:|---|
| 1 | 7-3-3 | LEFT_HIGH | `2^7 + 6^3 - 7^3 = 1` | 2000 | 5000 | 16,192,320 | 46 | 14 | 0 | ISOLATED |
| 2 | 4-3-3 | RIGHT_HIGH | `21^3 - 7^4 - 19^3 = 1` | 2000 | 5000 | 16,774,912 | 46 | 14 | 0 | ISOLATED |
| 3 | 3-4-3 | RIGHT_HIGH | `37^3 - 3^3 - 15^4 = 1` | 2000 | 5000 | 16,513,792 | 46 | 14 | 0 | ISOLATED |

## H5 Filled Evidence

| Metric | Value | Label |
|---|---:|---|
| mixed cases audited | 3 | FINITE_EVIDENCE |
| local rows checked | 49,481,024 | FINITE_EVIDENCE |
| new miss-1 rows | 138 | FINITE_EVIDENCE |
| new templates | 42 | FINITE_EVIDENCE |
| danger | 0 | FINITE_EVIDENCE |
| verdict | MIXED_POWER_ISOLATED | FINITE_EVIDENCE |

## H5 Current Conclusion

```text
The three known mixed-power signatures remain isolated in the local audit.
No mixed-power danger appeared.
The all-range mixed-power general rule is not proven yet.
```

## What Would Close H5

```text
Every mixed-power candidate reduces, factors into contradiction, or is proven unable to close exactly.
```

## What Remains Open

```text
NEEDS_MIXED_SIGNATURE_TABLE
NEEDS_MIXED_REDUCTION_RULE
NEEDS_PRIMITIVE_GCD_OBSTRUCTION
NEEDS_MIXED_POWER_GENERAL_RULE
NEEDS_LOCAL_TO_GLOBAL_MIXED_RULE
```

## Plain Read

H5 is the weakest branch. The data says isolated; the theorem target needs a rule.
