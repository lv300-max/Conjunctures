# Beal Formal Argument Ledger

| Step | Claim | Input | Output | Label | Gap |
|---:|---|---|---|---|---|
| 1 | define danger | `A,B,C,x,y,z` | danger iff gcd=1 and equality | `FORMAL` | none |
| 2 | roof evidence | scans | danger 0 through base 12,500 | `FINITE_GOLD` | finite only |
| 3 | pure cube closure | `a^3+b^3=c^3` | impossible | `KNOWN_THEOREM` | none for cube branch |
| 4 | sixth bridge reduction | `a^6=(a^2)^3` | cube wall | `FORMAL_REDUCTION` | none if clean |
| 5 | fourth factor wall | `C^4-B^4` factorisation | contained | `CONTAINED` | needs H4 full closure |
| 6 | mixed isolation | local audit | isolated | `FINITE_EVIDENCE` | needs H5 general rule |
| 7 | mod-7 cube obstruction (nonzero mod 7) | cube residue enumeration | zero valid nonzero families | `FORMAL` | none — closed by enumeration |
| 8 | mod-7 9-family lift (base divisible by 7) | 9-family recurrence table | miss-0 blocked through 2401 | `FINITE_GOLD` | tracked families only |
| 9 | H6 induction step | divisibility argument | `±1 mod 7^k → not 0 mod 7^(k+1)` | `CONDITIONAL_FORMAL` | needs H1 membership delivery |
| 10 | H1 decision tree | 5-gate classification | all candidates routed or new-branch bucket empty | `FORMAL_ARGUMENT_WRITTEN` | exponent-signature exhaustion lemma open |
| 11 | topology | graph | next gate found | `STRUCTURAL` | formalization needed |
| 12 | H1 exponent-signature exhaustion | divisibility case split on x,y,z ≥ 3 | all triples routed to CUBE/FOURTH/MIXED | `FORMAL` | none — routing is complete |
| 13 | new-branch bucket empty | gate exhaustion proof | B_new = ∅ by trichotomy | `FORMAL` | none — bucket is empty by construction |
| 14 | H4 global fourth-target closure | factor wall + F45 chamber analysis | F45 closed; general signatures need descent | `PARTIAL_FORMAL` / `NEEDS_DESCENT` | per-signature chamber descent open |
| 15 | H5 mixed-power finiteness | Darmon–Granville 1995 | finitely many primitive solutions per signature | `LITERATURE_CLOSED` | zero-solution proof per signature open |
| 16 | H6 membership delivery | 9-family completeness + H6 induction | all Gate-5 candidates on tracked paths | `CONDITIONAL_FORMAL` | 9-family all-layer completeness |
| 17 | mod-7 extension to fourth/mixed | fourth-power and mixed residue enumeration | no mod-7 obstruction for these branches | `NEGATIVE_RESULT` | n/a — correct answer |
| 18 | base-divisibility bound | valuation balance algebraic argument | v_7 finite; 3168-check corroboration | `FORMAL` + `FINITE_GOLD` | none |
| 19 | Hensel regular boundary all-layer | H6 induction step + gradient argument | Δ ≡ ±1 mod 7 all layers for tracked families | `CONDITIONAL_FORMAL` | H1 delivery upgrade |
| 20 | singular Hensel exclusion {3,4,5,6} | gradient mod 7 + tracked-family analysis | non-singular FORMAL; singular CONDITIONAL_FORMAL | `FORMAL` + `CONDITIONAL_FORMAL` | H1 delivery |
| 21 | global descent certification wall | all rooms inventoried; gates assigned | 20 rooms mapped; 8 closed; 5 need descent | `STRUCTURED_OPEN` | rooms 4,6,7,14,17,18 need active work |
