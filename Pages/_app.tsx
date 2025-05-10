// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider }              from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter }             from '@solana/wallet-adapter-wallets';
import { clusterApiUrl }                    from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  // 1) Connect to devnet
  const endpoint = clusterApiUrl('devnet');

  // 2) Only enable Phantom
  const wallets = [ new PhantomWalletAdapter() ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
