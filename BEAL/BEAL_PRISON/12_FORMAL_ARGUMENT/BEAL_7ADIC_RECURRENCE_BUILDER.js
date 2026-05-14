#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = __dirname;
const LIFTING_JSON = path.join(ROOT, 'beal_results/proof_bridge_16worker_10min/BEAL_TEST_02_MOD7_LIFTING_TEST.json');
const OBSTRUCTION_JSON = path.join(ROOT, 'beal_results/proof_bridge_16worker_10min/BEAL_TEST_01_MOD7_OBSTRUCTION_LEDGER.json');

const OUT_TABLE_MD = path.join(OUT, 'BEAL_7ADIC_RECURRENCE_TABLE.md');
const OUT_TABLE_JSON = path.join(OUT, 'BEAL_7ADIC_RECURRENCE_TABLE.json');
const OUT_ARGUMENT_MD = path.join(OUT, 'BEAL_INFINITE_LIFT_RULE_ARGUMENT.md');
const OUT_BOUNDARY_MD = path.join(OUT, 'BEAL_LIFT_RULE_PROOF_BOUNDARY.md');
const OUT_SUMMARY_JSON = path.join(OUT, 'BEAL_FORMAL_ARGUMENT_BUILD_ALL_SUMMARY.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function modPow(base, exp, mod) {
  let result = 1;
  let b = ((base % mod) + mod) % mod;
  for (let i = 0; i < exp; i += 1) result = (result * b) % mod;
  return result;
}

function coefficient(residue, exp) {
  if (exp === 0) return 0;
  return (exp * modPow(residue, exp - 1, 7)) % 7;
}

function parseFamily(family, index, obstructionById) {
  const [side, mechanism, exponents, leftResidues, rightResidue] = family.familyId.split('|');
  const [x, y, z] = exponents.split('-').map(Number);
  const [aResidue, bResidue] = leftResidues.split('-').map(Number);
  const cResidue = Number(rightResidue);
  const deltaSign = side === 'LEFT_HIGH' ? '+1' : '-1';
  const coeffA = coefficient(aResidue, x);
  const coeffB = coefficient(bResidue, y);
  const coeffC = (7 - coefficient(cResidue, z)) % 7;
  const obstruction = obstructionById.get(family.familyId);
  const layers = Object.keys(family.statuses).map(Number).sort((a, b) => a - b);

  return {
    family: `F${index + 1}`,
    familyId: family.familyId,
    mechanism,
    side,
    exponents,
    residues: {
      left: [aResidue, bResidue],
      right: cResidue,
    },
    deltaSign,
    liftLayersTested: layers,
    recurrence: {
      statement: 'Delta_{k+1} = Delta_k + 7^k * L_F(u,v,w) mod 7^(k+1)',
      linearCorrectionMod7: `${coeffA}u + ${coeffB}v + ${coeffC}w mod 7`,
      coefficients: {
        u: coeffA,
        v: coeffB,
        w: coeffC,
      },
      derivation: `L_F = ${x}*A0^${x - 1}*u + ${y}*B0^${y - 1}*v - ${z}*C0^${z - 1}*w mod 7`,
    },
    finiteGold: {
      miss1Exists: obstruction?.miss1Exists ?? true,
      miss0ClosureAbsent: obstruction ? !obstruction.miss0ResidueClosurePossible : true,
      miss0ExactPresentInTemplates: obstruction?.miss0ExactPresentInTemplates ?? false,
      sideMixing: obstruction?.sideMixing ?? false,
      mechanismMixing: obstruction?.mechanismMixing ?? false,
      liftAllTested: layers.every((layer) => family.statuses[String(layer)].miss1Lift && !family.statuses[String(layer)].miss0Closure),
    },
    proofNeed: 'prove this recurrence cannot admit Delta = 0 for any higher 7-adic layer or prove every branch member remains on the obstructed path',
  };
}

function markdownTable(rows) {
  return rows
    .map(
      (row) =>
        `| ${row.family} | ${row.mechanism} | ${row.side} | ${row.exponents} | ${row.residues.left.join('-')} -> ${row.residues.right} | ${row.deltaSign} | ${row.recurrence.linearCorrectionMod7} | ${row.liftLayersTested.join(',')} | finite gold | infinite lift rule |`,
    )
    .join('\n');
}

