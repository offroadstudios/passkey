// components/HomeClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet as useLazorWallet }  from '@lazorkit/wallet';

import { extractUncompressedP256 } from '../utils/webauthn';

export default function HomeClient() {
  // Phantom wallet state (connected when WalletMultiButton has done its job)
  const { publicKey: payerPubkey, connected: isPhantomConnected } =
    useSolanaWallet();

  // Lazor.kit wallet hook
  const {
    isConnected: isPasskeyConnected,
    smartWalletAuthorityPubkey,
    connect: connectPasskey,
    createSmartWallet,
    disconnect: disconnectPasskey,
    isLoading: passkeyLoading,
    error: passkeyError,
  } = useLazorWallet({
    rpcUrl: 'https://api.devnet.solana.com',
    signer: {
      publicKey: payerPubkey!,
      signTransaction: async (tx) => {
        tx.feePayer = payerPubkey!;
        return tx;
      },
    },
  });

  const [processing, setProcessing] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (isPasskeyConnected) {
      fetch('https://quote-api.jup.ag/v6/tokens')
        .then((r) => r.json())
        .then((d) => setBalance(d.length))
        .catch(console.error);
    }
  }, [isPasskeyConnected]);

  const handleAuth = async () => {
    setProcessing(true);
    try {
      // make sure Phantom is connected first
      if (!isPhantomConnected) {
        throw new Error('Please connect your Phantom wallet first.');
      }

      // 1) First‐time: register & create the PDA
      if (!smartWalletAuthorityPubkey) {
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const pubKeyOptions: PublicKeyCredentialCreationOptions = {
          challenge,
          rp: { id: window.location.hostname, name: 'My dApp' },
          user: {
            id: new TextEncoder().encode(payerPubkey!.toBase58()),
            name: payerPubkey!.toBase58(),
            displayName: 'Demo User',
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          timeout: 60000,
          attestation: 'none',
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'preferred',
          },
        };

        const credential = (await navigator.credentials.create({
          publicKey: pubKeyOptions,
        })) as PublicKeyCredential;

        const rawPubkey = extractUncompressedP256(credential);

        await createSmartWallet({
          secp256r1PubkeyBytes: rawPubkey,
          payer: payerPubkey!,
        });
      }

      // 2) Then authenticate/log in via your passkey
      await connectPasskey();
    } catch (err) {
      console.error('Auth error:', err);
      alert((err as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Passkey‐Secured Smart Wallet</title>
      </Head>
      <main style={{ textAlign: 'center', padding: 40 }}>
        <button
          onClick={handleAuth}
          disabled={processing || passkeyLoading}
          style={{ padding: '1rem 2rem', fontSize: '1rem' }}
        >
          {processing || passkeyLoading
            ? 'Working…'
            : smartWalletAuthorityPubkey
            ? 'Login with Passkey'
            : 'Register & Connect via Passkey'}
        </button>

        {isPasskeyConnected && (
          <>
            <p>
              <strong>Phantom:</strong> {payerPubkey?.toBase58()}
            </p>
            <p>
              <strong>Smart Wallet PDA:</strong>{' '}
              {smartWalletAuthorityPubkey?.toBase58()}
            </p>
            <p>
              <strong>Mock tokens:</strong> {balance ?? 'Loading…'}
            </p>
            <button onClick={() => disconnectPasskey()}>
              Disconnect Passkey
            </button>
          </>
        )}

        {passkeyError && (
          <p style={{ color: 'red', marginTop: 20 }}>
            Error: {String(passkeyError)}
          </p>
        )}
      </main>
    </>
  );
}
