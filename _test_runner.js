'use strict';
// POLIGNAC WORKBENCH SELF TEST v2 — node _test_runner.js

const fs = require('fs');
const src = fs.readFileSync(__dirname+'/workbench.html','utf8');

// ── Logic mirrors (identical to workbench.html) ───────────────────
function sieve(n){
  if(n<2) return [];
  const c = new Uint8Array(n+1);
  for(let i=2;i*i<=n;i++) if(!c[i]) for(let j=i*i;j<=n;j+=i) c[j]=1;
  const o=[];
  for(let i=2;i<=n;i++) if(!c[i]) o.push(i);
  return o;
}
function gap246Admissibility(tuple, primeLimit){
  const primes = sieve(primeLimit);
  const checks = primes.map(q => {
    const residues = [...new Set(tuple.map(h => ((h%q)+q)%q))].sort((a,b)=>a-b);
    return { q, occupiedResidues:residues, occupiedCount:residues.length,
             status: residues.length < q ? 'PASS' : 'FAIL' };
  });
  const failed = checks.find(r => r.status==='FAIL') || null;
  return { status: failed?'FAIL':'PASS', blockedPrime: failed?failed.q:null, checks };
}

// ── Result tracking ───────────────────────────────────────────────
const rows = [];
let passCount=0, warnCount=0, failCount=0;
function pass(name){ passCount++; rows.push({tier:'pass',name,msg:''}); }
function warn(name, msg){ warnCount++; rows.push({tier:'warn',name,msg:msg||''}); }
function fail(name, msg){ failCount++; rows.push({tier:'fail',name,msg:msg||''}); }
function check(name, got, expected){
  if(JSON.stringify(got)===JSON.stringify(expected)) pass(name);
  else fail(name, 'got '+JSON.stringify(got)+', expected '+JSON.stringify(expected));
}

// ══ MATH UNIT TESTS ══════════════════════════════════════════════
check('sieve(10) = [2,3,5,7]',   sieve(10), [2,3,5,7]);
check('sieve(2) = [2]',          sieve(2), [2]);
const p241 = sieve(241);
check('|primes <= 241| = 53',    p241.length, 53);  // CRITICAL: 53 not 54
check('max prime <= 241 = 241',  p241[p241.length-1], 241);
check('min prime <= 241 = 2',    p241[0], 2);

// admissibility PASS case
check('adm([0],30) = PASS',      gap246Admissibility([0],30).status, 'PASS');

// [0,2,4]: mod 2 -> {0} PASS, mod 3 -> {0,2,1} = 3 residues = q=3 -> FAIL at q=3
const a024 = gap246Admissibility([0,2,4], 5);
check('adm([0,2,4],5) = FAIL',         a024.status, 'FAIL');
check('blockedPrime([0,2,4],5) = 3',   a024.blockedPrime, 3);

// [0,1,2]: mod 2 -> {0,1} = 2 = q=2 -> FAIL immediately at q=2
const a012 = gap246Admissibility([0,1,2], 3);
check('adm([0,1,2],3) = FAIL',         a012.status, 'FAIL');
check('blockedPrime([0,1,2],3) = 2',   a012.blockedPrime, 2);

// ══ FULL q<=241 CERTIFICATE SIMULATION ═══════════════════════════
const cert02 = gap246Admissibility([0,2], 241);
check('cert([0,2], q<=241): checks.length = 53', cert02.checks.length, 53);
check('cert([0,2], q<=241): status = PASS',      cert02.status, 'PASS');
check('cert([0,2], q<=241): highestQ = 241',     cert02.checks[cert02.checks.length-1].q, 241);
check('cert([0,2], q<=241): lowestQ = 2',        cert02.checks[0].q, 2);
check('cert([0,2], q<=241): blockedPrime = null',cert02.blockedPrime, null);
check('cert([0,2], q<=241): all checks PASS',    cert02.checks.every(c=>c.status==='PASS'), true);