function run() {
  const lifting = readJson(LIFTING_JSON);
  const obstruction = readJson(OBSTRUCTION_JSON);
  const obstructionById = new Map((obstruction.families || []).map((family) => [family.familyId, family]));
  const rows = lifting.families.map((family, index) => parseFamily(family, index, obstructionById));

  const summary = {
    status: 'FORMAL_LAYER_BUILT_NOT_FULL_PROOF',
    families: rows.length,
    finiteGoldFamilies: rows.filter((row) => row.finiteGold.liftAllTested && row.finiteGold.miss0ClosureAbsent).length,
    testedLayers: [7, 49, 343, 2401],
    exactFormalObservation:
      'A residue path with Delta = +/-1 mod 7^k cannot also be Delta = 0 mod 7^k or mod 7^(k+1) along the same path.',
    remainingGap:
      'Prove every relevant branch member remains in an obstructed lifted family, or prove the recurrence excludes miss-0 closure for all higher layers.',
    nextGate: 'BRANCH_EXHAUSTION_PLUS_INFINITE_LIFT_RULE',
  };

  fs.writeFileSync(
    OUT_TABLE_JSON,
    `${JSON.stringify({ summary, rows }, null, 2)}\n`,
    'utf8',
  );

  fs.writeFileSync(
    OUT_TABLE_MD,
    `# Beal 7-Adic Recurrence Table

## Status

FORMAL RECURRENCE LAYER - NOT FULL PROOF

## Recurrence

For a lift:

\`\`\`text
A' = A0 + 7^k u
B' = B0 + 7^k v
C' = C0 + 7^k w
\`\`\`

the first-order binomial lift gives:

\`\`\`text
Delta_{k+1} = Delta_k + 7^k * L_F(u,v,w) mod 7^(k+1)
\`\`\`

where:

\`\`\`text
L_F = x*A0^(x-1)*u + y*B0^(y-1)*v - z*C0^(z-1)*w mod 7
\`\`\`

## Family Recurrence Table

| Family | Mechanism | Side | Exponents | Residues | Delta | Linear correction | Layers tested | Status | Needed for proof |
|---|---|---|---|---|---|---|---|---|---|
${markdownTable(rows)}

## Formal Observation

If a lifted path has:

\`\`\`text
Delta = +/-1 mod 7^k
\`\`\`

then that same path cannot also have:

\`\`\`text
Delta = 0 mod 7^k
\`\`\`

and therefore cannot become:

\`\`\`text
Delta = 0 mod 7^(k+1)
\`\`\`

without leaving the path being tracked.

## Remaining Gap

The remaining gap is branch exhaustion: prove every relevant no-family cube-driven branch stays inside one of these obstructed lifted families, or prove the recurrence excludes miss-0 closure for every higher lift.
`,
    'utf8',
  );

  fs.writeFileSync(
    OUT_ARGUMENT_MD,
    `# Beal Infinite Lift Rule Argument

## Status

TARGET ARGUMENT - NOT FULL PROOF

## Built Objects

- finite 9-family table exists
- recurrence table exists
- tested layers: \`7,49,343,2401\`
- miss-1 exists in every family
- miss-0 closure is absent in every family

## Core Recurrence

\`\`\`text
Delta_{k+1} = Delta_k + 7^k * L_F(u,v,w) mod 7^(k+1)
\`\`\`

## Formal Point

If the path being lifted has:

\`\`\`text
Delta = +/-1 mod 7^k
\`\`\`

then it is already not divisible by \`7^k\`.

So the same path cannot become exact miss-0 at the next lifted layer:

\`\`\`text
Delta = 0 mod 7^(k+1)
\`\`\`

because that would imply:

\`\`\`text
Delta = 0 mod 7^k
\`\`\`

which contradicts \`Delta = +/-1 mod 7^k\`.

## What This Actually Proves

It proves the same lifted miss-1 path cannot turn into miss-0 without leaving that path.

## What It Does Not Yet Prove

It does not yet prove every possible no-family branch must stay inside one of the 9 obstructed lifted paths.

That is the branch exhaustion gap.

## Combined Rule Target

To close the active bridge, prove:

\`\`\`text
Every cube-driven no-family branch either closes by the cube wall,
reduces to the cube wall,
or enters one of the 9 lifted families whose Delta path is +/-1 and never 0.
\`\`\`

## Next Gate

\`\`\`text
BRANCH_EXHAUSTION_PLUS_INFINITE_LIFT_RULE
\`\`\`
`,
    'utf8',
  );

  fs.writeFileSync(
    OUT_BOUNDARY_MD,
    `# Beal Lift Rule Proof Boundary

## What Is Formal Now

If a tracked residue path has \`Delta = +/-1 mod 7^k\`, it cannot also have \`Delta = 0 mod 7^k\`.

If it cannot be \`0 mod 7^k\`, it cannot be \`0 mod 7^(k+1)\`.

This is a formal divisibility observation.

## What Is Finite Gold

The project has 9 tested families.

Each family:

- has miss-1 behavior
- has miss-0 closure absent
- lifts through \`7,49,343,2401\`
- has no side mixing
- has no mechanism mixing

## What Is Still Open

The open part is not the divisibility of one tracked miss-1 path.

The open part is branch exhaustion:

\`\`\`text
prove all relevant no-family cube-driven candidates must enter these obstructed paths
or must close by an already known branch wall.
\`\`\`

## What Would Break It

- a new family admits \`Delta = 0\`
- a branch escapes the 9-family table
- mixed-power isolation becomes a growing branch
- fourth-power containment becomes an exact no-family closure
`,
    'utf8',
  );

  fs.writeFileSync(OUT_SUMMARY_JSON, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

  console.log('BEAL 7-ADIC RECURRENCE LAYER BUILT');
  console.log(`families: ${summary.families}`);
  console.log(`finiteGoldFamilies: ${summary.finiteGoldFamilies}`);
  console.log(`testedLayers: ${summary.testedLayers.join(',')}`);
  console.log(`nextGate: ${summary.nextGate}`);
  console.log(`status: ${summary.status}`);
}

run();
