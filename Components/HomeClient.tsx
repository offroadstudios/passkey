// components/HomeClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet as useLazor }         from '@lazorkit/wallet';
import { extractUncompressedP256 }       from './Utils/webauthn';
import { PublicKey }                     from '@solana/web3.js';

export default function HomeClient() {
  // Phantom adapter hook
  const { publicKey: payerPubkey, signTransaction } = useSolanaWallet();

  // Lazor.kit hook
  const {
    isConnected,
    smartWalletAuthorityPubkey,
    connect,           // WebAuthn + on-chain lookup
    createSmartWallet, // will use `signTransaction` under the hood
    disconnect,
    isLoading,
    error,
  } = useLazor({
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
    // Pass the Solana signer so Lazor.kit can pay fees
    signer: { publicKey: payerPubkey!, signTransaction },
  });

  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (isConnected) {
      fetch(`${process.env.NEXT_PUBLIC_JUPITER_API}/tokens`)
        .then(res => res.json())
        .then(data => setBalance(data.length))
        .catch(console.error);
    }
  }, [isConnected]);

  const handleConnect = async () => {
    try {
      // 1) If no PDA yet, register + create it
      if (!smartWalletAuthorityPubkey) {
        // a) WebAuthn registration
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const options: PublicKeyCredentialCreationOptions = {
          challenge,
          rp: { id: window.location.hostname, name: 'My dApp' },
          user: {
            id: new TextEncoder().encode(payerPubkey!.toBase58()),
            name: payerPubkey!.toBase58(),
            displayName: 'User',
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }], // ES256
          timeout: 60000,
          attestation: 'none',
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'preferred',
          },
        };

        const credential = (await navigator.credentials.create({
          publicKey: options,
        })) as PublicKeyCredential;

        const raw = extractUncompressedP256(credential);

        // b) Deploy the on-chain PDA
        await createSmartWallet({
          secp256r1PubkeyBytes: raw,
          payer: payerPubkey!,              // Phantom pays creation fee
        });
      }

      // 2) Now WebAuthn authenticate & fetch your PDA
      await connect();
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <>
      <Head><title>Passkey dApp</title></Head>
      <main style={{ textAlign:'center', padding:40 }}>
        {!isConnected ? (
          <button
            onClick={handleConnect}
            disabled={isLoading}
            style={{ padding:'1rem 2rem' }}
          >
            {isLoading ? 'Processing…' : 'Connect via Passkey'}
          </button>
        ) : (
          <>
            <p>
              <strong>Smart Wallet PDA:</strong>{' '}
              {smartWalletAuthorityPubkey?.toBase58() ?? '—'}
            </p>
            <p>
              <strong>Your Phantom address:</strong>{' '}
              {payerPubkey?.toBase58()}
            </p>
            <p>
              <strong>Mock token count:</strong>{' '}
              {balance ?? 'Loading…'}
            </p>
            <button
              onClick={() => disconnect()}
              style={{ marginTop:20, padding:'0.5rem 1rem' }}
            >
              Disconnect
            </button>
          </>
        )}
        {error && (
          <p style={{ color:'red', marginTop:20 }}>
            Error: {String(error)}
          </p>
        )}
      </main>
    </>
  );
}
