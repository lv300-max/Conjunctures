'use strict';
const fs = require('fs');
const src = fs.readFileSync('workbench.html','utf8').toLowerCase();

const FORBIDDEN = ['record beaten','proof complete','we have proved','theorem proved','conjecture proved'];
console.log('=== FORBIDDEN PHRASE SCAN ===');
FORBIDDEN.forEach(s => {
  const i = src.indexOf(s);
  if(i !== -1){
    console.log('FOUND:', JSON.stringify(s));
    console.log('  context:', JSON.stringify(src.slice(Math.max(0,i-50), i+70)));
  } else {
    console.log('ok (absent):', s);
  }
});

console.log('\n=== blockedPrime logic check ===');
function sieve(n){
  if(n<2) return [];
  const c = new Uint8Array(n+1);
  for(let i=2;i*i<=n;i++) if(!c[i]) for(let j=i*i;j<=n;j+=i) c[j]=1;
  const o=[];
  for(let i=2;i<=n;i++) if(!c[i]) o.push(i);
  return o;
}
function adm(tuple, lim){
  const primes = sieve(lim);
  const checks = primes.map(q => {
    const res = [...new Set(tuple.map(h => ((h%q)+q)%q))];
    return { q, occ: res.length, status: res.length < q ? 'PASS' : 'FAIL' };
  });
  const f = checks.find(r => r.status==='FAIL') || null;
  return { status: f ? 'FAIL' : 'PASS', blockedPrime: f ? f.q : null };
}

// [0,1,2]: q=2 check: residues {0,1} = 2 = q → FAIL at q=2
console.log('[0,1,2] blockedPrime(limit=3) =', adm([0,1,2],3).blockedPrime, '← expect 2');
// [0,2,4]: q=2: residues {0,0,0}={0}=1<2 PASS. q=3: {0,2,1}=3=q FAIL → blocked at 3
console.log('[0,2,4] blockedPrime(limit=5) =', adm([0,2,4],5).blockedPrime, '← expect 3');
// [0] always passes
console.log('[0]     status(limit=241)     =', adm([0],241).status, '← expect PASS');
// [0,2] passes all q<=241
console.log('[0,2]   status(limit=241)     =', adm([0,2],241).status, '← expect PASS');
console.log('[0,2]   checks.length(241)    =', adm([0,2],241).blockedPrime, 'blockedPrime (expect null)');
console.log('sieve(241).length             =', sieve(241).length, '← expect 53');
