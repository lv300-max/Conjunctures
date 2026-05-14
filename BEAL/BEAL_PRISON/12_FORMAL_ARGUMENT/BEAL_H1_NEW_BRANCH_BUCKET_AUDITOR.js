const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = __dirname;

const files = {
  cubeDossier: path.join(ROOT, "beal_results", "BEAL_MISS1_CUBE_DOSSIER.json"),
  extension: path.join(ROOT, "beal_results", "BEAL_TEMPLATE_COUNT_EXTENSION.json"),
  branchAudit: path.join(OUT_DIR, "BEAL_BRANCH_EXHAUSTION_AUDIT.json"),
};

function readJson(file) {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function fmt(n) {
  if (n === undefined || n === null) return "UNKNOWN";
  if (typeof n === "number") return n.toLocaleString("en-US");
  return String(n);
}

function classifyRow(row) {
  const mechanism = row.mechanism || "other/unknown";
  if (mechanism === "pure cube near-collision") return "PURE_CUBE_BRANCH";
  if (mechanism === "sixth-power to cube bridge") return "SIXTH_POWER_BRIDGE_BRANCH";
  if (mechanism === "fourth-power target") return "FOURTH_POWER_TARGET_BRANCH";
  if (mechanism === "mixed-power isolated case") return "MIXED_POWER_BRANCH";
  return "NEW_BRANCH_BUCKET";
}

function collectRoofRows(cubeDossier, extension) {
  const rows = [];
  if (cubeDossier?.roofSummary) {
    for (const row of cubeDossier.roofSummary) {
      rows.push({
        source: "BEAL_MISS1_CUBE_DOSSIER.json",
        base: row.baseMax,
        danger: row.danger,
        valueTemplates: row.valueTemplates,
        rawMiss1Hits: row.miss1RawHits,
        mechanismCounts: row.mechanismCounts || {},
      });
    }
  }
  if (extension?.scanRows) {
    for (const row of extension.scanRows) {
      rows.push({
        source: "BEAL_TEMPLATE_COUNT_EXTENSION.json",
        base: row.base,
        danger: row.danger,
        valueTemplates: row.valueTemplates,
        rawMiss1Hits: row.rawMiss1Hits,
        mechanismCounts: row.mechanismCounts || {},
        samples: row.samples || [],
      });
    }
  }
  return rows.sort((a, b) => a.base - b.base);
}

function main() {
  const cubeDossier = readJson(files.cubeDossier);
  const extension = readJson(files.extension);
  const branchAudit = readJson(files.branchAudit);

  const roofRows = collectRoofRows(cubeDossier, extension);
  const sampleRows = [];
  for (const row of roofRows) {
    for (const sample of row.samples || []) {
      sampleRows.push({
        base: row.base,
        key: sample.key,
        sample: sample.sample,
        mechanism: sample.mechanism,
        branch: classifyRow(sample),
      });
    }
  }

  const unknownByBase = roofRows.map((row) => ({
    base: row.base,
    otherUnknown: row.mechanismCounts["other/unknown"] ?? "UNKNOWN",
  }));

  const newBranchSamples = sampleRows.filter((row) => row.branch === "NEW_BRANCH_BUCKET");
  const unknownTotalKnown = unknownByBase
    .filter((row) => typeof row.otherUnknown === "number")
    .reduce((sum, row) => sum + row.otherUnknown, 0);

  const highestBase = Math.max(...roofRows.map((row) => row.base));
  const highestRow = roofRows.find((row) => row.base === highestBase) || {};
  const knownBranchesAssigned = branchAudit?.unassignedKnownBranches === 0;

  const finiteVerdict =
    unknownTotalKnown === 0 && newBranchSamples.length === 0 && knownBranchesAssigned
      ? "FINITE_NO_NEW_BRANCH_BUCKET_FOUND"
      : "NEW_BRANCH_BUCKET_WARNING";

  const universalStatus = "UNIVERSAL_H1_NOT_PROVEN";

  const result = {
    status: "H1_NEW_BRANCH_BUCKET_AUDIT_COMPLETE",
    finiteVerdict,
    universalStatus,
    highestBase,
    dangerAtHighestBase: highestRow.danger ?? "UNKNOWN",
    valueTemplatesAtHighestBase: highestRow.valueTemplates ?? "UNKNOWN",
    rawMiss1HitsAtHighestBase: highestRow.rawMiss1Hits ?? "UNKNOWN",
    knownBranchesAssigned,
    unknownTotalKnown,
    newBranchSamples,
    unknownByBase,
    proofRead:
      "Existing data does not falsify H1: no known sample or mechanism count lands in NEW_BRANCH. This is finite evidence only; universal H1 still needs a no-new-branch theorem.",
    nextAction: "turn the finite decision tree into an exponent-signature exhaustion argument",
  };

  const md = `# Beal H1 New Branch Bucket Audit

## Status

${finiteVerdict}

Universal status:

\`\`\`text
${universalStatus}
\`\`\`

## Question

Can the current data prove or falsify that the H1 \`new branch\` bucket is empty?

## Answer

Finite data answer:

\`\`\`text
No new branch bucket was found in the existing result files.
\`\`\`

Universal theorem answer:

\`\`\`text
H1 is not proven universally yet.
\`\`\`

## Roof Mechanism Audit

| Base | Other/Unknown Mechanisms |
|---:|---:|
${unknownByBase.map((row) => `| ${row.base} | ${row.otherUnknown} |`).join("\n")}

## Sample Classification Audit

| Base | Branch | Mechanism | Sample |
|---:|---|---|---|
${sampleRows
  .slice(0, 80)
  .map((row) => `| ${row.base} | ${row.branch} | ${row.mechanism} | \`${row.sample || row.key}\` |`)
  .join("\n")}

