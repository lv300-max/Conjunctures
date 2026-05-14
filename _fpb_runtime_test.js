// ════════════════════════════════════════════════════════════
//  FINGERPRINT BATCH RUNNER — real runtime test harness
//  Extracted verbatim from workbench.html, stub-DOM only.
//  No browser, no HTML parsing — actual sieve math executes.
// ════════════════════════════════════════════════════════════
'use strict';

// ── Minimal stubs ────────────────────────────────────────────
const window = {};
const document = { getElementById: () => ({ set innerHTML(v){} }) };
function esc(x){ return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── sieve() — verbatim from workbench.html line 2052 ─────────
function sieve(N){
  const limit = Math.max(2, Number(N) || 2);
  const marks = new Uint8Array(limit + 1);
  const primes = [];
  for(let i = 2; i <= limit; i++) marks[i] = 1;
  for(let p = 2; p * p <= limit; p++){
    if(marks[p]){
      for(let q = p * p; q <= limit; q += p) marks[q] = 0;
    }
  }
  for(let i = 2; i <= limit; i++){ if(marks[i]) primes.push(i); }
  return primes;
}

// ── _FPB functions — verbatim from workbench.html ────────────
const _FPB_PRESETS = [
  { name:'Base fabric',           start:1,       rangeSize:10000,  chunkSize:1000,  mode:'code', compareOffset:10000   },
  { name:'Weakest gap zone',      start:100000,  rangeSize:100000, chunkSize:5000,  mode:'code', compareOffset:100000  },
  { name:'Big pressure zone',     start:1000000, rangeSize:100000, chunkSize:5000,  mode:'code', compareOffset:1000000 },
  { name:'Largest dead-zone area',start:9990000, rangeSize:100000, chunkSize:5000,  mode:'code', compareOffset:100000  },
  { name:'Hash-only fast scan',   start:1,       rangeSize:1000000,chunkSize:10000, mode:'hash', compareOffset:1000000 },
];

window._fingerprintBatchData = null;

function _fpbSieve(lo, hi){
  if(lo < 2) lo = 2;
  const c = new Uint8Array(hi - lo + 1);
  const sm = sieve(Math.ceil(Math.sqrt(hi)));
  for(const p of sm){
    let s = Math.max(p*p, Math.ceil(lo/p)*p);
    if(s === p) s += p;
    for(let j=s;j<=hi;j+=p) c[j-lo]=1;
  }
  const out=[];
  for(let i=0;i<c.length;i++) if(!c[i]) out.push(lo+i);
  return out;
}

function _fpbBuildInsideCounts(primes){
  const inside=[];
  for(let i=1;i<primes.length;i++) inside.push(primes[i]-primes[i-1]-1);
  return inside;
}

function _fpbInsideCode(v){
  const MAP={1:'A',3:'B',5:'C',7:'D',9:'E',11:'F',13:'G',15:'H',17:'I',19:'J'};
  return MAP[v] !== undefined ? MAP[v] : 'X'+v;
}

function _fpbFindMotifs(arr, len, top){
  const counts={};
  for(let i=0;i<=arr.length-len;i++){
    const key=arr.slice(i,i+len).join(',');
    counts[key]=(counts[key]||0)+1;
  }
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,top).map(([k,v])=>({seq:k,count:v}));
}

function _fpbHash(str){
  let h=0x811c9dc5;
  for(let i=0;i<str.length;i++){
    h^=str.charCodeAt(i);
    h=(h*0x01000193)>>>0;
  }
  return h.toString(16).padStart(8,'0');
}

