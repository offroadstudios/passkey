// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

// Dynamically load the browser-only provider wrapper (no SSR)
const ClientProviders = dynamic(
  () => import('../components/ClientProviders'),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProviders>
      <Component {...pageProps} />
    </ClientProviders>
  );
}