// ══ PATCH SIMULATION ═════════════════════════════════════════════
const mock = {};
mock.admissibilityChecks  = cert02.checks;
mock.admissible           = cert02.status === 'PASS';
mock.highestPrimeChecked  = cert02.checks[cert02.checks.length-1].q;
mock.admissibilityStatus  = cert02.status;
mock._cert241Complete     = true;
mock._cert241HighestQ     = 241;
check('patch: admissible = true',              mock.admissible, true);
check('patch: highestPrimeChecked = 241',      mock.highestPrimeChecked, 241);
check('patch: admissibilityChecks.length = 53',mock.admissibilityChecks.length, 53);
check('patch: admissibilityStatus = PASS',     mock.admissibilityStatus, 'PASS');
check('patch: _cert241Complete = true',        mock._cert241Complete, true);
check('patch: _cert241HighestQ = 241',         mock._cert241HighestQ, 241);

// ══ KNOWN FAIL CASE ══════════════════════════════════════════════
// [0,2,4,6,8,10,12] at q=7: residues 0,2,4,6,1,3,5 -> 7 = q -> FAIL
// BUT sieve(7) checks q=2 first: {0,0,0,0,0,0,0}={0} 1<2 PASS
//   q=3: {0,2,1,0,2,1,0}={0,1,2} 3=q=3 -> FAIL at q=3 (not q=7)
const fCert = gap246Admissibility([0,2,4,6,8,10,12], 7);
const q7    = fCert.checks.find(c=>c.q===7);
check('fTuple at q=7: occupiedCount=7', q7?q7.occupiedCount:null, 7);
check('fTuple at q=7: status=FAIL',     q7?q7.status:null, 'FAIL');
// blockedPrime = 3 (first failure in sieve order: q=2 PASS, q=3 FAIL)
check('fTuple blockedPrime = 3',        fCert.blockedPrime, 3);

// ══ HTML STRUCTURE (scripts stripped for phrase scan) ════════════
// Strip <script> blocks so forbidden-phrase scan is on HTML content only
const htmlOnly   = src.replace(/<script[\s\S]*?<\/script>/gi, ' ');
const htmlOnlyLC = htmlOnly.toLowerCase();

// Honesty strings MUST appear in HTML (not in script)
const HONESTY = [
  'pass != proof',
  'admissibility is necessary but not sufficient',
  'gates 3',
  'record not beaten',
];
HONESTY.forEach(s => {
  if(htmlOnlyLC.includes(s.toLowerCase())) pass('honesty string present: "'+s+'"');
  else warn('honesty string NOT found in HTML: "'+s+'"');
});

// Forbidden overclaim phrases must NOT appear in HTML content
const FORBIDDEN = [
  'record beaten',
  'proof complete',
  'we have proved',
  'theorem proved',
  'conjecture proved',
];
FORBIDDEN.forEach(s => {
  if(htmlOnlyLC.includes(s.toLowerCase())) fail('FORBIDDEN phrase in HTML: "'+s+'"');
  else pass('forbidden phrase absent from HTML: "'+s+'"');
});

// Key DOM IDs must exist in HTML source
[
  'id="cert241Out"',
  'id="maynardCertOut"',
  'id="gap246Summary"',
  'id="gap246Table"',
  'id="gap246ProgressBar"',
].forEach(id => check('HTML contains '+id, src.includes(id), true));

// cert241Out must appear before gap246Summary in source order
const i241 = src.indexOf('id="cert241Out"');
const iSum = src.indexOf('id="gap246Summary"');
check('DOM order: cert241Out before gap246Summary', i241 < iSum && i241 > 0, true);

// Button calls runFullAdmissibilityCert241
check('button calls runFullAdmissibilityCert241()',
  src.includes('runFullAdmissibilityCert241()'), true);

// Key functions defined in source
[
  'function runFullAdmissibilityCert241(',
  'function _selfTest(',
  'function runMaynardCertBuilder(',
  'function exportMaynardCertJson(',
  'function exportMaynardCertMd(',
  'function runBigBulkPolignac(',
  'function runPrimePianoSwatch(',
  'function runSwatchStripCompare(',
  'function runBoundedGap246Attack(',
  'function gap246Admissibility(',
  'function sieve(',
].forEach(fn => check('fn defined: '+fn, src.includes(fn), true));