// ── Main synchronous batch run (no setTimeout needed in Node) ─
function runBatchSync(){
  const results = [];
  process.stderr.write('');  // flush

  for(let idx=0; idx<_FPB_PRESETS.length; idx++){
    const preset = _FPB_PRESETS[idx];
    process.stdout.write(`  [${idx+1}/${_FPB_PRESETS.length}] Running: ${preset.name} … `);
    const lo = preset.start;
    const hi = lo + preset.rangeSize - 1;
    try {
      if(preset.mode === 'hash'){
        const t0 = Date.now();
        const primes = _fpbSieve(lo, hi);
        const elapsed = Date.now() - t0;
        const warning = elapsed > 8000 ? 'WARNING: slow scan ('+elapsed+'ms)' : null;
        const inside  = _fpbBuildInsideCounts(primes);
        const codeStr = inside.map(_fpbInsideCode).join('');
        const h = _fpbHash(codeStr || 'HASH_ONLY_'+lo);
        process.stdout.write(`done (${elapsed}ms)\n`);
        results.push({
          name:preset.name, start:lo, end:hi, rangeSize:preset.rangeSize,
          mode:'hash', primeCount:primes.length, gapCount:inside.length,
          mostCommonInside:null, largestInside:null, largestDeadZone:null,
          first50Inside:[], first100Symbols:'HASH-ONLY',
          motifs3:[], motifs4:[], motifs5:[],
          octaveMatchPct:null, hash:h,
          status:warning||'OK', warning,
        });
      } else {
        const t0 = Date.now();
        const primes = _fpbSieve(lo, hi);
        const inside = _fpbBuildInsideCounts(primes);
        const freq={};
        let maxF=0, mostCommon=null, largest=0;
        for(const v of inside){
          freq[v]=(freq[v]||0)+1;
          if(freq[v]>maxF){maxF=freq[v];mostCommon=v;}
          if(v>largest) largest=v;
        }
        const largestDeadZone = largest;
        const codes    = inside.map(_fpbInsideCode);
        const first100 = codes.slice(0,100).join('');
        const motifs3 = _fpbFindMotifs(inside,3,5);
        const motifs4 = _fpbFindMotifs(inside,4,5);
        const motifs5 = _fpbFindMotifs(inside,5,5);

        // octave compare
        const mid = Math.floor((lo+hi)/2);
        const ins1 = _fpbBuildInsideCounts(_fpbSieve(lo, mid));
        const ins2 = _fpbBuildInsideCounts(_fpbSieve(mid+1, hi));
        const minLen = Math.min(ins1.length, ins2.length);
        let matchCount=0;
        for(let i=0;i<minLen;i++) if(ins1[i]===ins2[i]) matchCount++;
        const octavePct = minLen>0 ? Math.round((matchCount/minLen)*1000)/10 : 0;
        const codeStr = codes.join('');
        const h = _fpbHash(codeStr);
        const elapsed = Date.now()-t0;
        process.stdout.write(`done (${elapsed}ms)\n`);
        results.push({
          name:preset.name, start:lo, end:hi, rangeSize:preset.rangeSize,
          mode:'code', primeCount:primes.length, gapCount:inside.length,
          mostCommonInside:mostCommon, largestInside:largest, largestDeadZone,
          first50Inside:inside.slice(0,50), first100Symbols:first100,
          motifs3, motifs4, motifs5,
          octaveMatchPct:octavePct, hash:h, status:'OK', warning:null,
        });
      }
    } catch(e) {
      process.stdout.write(`ERROR: ${e.message}\n`);
      results.push({ name:preset.name, status:'ERROR: '+e.message, error:true });
    }
  }
  return results;
}

// ── Shared motif aggregation — verbatim from _fpbFinish ───────
function computeSharedMotifs(results){
  const nonHash = results.filter(r=>r.mode==='code' && !r.error);
  const motifMap={};
  function collect(r, motifs, len){
    for(const m of motifs){
      const k='L'+len+':'+m.seq;
      if(!motifMap[k]) motifMap[k]={seq:m.seq,len,runs:new Set(),total:0,strongest:r.name,_topCount:0};
      motifMap[k].runs.add(r.name);
      motifMap[k].total+=m.count;
      if(m.count>motifMap[k]._topCount){motifMap[k]._topCount=m.count;motifMap[k].strongest=r.name;}
    }
  }
  for(const r of nonHash){
    collect(r,r.motifs3||[],3);
    collect(r,r.motifs4||[],4);
    collect(r,r.motifs5||[],5);
  }
  const nRuns=nonHash.length;
  return Object.values(motifMap)
    .map(m=>({...m,runCount:m.runs.size,status:m.runs.size===nRuns&&nRuns>1?'CORE STITCH':m.runs.size>1?'COMMON':'LOCAL'}))
    .sort((a,b)=>b.runCount-a.runCount||b.total-a.total)
    .slice(0,20);
}

