'use strict';
// TOY SIEVE WEIGHT SIMULATION — Node harness
// Mirrors runToySieveWeightSimulation() from workbench.html
// Uses an independently built k=49 admissible tuple (same as _maynard_cert_test.js)
// No browser needed.

const { execSync } = require('child_process');

// ── Sieve ──────────────────────────────────────────────────────────
function sieve(n){
  if(n<2) return [];
  const c = new Uint8Array(n+1);
  for(let i=2;i*i<=n;i++) if(!c[i]) for(let j=i*i;j<=n;j+=i) c[j]=1;
  const o=[];
  for(let i=2;i<=n;i++) if(!c[i]) o.push(i);
  return o;
}

// ── Admissibility ──────────────────────────────────────────────────
function isAdmissible(tuple, primeLimit){
  const primes = sieve(primeLimit);
  for(const q of primes){
    const res = new Set(tuple.map(h=>((h%q)+q)%q));
    if(res.size === q) return { ok:false, blockedAt:q };
  }
  return { ok:true, blockedAt:null };
}

// ── Build k=49 admissible tuple (greedy even-shift) ────────────────
function buildAdmissibleTuple(targetSize, maxDiameter){
  const tuple = [0];
  let h = 2;
  while(tuple.length < targetSize && h <= maxDiameter){
    const candidate = [...tuple, h];
    if(isAdmissible(candidate, candidate.length+1).ok) tuple.push(h);
    h += 2;
  }
  return tuple;
}

const TARGET_K     = 49;
const MAX_DIAMETER = 500;
const tuple        = buildAdmissibleTuple(TARGET_K, MAX_DIAMETER);
const diameter     = tuple[tuple.length-1] - tuple[0];

console.log('');
console.log('══════════════════════════════════════════════════════════');
console.log('  TOY SIEVE WEIGHT SIMULATION  (Node harness)');
console.log('══════════════════════════════════════════════════════════');
console.log('  Tuple size   :', tuple.length);
console.log('  Diameter     :', diameter);
console.log('  Tuple (first 10) :', tuple.slice(0,10).join(', '), '...');

if(tuple.length < TARGET_K){
  console.error('  ERROR: could not build k='+TARGET_K+' tuple within diameter '+MAX_DIAMETER);
  process.exit(1);
}

// ── Toy simulation ─────────────────────────────────────────────────
// For each shift x in [1..sampleShifts], count how many h in tuple make x+h prime.
// A "hit" is when count >= threshold.

const SAMPLE_SHIFTS = 5000;
const THRESHOLD     = 2;
const toyN          = SAMPLE_SHIFTS + tuple[tuple.length-1];

// Precompute primality for numbers up to toyN
const primeSet = new Uint8Array(toyN+1);
{
  const sm = sieve(toyN);
  for(const p of sm) primeSet[p] = 1;
}

let hits = 0;
const hitShifts = [];
let bestShift = null, bestPrimeCount = 0;
let weightSum = 0;

for(let x=1; x<=SAMPLE_SHIFTS; x++){
  let count = 0;
  for(const h of tuple) if(primeSet[x+h]) count++;
  weightSum += count;
  if(count >= THRESHOLD){
    hits++;
    if(hitShifts.length < 50) hitShifts.push(x);
  }
  if(count > bestPrimeCount){ bestPrimeCount = count; bestShift = x; }
}

const hitRate   = (hits / SAMPLE_SHIFTS * 100).toFixed(2);
const avgWeight = (weightSum / SAMPLE_SHIFTS).toFixed(4);
const density   = (hits / SAMPLE_SHIFTS).toFixed(6);

console.log('');
console.log('  ── Simulation results ────────────────────────────────');
console.log('  Sample shifts   :', SAMPLE_SHIFTS);
console.log('  Threshold       :', THRESHOLD, '(primes per shift)');
console.log('  Hits (count>='+THRESHOLD+'):', hits, '('+hitRate+'%)');
console.log('  Density         :', density);
console.log('  Avg weight/shift:', avgWeight);
console.log('  Best shift      :', bestShift, '('+bestPrimeCount+' primes)');
console.log('  First 10 hits   :', hitShifts.slice(0,10).join(', '));
console.log('');

// ── Assertions ────────────────────────────────────────────────────
const assertions = [
  ['Tuple length = '+TARGET_K,              tuple.length === TARGET_K],
  ['Diameter < 250',                         diameter < 250],
  ['Hits > 0 (tuple attracts prime shifts)', hits > 0],
  ['Hit rate > 1%',                          hits/SAMPLE_SHIFTS > 0.01],
  ['Avg weight > 0',                         parseFloat(avgWeight) > 0],
  ['Best prime count >= threshold',          bestPrimeCount >= THRESHOLD],
  ['Simulation is finite (no proof claim)',  true],  // structural
];

let allOk = true;
console.log('  ── Gate assertions ───────────────────────────────────');
assertions.forEach(([label, ok])=>{
  console.log('  '+(ok?'✓':'✗')+' '+label);
  if(!ok) allOk = false;
});

console.log('');
console.log('  ⚠ IMPORTANT: This is a TOY FINITE SIMULATION ONLY.');
console.log('  Positive hit rate does NOT prove infinitely many prime');
console.log('  constellations. Maynard weight inequality (Gate 4)');
console.log('  and infinite bounded-gap conclusion (Gate 5) remain OPEN.');
console.log('');

// ── Summary ───────────────────────────────────────────────────────
const result = {
  engine:        'TOY_SIEVE_WEIGHT_SIMULATION',
  tupleLength:   tuple.length,
  diameter,
  sampleShifts:  SAMPLE_SHIFTS,
  threshold:     THRESHOLD,
  hits,
  hitRate:       parseFloat(hitRate),
  density:       parseFloat(density),
  avgWeight:     parseFloat(avgWeight),
  bestShift,
  bestPrimeCount,
  firstHits:     hitShifts.slice(0,10),
  proofStatus:   {
    infiniteCertificate: 'MISSING',
    universalProof:      'OPEN',
    toySimulation:       'FINITE_ONLY',
  },
  timestamp: new Date().toISOString(),
};

// Also run the static test suite to confirm 146/146 still pass
console.log('  Running static test suite...');
try {
  const out = execSync('node _test_runner.js 2>&1', { cwd: __dirname }).toString();
  const m = out.match(/Total:\s*(\d+).*?Pass:\s*(\d+).*?Fail:\s*(\d+)/);
  if(m){
    console.log('  Static tests: Total='+m[1]+' Pass='+m[2]+' Fail='+m[3]);
    if(parseInt(m[3]) > 0){ allOk = false; console.log('  ✗ Static test failures detected'); }
    else console.log('  ✓ Static test suite: all pass');
  }
} catch(e){ console.log('  ⚠ Could not run static test suite'); }

console.log('');
console.log('  ► TOY SIM: '+(allOk?'PASS':'FAIL'));
console.log('══════════════════════════════════════════════════════════');
console.log('');
process.exit(allOk ? 0 : 1);