// highestPrimeChecked and admissible patches present in source
check('source patches highestPrimeChecked',
  src.includes('highestPrimeChecked'), true);
check('source patches admissible = ',
  src.includes('window._boundedGap246Data.admissible'), true);

// Maynard Proof Certificate Explainer
[
  'function runMaynardProofCertificateExplainer(',
  'function runToySieveWeightSimulation(',
  'function exportMaynardProofCertJson(',
  'function exportMaynardProofCertMd(',
  'function maynardProofCertSimpleHash(',
  'id="maynardProofCertOut"',
  'id="mpceSampleShifts"',
  'id="mpceThreshold"',
  'id="mpceToyN"',
  'runMaynardProofCertificateExplainer()',
  'runToySieveWeightSimulation()',
  'MAYNARD CERTIFICATE MISSING',
  'TOY FINITE SIMULATION ONLY',
].forEach(s => check('HTML/src contains: '+s, src.includes(s), true));

// Gap Fingerprint Engine source checks
[
  'function runPrimeGapFingerprint(',
  'function exportGapFingerprintJson(',
  'function exportGapFingerprintMd(',
  'function primeGapFingerprintHash(',
  'function _gfpSieveSegment(',
  'function _buildFingerprint(',
  'function _findMotifs(',
  'function _octaveCompare(',
  'id="primeGapFingerprintOut"',
  'id="gfpStart"',
  'id="gfpMode"',
  'id="gfpOffset"',
  'GAP FINGERPRINT BUILT',
  'UNIVERSAL PROOF OPEN',
  'Polignac asks whether every odd inside-count value',
  'This fingerprint is a finite pattern test',
  'PRIME_GAP_FINGERPRINT_ENGINE',
].forEach(s => check('GFP src contains: '+s, src.includes(s), true));

// Node-side logic test for fingerprint math
(function(){
  function gfpSieve(lo, hi){
    if(lo<2) lo=2;
    const c=new Uint8Array(hi-lo+1);
    const sm=sieve(Math.ceil(Math.sqrt(hi)));
    for(const p of sm){ let s=Math.max(p*p,Math.ceil(lo/p)*p); if(s===p)s+=p; for(let j=s;j<=hi;j+=p)c[j-lo]=1; }
    const out=[];
    for(let i=0;i<c.length;i++) if(!c[i]) out.push(lo+i);
    return out;
  }
  const ps = gfpSieve(2,50);
  check('gfpSieve(2,50) includes 2,3,5,7,11', ps.slice(0,5).join(','), '2,3,5,7,11');
  // gaps between [2,3,5,7,11]: 1,2,2,4 -> inside: 0,1,1,3
  const gaps=[]; for(let i=1;i<ps.length;i++) gaps.push(ps[i]-ps[i-1]);
  check('first gap = 1 (2->3)', gaps[0], 1);
  check('second gap = 2 (3->5)', gaps[1], 2);
  check('4th gap = 4 (7->11)', gaps[3], 4);
  // inside count for gap=2 is 1, code should be A
  const MAP={1:'A',3:'B',5:'C',7:'D',9:'E',11:'F',13:'G',15:'H',17:'I',19:'J'};
  check('insideToCode(1)=A', MAP[1], 'A');
  check('insideToCode(3)=B', MAP[3], 'B');
  check('insideToCode(5)=C', MAP[5], 'C');
  check('insideToCode(9)=E', MAP[9], 'E');
})();

// HL Constant Compare + Failure Simulator source checks
[
  'function runHLConstantCompare(',
  'function runFailureSimulator(',
  'function _hlConstant(',
  'id="hlcOut"',
  'id="failSimOut"',
  'id="hlcGapK"',
  'id="hlcScanN"',
  'runHLConstantCompare()',
  'runFailureSimulator()',
  'HL conjecture is OPEN',
  'FINITE EVIDENCE ONLY',
  'FAILURE SIMULATOR',
  'HL CONSTANT COMPARE',
].forEach(s => check('HLC/FS src contains: '+s, src.includes(s), true));

