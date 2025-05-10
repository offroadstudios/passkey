// components/HomeClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useWallet as useLazorWallet }  from '@lazorkit/wallet';

import { extractUncompressedP256 } from './Utils/webauthn';

export default function HomeClient() {
  // 1) Phantom adapter
  const {
    publicKey: payerPubkey,
    connect: connectPhantom,
    disconnect: disconnectPhantom,
    connected: isPhantomConnected,
  } = useSolanaWallet();

  // 2) Lazor.kit adapter
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
    // Phantom as the fee-payer/signer
    signer: {
      publicKey: payerPubkey!,
      signTransaction: async (tx) => {
        // ensure Phantom is connected
        if (!isPhantomConnected) {
          await connectPhantom();
        }
        tx.feePayer = payerPubkey!;
        const signed = await connectPhantom().then(() => tx);
        return signed;
      },
    },
  });

  const [processing, setProcessing] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  // load mock balance from Jupiter once passkey wallet connects
  useEffect(() => {
    if (isPasskeyConnected) {
      fetch('https://quote-api.jup.ag/v6/tokens')
        .then((r) => r.json())
        .then((d) => setBalance(d.length))
        .catch(console.error);
    }
  }, [isPasskeyConnected]);

  const handleFullFlow = async () => {
    setProcessing(true);
    try {
      // 1) Connect Phantom so we have a payer
      if (!isPhantomConnected) {
        await connectPhantom();
      }

      // 2) If the smart wallet PDA doesn’t exist yet, register & create it
      if (!smartWalletAuthorityPubkey) {
        // a) WebAuthn registration
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const pubKeyOptions: PublicKeyCredentialCreationOptions = {
          challenge,
          rp: { id: window.location.hostname, name: 'My dApp' },
          user: {
            id: new TextEncoder().encode(payerPubkey!.toBase58()),
            name: payerPubkey!.toBase58(),
            displayName: 'User',
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

      // 3) Finally authenticate or re-authenticate via passkey
      await connectPasskey();
    } catch (err) {
      console.error('Full flow error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Passkey-Secured Smart Wallet</title>
      </Head>
      <main style={{ textAlign: 'center', padding: 40 }}>
        {!isPhantomConnected ? (
          <button onClick={() => connectPhantom()} style={{ margin: '1rem', padding: '0.75rem 1.5rem' }}>
            Connect Phantom
          </button>
        ) : (
          <p>
            Phantom: {payerPubkey?.toBase58()}{' '}
            <button onClick={() => disconnectPhantom()}>Disconnect</button>
          </p>
        )}

        <button
          onClick={handleFullFlow}
          disabled={processing || passkeyLoading || !isPhantomConnected}
          style={{ margin: '1rem', padding: '1rem 2rem', fontSize: '1rem' }}
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
              <strong>Smart Wallet PDA:</strong>{' '}
              {smartWalletAuthorityPubkey?.toBase58()}
            </p>
            <p>
              <strong>Mock token count:</strong> {balance ?? 'Loading…'}
            </p>
            <button onClick={() => disconnectPasskey()}>Disconnect Passkey</button>
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