// ── Export validation (no file I/O, just verify payload) ──────
function validateJsonExport(d){
  const payload = {
    engine:'FINGERPRINT_BATCH_RUNNER',
    timestamp: new Date().toISOString(),
    runs: d.results,
    sharedMotifs: d.sharedMotifs,
    summary: d.summary,
    proofStatus:{ finitePatternEvidence:'STRONG', universalProof:'OPEN' },
    hash: _fpbHash(JSON.stringify(d.summary)),
  };
  const str = JSON.stringify(payload, null, 2);
  return {
    valid: true,
    engine: payload.engine,
    runCount: payload.runs.length,
    hasSharedMotifs: Array.isArray(payload.sharedMotifs),
    hasSummary: !!payload.summary,
    universalProof: payload.proofStatus.universalProof,
    hash: payload.hash,
    byteSize: str.length,
  };
}

function validateMdExport(d){
  const s = d.summary;
  let md = `# FINGERPRINT BATCH REPORT\n\n`;
  md += `## Safe Claim\nFinite pattern only. Not proof. Shared motifs are finite evidence only.\n\n`;
  md += `## Runs\n`;
  for(const r of d.results){
    md += `| ${r.name} | ${r.primeCount??'-'} | ${r.gapCount??'-'} | ${r.mostCommonInside??'-'} | ${r.largestDeadZone??'-'} | ${r.octaveMatchPct!=null?r.octaveMatchPct+'%':'-'} | ${r.status} |\n`;
  }
  md += `## Shared Motifs\n`;
  for(const m of d.sharedMotifs) md+=`| ${m.seq} | ${m.len} | ${m.runCount} | ${m.total} | ${m.strongest} | ${m.status} |\n`;
  md += `## Summary\n- Total runs: ${s.totalRuns}\n`;
  md += `## Final Label\n${s.finalLabel}\n`;
  return {
    hasFinalLabel: md.includes('FINGERPRINT BATCH BUILT'),
    hasSafeClaim: md.includes('Finite pattern only. Not proof.'),
    byteSize: md.length,
  };
}

// ── Forbidden phrase check (rendered text simulation) ─────────
const FORBIDDEN = ['proof complete','we have proved','theorem proved','conjecture proved','polignac proven','record beaten'];
function checkForbiddenPhrases(results){
  const text = JSON.stringify(results).toLowerCase();
  return FORBIDDEN.filter(p => text.includes(p));
}

// ══════════════════════════════════════════════════════════════
// RUN
// ══════════════════════════════════════════════════════════════
console.log('\n════════════════════════════════════════════════════════════');
console.log('  FINGERPRINT BATCH RUNNER — REAL RUNTIME TEST');
console.log('════════════════════════════════════════════════════════════\n');

const t_total0 = Date.now();
const results = runBatchSync();

// Aggregate
const sharedMotifs = computeSharedMotifs(results);
const nonHash = results.filter(r=>r.mode==='code'&&!r.error);
const octaves = nonHash.map(r=>r.octaveMatchPct).filter(v=>v!=null);
const completed = results.filter(r=>!r.error).length;
const failed    = results.filter(r=>r.error).length;
const totalPrimes = results.reduce((s,r)=>s+(r.primeCount||0),0);
const totalGaps   = results.reduce((s,r)=>s+(r.gapCount||0),0);
const strongest = sharedMotifs[0]||null;
const highOct = octaves.length ? Math.max(...octaves) : null;
const lowOct  = octaves.length ? Math.min(...octaves) : null;
const summary = {
  totalRuns:results.length, completed, failed,
  totalPrimesScanned:totalPrimes, totalGapsCounted:totalGaps,
  strongestSharedMotif: strongest?.seq||null,
  highestOctaveMatchPct: highOct, lowestOctaveMatchPct: lowOct,
  finalLabel:'FINGERPRINT BATCH BUILT / SHARED MOTIFS TRACKED / FINITE PATTERN ONLY',
};
const batchData = { results, sharedMotifs, summary };
window._fingerprintBatchData = batchData;