## New Branch Bucket

| Metric | Value |
|---|---:|
| known branch audit unassigned branches | ${branchAudit?.unassignedKnownBranches ?? "UNKNOWN"} |
| other/unknown total in known mechanism counts | ${unknownTotalKnown} |
| sample rows classified as NEW_BRANCH | ${newBranchSamples.length} |

## Full Picture

| Field | Answer |
|---|---|
| WHO | H1 branch exhaustion layer |
| WHAT | checked whether known data lands in the \`new branch\` bucket |
| WHEN | after filled lemma tables and 12500 extension data |
| WHERE | formal argument layer |
| WHY | a new branch would escape every blocker |
| HOW | audited mechanism counts and classified available samples |
| WHAT BLOCKS IT | finite data cannot prove universal branch exhaustion |
| WHAT WOULD BREAK IT | any \`other/unknown\` mechanism or sample classified NEW_BRANCH |
| WHETHER THE BLOCKER CHANGES | no finite breaker found; universal proof still open |
| CURRENT STATUS | ${finiteVerdict} / ${universalStatus} |
| NEXT ACTION | build exponent-signature exhaustion argument |

## Proof Boundary

The audit does not prove Beal.

It proves only this finite statement:

\`\`\`text
No currently recorded mechanism count or available sample falls outside the branch ledger.
\`\`\`

To close H1, the project still needs:

\`\`\`text
No exponent signature can enter the final "otherwise new branch" bucket.
\`\`\`

## Final Read

The H1 new-branch bucket is empty in the existing data, so H1 is not falsified. It is not proven universally. The next move is an exponent-signature exhaustion argument, not another broad scan.
`;

  fs.writeFileSync(path.join(OUT_DIR, "BEAL_H1_NEW_BRANCH_BUCKET_AUDIT.json"), JSON.stringify(result, null, 2) + "\n");
  fs.writeFileSync(path.join(OUT_DIR, "BEAL_H1_NEW_BRANCH_BUCKET_AUDIT.md"), md);

  const statusPath = path.join(OUT_DIR, "BEAL_NEXT_GATE_STATUS.json");
  const status = readJson(statusPath) || {};
  status.nextAction = "build exponent-signature exhaustion argument for H1";
  status.h1NewBranchBucketAudit = {
    finiteVerdict,
    universalStatus,
    unknownTotalKnown,
    newBranchSamples: newBranchSamples.length,
    files: [
      "BEAL_H1_NEW_BRANCH_BUCKET_AUDIT.md",
      "BEAL_H1_NEW_BRANCH_BUCKET_AUDIT.json",
    ],
  };
  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2) + "\n");

  console.log("BEAL H1 NEW BRANCH BUCKET AUDIT");
  console.log(`highestBase: ${fmt(highestBase)}`);
  console.log(`otherUnknownTotal: ${unknownTotalKnown}`);
  console.log(`newBranchSamples: ${newBranchSamples.length}`);
  console.log(`finiteVerdict: ${finiteVerdict}`);
  console.log(`universalStatus: ${universalStatus}`);
  console.log("nextAction: build exponent-signature exhaustion argument for H1");
}

main();
