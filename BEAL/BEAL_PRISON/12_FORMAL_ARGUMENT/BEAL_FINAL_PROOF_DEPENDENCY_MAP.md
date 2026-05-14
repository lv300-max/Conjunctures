# Beal Final Proof Dependency Map

## Status

TARGET_NOT_PROVEN

The lemma targets are filled with available finite tables. The remaining work is converting those tables into all-range arguments.

## Dependency Table

| Dependency | Current Evidence | Needed To Close | Blocks |
|---|---|---|---|
| H1 Branch Exhaustion | all known branches assigned | prove no candidate escapes branch ledger | theorem routing |
| H2 Pure Cube Closure | Fermat exponent 3 | already closed for cube branch | pure cube branch |
| H3 Sixth Bridge Closure | `a^6=(a^2)^3` | already reduced to cube | sixth bridge branch |
| H4 Fourth Factor Closure | 2 factor-contained rows | all-range factor impossibility | fourth target branch |
| H5 Mixed Power Rule | 3 isolated signatures, danger 0 | local-to-global mixed rule | mixed branch |
| H6 Infinite Lift Rule | 9 families through `7,49,343,2401` | induction for every `7^k` | mod-7 lifted branch |

## Current Blocking Chain

```text
Beal target
  depends on H1 branch exhaustion
  depends on H4 fourth closure
  depends on H5 mixed general rule
  depends on H6 infinite lift rule
```

## What Is Filled

| Filled Object | Status |
|---|---|
| H1 branch assignment table | FILLED_FINITE |
| H6 9-family recurrence table | FILLED_FINITE_GOLD |
| H4 factor table | FILLED_FINITE |
| H5 mixed signature table | FILLED_FINITE |

## What Is Still Open

| Open Gap | Why It Matters |
|---|---|
| no-new-branch theorem | H1 must cover every candidate, not just known branches |
| infinite lift induction | H6 must continue forever, not only through 2401 |
| fourth factor closure | H4 must become impossibility, not containment |
| mixed local-to-global rule | H5 must become a theorem, not a local audit |

## Full Picture

| Field | Answer |
|---|---|
| WHO | H1, H4, H5, H6 |
| WHAT | final proof dependencies |
| WHEN | after lemma tables were filled |
| WHERE | formal argument layer |
| WHY | these decide whether the proof bridge becomes theorem-grade |
| HOW | finite tables must become all-range lemmas |
| WHAT BLOCKS IT | missing universal classification, infinite lift, fourth closure, mixed rule |
| WHAT WOULD BREAK IT | unassigned branch, failed lift, exact fourth closure, growing mixed family |
| WHETHER THE BLOCKER CHANGES | yes; blockers must move from finite evidence to formal proof |
| CURRENT STATUS | TARGET_NOT_PROVEN |
| NEXT ACTION | prove H6 induction step first, then H1 no-new-branch routing |

## Plain Read

The lemmas are filled with the available tables. The proof still hinges on all-range upgrades: H6 infinite lift, H1 branch exhaustion, H4 fourth closure, and H5 mixed general rule.
