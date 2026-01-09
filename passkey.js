(async function(){
  const rand = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return a };
  const challenge = rand(32);
  const createOptions = {
    challenge,
    rp: { name: 'Example' },
    user: { id: rand(16), name: 'passkey', displayName: 'passkey' },
    pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
    timeout: 60000,
    attestation: 'none'
  };
  return await navigator.credentials.get({ publicKey: { challenge, timeout: createOptions.timeout, userVerification: 'preferred' } })
    .catch(e => (e && e.name === 'NotAllowedError') ? navigator.credentials.create({ publicKey: createOptions }) : Promise.reject(e));
})();
