import Login from '@/components/Login';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';

export default function Home() {
  return <Login />;
}
