// pages/index.tsx
import dynamic from 'next/dynamic';

// HomeClient contains your entire passkey + smart-wallet flow,
// and it imports `useWallet` from '@lazorkit/wallet'.
const HomeClient = dynamic(() => import('../components/HomeClient'), {
  ssr: false,
});

export default function HomePage() {
  return <HomeClient />;
}
