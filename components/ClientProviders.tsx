// components/ClientProviders.tsx
'use client';

import React from 'react';
import { Buffer } from 'buffer';

import {
  ConnectionProvider,
  WalletProvider as SolWalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

if (typeof window !== 'undefined') {
  ;(window as any).Buffer = Buffer;
}

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = 'https://api.devnet.solana.com';
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolWalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          {/* ← Add this button so the user chooses Phantom first */}
          <div style={{ textAlign: 'right', padding: 12 }}>
            <WalletMultiButton />
          </div>
          {children}
        </WalletModalProvider>
      </SolWalletProvider>
    </ConnectionProvider>
  );
}
