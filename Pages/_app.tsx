// pages/_app.tsx
'use client';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Buffer } from 'buffer';
import dynamic from 'next/dynamic';

import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

// Polyfill Buffer for browser environments
;(window as any).Buffer = Buffer;

// Dynamically load Lazor.kit’s WalletProvider on the client only
const LazorWalletProvider = dynamic<any>(
  () =>
    import('@lazorkit/wallet').then((mod) => {
      // mod.WalletProvider is a React component accepting:
      // { rpcUrl: string; signer?: { publicKey, signTransaction }; children: React.ReactNode }
      return mod.WalletProvider;
    }),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  // 1) Solana Devnet endpoint
  const endpoint = 'https://api.devnet.solana.com';

  // 2) Only enable the Phantom wallet adapter
  const solanaWallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={solanaWallets} autoConnect={false}>
        <WalletModalProvider>
          {/* LazorWalletProvider will never load on the server */}
          <LazorWalletProvider rpcUrl={endpoint}>
            <Component {...pageProps} />
          </LazorWalletProvider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