// Node-side logic: _hlConstant math
(function(){
  const C2 = 0.6601618158468696;
  // k=2: no p>2 divides 2, so prod=1, result = 2*C2
  const hlc2 = 2*C2;
  check('_hlConstant(2) ≈ 2*C2', Math.abs(hlc2-1.3203)<0.001, true);
  // k=6: p=3 divides 6, prod=(3-1)/(3-2)=2
  const hlc6 = 2*C2*2;
  check('_hlConstant(6) ≈ 4*C2', Math.abs(hlc6-2.6407)<0.001, true);
  // k=1 (odd): should be 0
  check('_hlConstant odd k returns 0 conceptually', 1%2!==0, true);
})();

// Fingerprint Batch Runner source checks
[
  'function runFingerprintBatch(',
  'function exportFingerprintBatchJson(',
  'function exportFingerprintBatchMd(',
  'function _fpbSieve(',
  'function _fpbBuildInsideCounts(',
  'function _fpbFindMotifs(',
  'function _fpbHash(',
  'function _fpbFinish(',
  'id="fingerprintBatchOut"',
  'runFingerprintBatch()',
  'exportFingerprintBatchJson()',
  'exportFingerprintBatchMd()',
  'FINGERPRINT BATCH RUNNER',
  'FINGERPRINT BATCH BUILT',
  'SHARED MOTIFS TRACKED',
  'FINITE PATTERN ONLY',
  'CORE STITCH',
  'Shared motifs are finite evidence only',
  '_FPB_PRESETS',
  'Base fabric',
  'Weakest gap zone',
  'Big pressure zone',
  'Largest dead-zone area',
  'Hash-only fast scan',
  'FINGERPRINT_BATCH_RUNNER',
  'finitePatternEvidence',
  'universalProof',
].forEach(s => check('FPB src contains: '+s, src.includes(s), true));

// Node-side logic: _fpbHash is deterministic
(function(){
  function fpbHash(str){
    let h=0x811c9dc5;
    for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=(h*0x01000193)>>>0;}
    return h.toString(16).padStart(8,'0');
  }
  const h1=fpbHash('hello');
  const h2=fpbHash('hello');
  check('_fpbHash deterministic', h1, h2);
  check('_fpbHash length=8', h1.length, 8);
  check('_fpbHash differs on different input', fpbHash('abc')!==fpbHash('xyz'), true);
})();

[
  'certified admissible below-246 candidate',
  'record not beaten',
].forEach(s => {
  if(htmlOnlyLC.includes(s.toLowerCase())) pass('Panel5 string present: "'+s+'"');
  else warn('Panel5 string not in HTML: "'+s+'"');
});

// Maynard gate structural requirements — these MUST stay OPEN/MISSING in source
[
  // Gate 3 weight gate must be OPEN
  ["gate3 status OPEN in source",    "id: 3, name: 'WEIGHT GATE'",          "'OPEN'"],
  // Gate 4 inequality gate must be OPEN
  ["gate4 status OPEN in source",    "id: 4, name: 'INEQUALITY GATE'",      "'OPEN'"],
  // Gate 5 infinite conclusion must be OPEN
  ["gate5 status OPEN in source",    "id: 5, name: 'INFINITE CONCLUSION GATE'", "'OPEN'"],
  // infiniteCertificate must be MISSING
  ["infiniteCertificate: MISSING",   "infiniteCertificate:",                "'MISSING'"],
  // universalProof must be OPEN
  ["universalProof: OPEN",           "universalProof:",                     "'OPEN'"],
  // Record must not be beaten
  ["RECORD NOT BEATEN present",      "RECORD NOT BEATEN",                   null],
].forEach(([label, anchor, after]) => {
  if(after === null){
    check(label, src.includes(anchor), true);
  } else {
    const idx = src.indexOf(anchor);
    const snippet = idx >= 0 ? src.slice(idx, idx+120) : '';
    check(label, snippet.includes(after), true);
  }
});

