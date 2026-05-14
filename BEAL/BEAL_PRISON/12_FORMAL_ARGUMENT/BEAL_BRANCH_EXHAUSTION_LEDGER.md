# Beal Branch Exhaustion Ledger

## Status

**WORK LEDGER - NOT COMPLETE PROOF**

This ledger records whether each known branch is closed, reduced, contained, isolated, lifted, or still open.

## Ledger

| Branch | Current Assignment | Who Handles It | What Blocks It | Status | Gap | Next Action |
|---|---|---|---|---|---|---|
| Pure cube | closed | Fermat exponent 3 | `a^3 + b^3 = c^3` has no positive integer solution | CLOSED | none for cube branch | cite theorem cleanly |
| Sixth bridge | reduced | cube wall | `a^6 = (a^2)^3` reduces to cube | CLOSED | none if reduction is clean | keep reduction explicit |
| Fourth target | contained | factor wall | `C^4-B^4=(C-B)(C+B)(C^2+B^2)` | CONTAINED | needs full closure | build factor closure target |
| Mixed power | isolated | local audit | no growing branch found | ISOLATED | needs general rule | build mixed-power general rule |
| Mod-7 lifted families | lifted | 7-adic path | `Delta=+/-1 mod 7^k` cannot be `0 mod 7^(k+1)` on same path | FINITE_GOLD + FORMAL CORE | needs branch exhaustion | prove membership stability |
| New/unassigned branch | unassigned | none yet | none yet | OPEN | branch exhaustion | detect or rule out |

## Exhaustion Target

The target is:

```text
Every no-family branch is assigned to one row of this ledger.
```

If that is achieved, the project has a proof-facing path:

```text
closed / reduced / contained / isolated / lifted
```

with no loose branch left unclassified.

## Current Gap

The open gap is:

```text
NEW_OR_UNASSIGNED_BRANCH
```

Plain:

```text
prove no relevant no-family branch escapes the ledger.
```
