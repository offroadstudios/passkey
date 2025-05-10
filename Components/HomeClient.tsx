// File: components/HomeClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useWallet } from '@lazorkit/wallet';
import { extractUncompressedP256 } from './Utils/webauthn';

export default function HomeClient() {
  const {
    isConnected,
    smartWalletAuthorityPubkey,
    createSmartWallet,
    connect,
    isLoading,
    error,
    disconnect,
  } = useWallet();

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (isConnected) {
      fetch(`${process.env.NEXT_PUBLIC_JUPITER_API}/tokens`)
        .then((res) => res.json())
        .then((data) => setBalance(data.length))
        .catch(console.error);
    }
  }, [isConnected]);

  const handleAuth = async () => {
    setLoading(true);
    try {
      const storedCred = localStorage.getItem('passkeyCredentialId');
      if (!storedCred) {
        // First-time registration
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);
        const pubKeyOptions: PublicKeyCredentialCreationOptions = {
          challenge,
          rp: { id: window.location.hostname, name: 'My App' },
          user: {
            id: new TextEncoder().encode('user@example.com'),
            name: 'user@example.com',
            displayName: 'Example User',
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          timeout: 60000,
          attestation: 'none',
         
        };
        const credential = (await navigator.credentials.create({ publicKey: pubKeyOptions })) as PublicKeyCredential;
        const rawPubkey = extractUncompressedP256(credential);
        await createSmartWallet({ pubkey: rawPubkey, credentialId: credential.id });
        localStorage.setItem('passkeyCredentialId', credential.id);
      }
      // Login on subsequent visits
      await connect();
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>LazorKit Passkey dApp</title>
      </Head>
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        {!isConnected ? (
          <button
            onClick={handleAuth}
            disabled={loading || isLoading}
            style={{ padding: '1rem 2rem', fontSize: '1rem' }}
          >
            {loading || isLoading ? 'Processing...' : 'Connect via Passkey'}
          </button>
        ) : (
          <>
            <p>Smart Wallet: {smartWalletAuthorityPubkey}</p>
            <p>Connected ✅</p>
            <p>Mock token count: {balance ?? 'Loading...'}</p>
            <button
              onClick={() => disconnect()}
              style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
            >
              Disconnect
            </button>
          </>
        )}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </main>
    </>
  );
}