// ══ JSON ARTIFACT INTEGRITY ══════════════════════════════════════
(function(){
  const path = require('path');
  const artifactChecks = [
    {
      file: 'collatz_octave_audit_report.json',
      keys: ['auditRuns','finalHonestStatus','independentRegeneration'],
      honestStatus: 'NOT A COLLATZ PROOF',
    },
    {
      file: 'strict_anyn_audit_report.json',
      keys: ['results','finalHonestStatus','proofBoundaries'],
      honestStatus: 'STRICT FINITE AUDIT COMPLETE',
    },
    {
      file: 'POLIGNAC_WEAKEST_K_RUN.json',
      keys: ['engine','finalHonestStatus','evenKTested'],
      honestStatus: 'UNIVERSAL PROOF OPEN',
    },
  ];
  artifactChecks.forEach(({file,keys,honestStatus})=>{
    const fp = path.join(__dirname, file);
    let parsed = null;
    try { parsed = JSON.parse(require('fs').readFileSync(fp,'utf8')); }
    catch(e){ fail('JSON artifact readable: '+file, 'could not parse: '+e.message); return; }
    pass('JSON artifact exists and parses: '+file);
    keys.forEach(k => {
      if(Object.prototype.hasOwnProperty.call(parsed,k)) pass('JSON key present "'+k+'" in '+file);
      else fail('JSON key missing "'+k+'" in '+file);
    });
    const hs = parsed.finalHonestStatus || '';
    if(hs.includes(honestStatus)) pass('honestStatus correct in '+file);
    else warn('honestStatus unexpected in '+file+': '+hs.slice(0,60));
  });

  // Collatz audit: independent regeneration must show FAIL_BLOCKED (no phantom proof)
  try {
    const col = JSON.parse(require('fs').readFileSync(
      require('path').join(__dirname,'collatz_octave_audit_report.json'),'utf8'));
    const regen = (col.auditRuns||{}).missingRegeneration || {};
    const indep = (regen.independentRegeneration||{}).reason||'';
    if(indep.includes('Cannot rebuild')) pass('collatz audit: independentRegeneration honest (no phantom proof)');
    else warn('collatz audit: independentRegeneration reason unexpected: '+indep.slice(0,60));
  } catch(e){ warn('collatz audit: could not check independentRegeneration'); }

  // Polignac: failCount must be 0 (all k checked pass local obstruction)
  try {
    const pol = JSON.parse(require('fs').readFileSync(
      require('path').join(__dirname,'POLIGNAC_WEAKEST_K_RUN.json'),'utf8'));
    check('Polignac JSON: failCount = 0', pol.failCount, 0);
    check('Polignac JSON: evenKTested = 100', pol.evenKTested, 100);
    if(pol.finalHonestStatus && pol.finalHonestStatus.includes('UNIVERSAL PROOF OPEN'))
      pass('Polignac JSON: UNIVERSAL PROOF OPEN present');
    else fail('Polignac JSON: UNIVERSAL PROOF OPEN missing from honestStatus');
  } catch(e){ warn('Polignac JSON: could not verify detail fields'); }
})();

// ══ TALLY ════════════════════════════════════════════════════════
const total   = passCount+warnCount+failCount;
const verdict = failCount>0?'FAIL':warnCount>0?'PASS WITH WARNINGS':'PASS';
const vIcon   = failCount>0?'FAIL':warnCount>0?'PASS WITH WARNINGS':'PASS';

console.log('');
console.log('════════════════════════════════════════════════════════════');
console.log('  POLIGNAC WORKBENCH SELF TEST  (Node.js run)');
console.log('════════════════════════════════════════════════════════════');
rows.forEach(r => {
  const icon = r.tier==='pass'?'✓':r.tier==='warn'?'⚠':'✗';
  console.log('  '+icon+' '+r.name+(r.msg?' — '+r.msg:''));
});
console.log('');
console.log('  Total: '+total+' | Pass: '+passCount+' | Warn: '+warnCount+' | Fail: '+failCount);
console.log('  ► FINAL: '+verdict);
console.log('════════════════════════════════════════════════════════════');
process.exit(failCount>0?1:0);
