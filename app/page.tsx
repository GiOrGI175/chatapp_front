import Chat from '@/components/chat';
import MainChat from '@/components/MainChat';
import PrivateChat from '@/components/PrivateChat';
import UserList from '@/components/UserList';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  return redirect('/register');
}
