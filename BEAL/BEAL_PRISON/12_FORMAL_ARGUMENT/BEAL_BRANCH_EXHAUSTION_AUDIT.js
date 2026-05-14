#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = __dirname;
const NODES_FILE = path.join(ROOT, '10_TOPOLOGY_ENGINE/BEAL_TOPOLOGY_NODES.json');
const RULE_FILE = path.join(OUT, 'BEAL_BRANCH_EXHAUSTION_RULE_SUMMARY.json');
const OUT_MD = path.join(OUT, 'BEAL_BRANCH_EXHAUSTION_AUDIT.md');
const OUT_JSON = path.join(OUT, 'BEAL_BRANCH_EXHAUSTION_AUDIT.json');
const OUT_MEMBERSHIP_MD = path.join(OUT, 'BEAL_BRANCH_MEMBERSHIP_STABILITY_TARGET.md');

const ASSIGNMENTS = {
  CLOSED: 'assigned',
  CONTAINED: 'assigned-open-gap',
  ISOLATED: 'assigned-open-gap',
  GOLD: 'assigned-finite-gold',
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function branchRow(node) {
  const assignment = ASSIGNMENTS[node.status] || 'unassigned';
  const gap =
    node.status === 'CONTAINED'
      ? 'needs closure'
      : node.status === 'ISOLATED'
        ? 'needs general rule'
        : node.openGap || 'none';
  return {
    id: node.id,
    title: node.title,
    status: node.status,
    assignment,
    claim: node.claim,
    gap,
    nextAction:
      node.status === 'CONTAINED'
        ? 'build full factor-wall closure'
        : node.status === 'ISOLATED'
          ? 'build mixed-power general rule'
          : node.status === 'CLOSED'
            ? 'cite closure cleanly'
            : 'assign branch',
  };
}

function table(rows) {
  return rows
    .map(
      (row) =>
        `| ${row.title} | ${row.status} | ${row.assignment} | ${row.gap} | ${row.nextAction} |`,
    )
    .join('\n');
}

function run() {
  const nodes = readJson(NODES_FILE);
  const rule = readJson(RULE_FILE);
  const branchRows = nodes.filter((node) => node.type === 'BRANCH').map(branchRow);
  const unassigned = branchRows.filter((row) => row.assignment === 'unassigned');
  const assigned = branchRows.length - unassigned.length;
  const openAssigned = branchRows.filter((row) => row.assignment === 'assigned-open-gap');

  const result = {
    status: unassigned.length === 0 ? 'KNOWN_BRANCHES_ASSIGNED' : 'UNASSIGNED_BRANCHES_PRESENT',
    branchCount: branchRows.length,
    assignedKnownBranches: assigned,
    unassignedKnownBranches: unassigned.length,
    openAssignedBranches: openAssigned.map((row) => row.id),
    syntheticOpenGap: rule.branchAssignments.newOrUnassignedBranch,
    remainingGap:
      'Prove no branch outside the current topology appears, and prove contained/isolated branches cannot become exact no-family equality.',
    nextGate: 'BRANCH_MEMBERSHIP_STABILITY_TARGET',
    branches: branchRows,
  };

  fs.writeFileSync(OUT_JSON, `${JSON.stringify(result, null, 2)}\n`, 'utf8');

  fs.writeFileSync(
    OUT_MD,
    `# Beal Branch Exhaustion Audit

## Status

${result.status}

## Known Branch Assignment

| Branch | Status | Assignment | Gap | Next Action |
|---|---|---|---|---|
${table(branchRows)}

## Audit Result

- known topology branches: \`${result.branchCount}\`
- assigned known branches: \`${result.assignedKnownBranches}\`
- unassigned known branches: \`${result.unassignedKnownBranches}\`
- assigned-but-open branches: \`${result.openAssignedBranches.join(', ') || 'none'}\`

## What This Means

All currently known topology branches are assigned.

That does not finish proof.

The remaining gap is:

\`\`\`text
prove no relevant no-family branch exists outside the current topology,
and prove contained/isolated branches cannot become exact no-family equality.
\`\`\`

## Next Gate

\`\`\`text
BRANCH_MEMBERSHIP_STABILITY_TARGET
\`\`\`
`,
    'utf8',
  );

  fs.writeFileSync(
    OUT_MEMBERSHIP_MD,
    `# Beal Branch Membership Stability Target

## Status

TARGET - NOT PROVEN

## Target Statement

Every relevant no-family candidate remains in one of the current topology assignments:

\`\`\`text
closed / reduced / contained / isolated / lifted
\`\`\`

No candidate may leave the assigned branch and become a new untracked exact-equality family.

## Why This Is The Next Gate

The lift rule handles one tracked path:

\`\`\`text
Delta = +/-1 mod 7^k cannot become Delta = 0 mod 7^(k+1)
\`\`\`

The branch-exhaustion problem is wider:

\`\`\`text
prove the candidate must be on a tracked path,
or prove it closes by an existing wall.
\`\`\`

## What Must Be Proven

1. Pure cube candidates stay in the Fermat-closed branch.
2. Sixth bridge candidates reduce to pure cube.
3. Cube-driven miss-1 candidates enter the 9 lifted families.
4. Fourth-power target candidates cannot produce exact no-family closure.
5. Mixed-power candidates cannot become a growing exact branch.
6. No new mechanism appears outside the topology.

## What Would Break It

- a new no-family exact-equality branch
- a cube-driven candidate outside the 9 lifted families
- a fourth-power exact closure
- a mixed-power growing family
- a topology branch with no assignment

## Plain Read

The known branches are assigned. The remaining problem is proving the assignment list is exhaustive and stable.
`,
    'utf8',
  );

  console.log('BEAL BRANCH EXHAUSTION AUDIT');
  console.log(`knownBranches: ${result.branchCount}`);
  console.log(`assignedKnownBranches: ${result.assignedKnownBranches}`);
  console.log(`unassignedKnownBranches: ${result.unassignedKnownBranches}`);
  console.log(`openAssignedBranches: ${result.openAssignedBranches.join(',') || 'none'}`);
  console.log(`status: ${result.status}`);
  console.log(`nextGate: ${result.nextGate}`);
}

run();