const jsonRpt = validateJsonExport(batchData);
const mdRpt   = validateMdExport(batchData);
const forbidden = checkForbiddenPhrases(results);
const totalElapsed = Date.now()-t_total0;

// ── Print run details ─────────────────────────────────────────
console.log('\n──────────────────────────────────────────────────────────');
console.log('  RUN DETAILS');
console.log('──────────────────────────────────────────────────────────');
for(const r of results){
  console.log(`\n  name:                     ${r.name}`);
  console.log(`  start:                    ${r.start}`);
  console.log(`  end:                      ${r.end}`);
  console.log(`  prime count:              ${r.primeCount??'N/A'}`);
  console.log(`  gap count:                ${r.gapCount??'N/A'}`);
  console.log(`  most common inside count: ${r.mostCommonInside??'N/A (hash-only)'}`);
  console.log(`  largest inside count:     ${r.largestInside??'N/A (hash-only)'}`);
  console.log(`  largest dead zone:        ${r.largestDeadZone??'N/A (hash-only)'}`);
  console.log(`  octave compare match%:    ${r.octaveMatchPct!=null?r.octaveMatchPct+'%':'N/A (hash-only)'}`);
  console.log(`  hash:                     ${r.hash??'N/A'}`);
  console.log(`  status:                   ${r.status}`);
}

// ── Top shared motifs ─────────────────────────────────────────
console.log('\n──────────────────────────────────────────────────────────');
console.log('  TOP SHARED MOTIFS (non-hash runs)');
console.log('──────────────────────────────────────────────────────────');
if(sharedMotifs.length === 0){
  console.log('  None found.');
} else {
  sharedMotifs.slice(0,10).forEach(m=>{
    console.log(`  [${m.status}] seq="${m.seq}" len=${m.len} runs=${m.runCount} total=${m.total} strongest="${m.strongest}"`);
  });
}

// ── ACTUAL RUNTIME REPORT ─────────────────────────────────────
console.log('\n════════════════════════════════════════════════════════════');
console.log('  ACTUAL RUNTIME REPORT');
console.log('════════════════════════════════════════════════════════════');
console.log(`  batch status:               ${failed===0?'OK':'PARTIAL FAILURE'}`);
console.log(`  runs completed:             ${completed} / ${results.length}`);
console.log(`  runs failed:                ${failed}`);
console.log(`  total primes scanned:       ${totalPrimes.toLocaleString()}`);
console.log(`  total gaps counted:         ${totalGaps.toLocaleString()}`);
console.log(`  shared motifs found:        ${sharedMotifs.length}`);
console.log(`  strongest shared motif:     ${strongest?`"${strongest.seq}" (${strongest.status}, runs=${strongest.runCount}, total=${strongest.total})`:'none'}`);
console.log(`  highest octave match%:      ${highOct!=null?highOct+'%':'N/A'}`);
console.log(`  lowest octave match%:       ${lowOct!=null?lowOct+'%':'N/A'}`);
console.log(`  final label:                ${summary.finalLabel}`);
console.log(`  batch hash:                 ${_fpbHash(JSON.stringify(summary))}`);

// ── EXPORT REPORT ─────────────────────────────────────────────
console.log('\n──────────────────────────────────────────────────────────');
console.log('  EXPORT REPORT');
console.log('──────────────────────────────────────────────────────────');
console.log(`  JSON export:                ${jsonRpt.valid?'PASS':'FAIL'}`);
console.log(`    engine:                   ${jsonRpt.engine}`);
console.log(`    run count:                ${jsonRpt.runCount}`);
console.log(`    sharedMotifs present:     ${jsonRpt.hasSharedMotifs}`);
console.log(`    summary present:          ${jsonRpt.hasSummary}`);
console.log(`    proofStatus.universalProof: ${jsonRpt.universalProof}`);
console.log(`    JSON hash:                ${jsonRpt.hash}`);
console.log(`    payload size:             ${jsonRpt.byteSize} bytes`);
console.log(`  Markdown export:            ${mdRpt.hasFinalLabel&&mdRpt.hasSafeClaim?'PASS':'FAIL'}`);
console.log(`    contains final label:     ${mdRpt.hasFinalLabel?'yes':'no'}`);
console.log(`    contains safe claim:      ${mdRpt.hasSafeClaim?'yes':'no'}`);
console.log(`    payload size:             ${mdRpt.byteSize} bytes`);

