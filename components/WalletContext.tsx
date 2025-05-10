// components/WalletContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type WalletType = {
  publicKey?: { toBase58: () => string };
  connected?: boolean;
  connect?: () => Promise<void>;
  disconnect?: () => void;
};

const WalletContext = createContext<WalletType | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletType | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // dynamic import so this never runs on the server
        const sdk = await import('@lazorkit/wallet');
        const useLazorWallet = sdk.useLazorWallet ?? sdk.default?.useLazorWallet;
        if (typeof useLazorWallet !== 'function') {
          console.error('Lazorkit: useLazorWallet not found');
          return;
        }
        const instance = useLazorWallet({
          rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
        });
        if (mounted) setWallet(instance);
      } catch (err) {
        console.error('Error loading Lazorkit wallet:', err);
      }
    })();
    return () => { mounted = false };
  }, []);

  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (ctx === undefined) {
    throw new Error('useWallet must be used inside WalletProvider');
  }
  return ctx;
};
