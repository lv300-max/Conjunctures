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
