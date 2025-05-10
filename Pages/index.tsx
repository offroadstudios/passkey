
// File: pages/index.tsx
import dynamic from 'next/dynamic';
const HomeClient = dynamic(() => import('../Components/HomeClient'), { ssr: false });
export default function IndexPage() {
  return <HomeClient />;
}