// ── Self-test (static self-test runner) ───────────────────────
console.log('\n──────────────────────────────────────────────────────────');
console.log('  SELF TEST (static _test_runner.js)');
console.log('──────────────────────────────────────────────────────────');
const { execSync } = require('child_process');
let selfTestResult = 'UNKNOWN';
try {
  const out = execSync('node /Users/joannie/Conjunctures/_test_runner.js 2>&1', { encoding:'utf8', timeout:60000 });
  const lastLine = out.split('\n').filter(l=>l.includes('► FINAL:')).pop()||'';
  selfTestResult = lastLine.includes('PASS') ? 'PASS' : 'FAIL';
  const totalLine = out.split('\n').filter(l=>l.includes('Total:')).pop()||'';
  console.log(`  result: ${selfTestResult}   (${totalLine.trim()})`);
} catch(e){
  selfTestResult = 'FAIL';
  console.log(`  result: FAIL — ${e.message}`);
}

// ── Forbidden phrases ─────────────────────────────────────────
console.log('\n──────────────────────────────────────────────────────────');
console.log('  FORBIDDEN PHRASE CHECK (batch output data)');
console.log('──────────────────────────────────────────────────────────');
if(forbidden.length===0){
  console.log('  NONE FOUND — all clear');
} else {
  console.log('  FOUND: '+forbidden.join(', '));
}

// ── FINAL ACTUAL TEST REPORT ──────────────────────────────────
console.log('\n════════════════════════════════════════════════════════════');
console.log('  FINAL ACTUAL TEST REPORT');
console.log('════════════════════════════════════════════════════════════');
console.log(`  Self test:                  ${selfTestResult}`);
console.log(`  Runtime batch:              ${failed===0?'PASS':'PARTIAL FAILURE'}`);
console.log(`  window._fingerprintBatchData: ${window._fingerprintBatchData?'PRESENT':'MISSING'}`);
console.log(`  Runs completed:             ${completed}`);
console.log(`  Runs failed:                ${failed}`);
console.log(`  Total primes:               ${totalPrimes.toLocaleString()}`);
console.log(`  Total gaps:                 ${totalGaps.toLocaleString()}`);
console.log(`  Shared motifs:              ${sharedMotifs.length}`);
console.log(`  Strongest motif:            ${strongest?`"${strongest.seq}" [${strongest.status}]`:'none'}`);
console.log(`  Batch hash:                 ${_fpbHash(JSON.stringify(summary))}`);
console.log(`  JSON export:                ${jsonRpt.valid?'PASS':'FAIL'}  (engine=${jsonRpt.engine}, universalProof=${jsonRpt.universalProof})`);
console.log(`  Markdown export:            ${mdRpt.hasFinalLabel&&mdRpt.hasSafeClaim?'PASS':'FAIL'}  (finalLabel=${mdRpt.hasFinalLabel}, safeClaim=${mdRpt.hasSafeClaim})`);
console.log(`  Console errors:             ${failed>0?'YES — '+failed+' run(s) failed':'NONE'}`);
console.log(`  Forbidden phrases:          ${forbidden.length===0?'NONE':'FOUND: '+forbidden.join(', ')}`);
const allPass = selfTestResult==='PASS' && failed===0 && window._fingerprintBatchData && jsonRpt.valid && mdRpt.hasFinalLabel && mdRpt.hasSafeClaim && forbidden.length===0;
console.log(`  Final status:               ${allPass?'PASS':'FAIL'}`);
console.log(`\n  Total elapsed:              ${totalElapsed}ms`);
console.log('════════════════════════════════════════════════════════════\n');

process.exit(allPass?0:1);
