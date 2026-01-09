import MainChat from '@/components/MainChat';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <span>hi</span>

      <MainChat />
    </div>
  );
}
