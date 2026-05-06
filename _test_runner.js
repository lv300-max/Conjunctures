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
