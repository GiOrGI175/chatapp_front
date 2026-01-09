import Chat from '@/components/chat';
import MainChat from '@/components/MainChat';
import PrivateChat from '@/components/PrivateChat';
import UserList from '@/components/UserList';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-col h-screen  justify-between items-center'>
      <span>chat app</span>

      <UserList />
      <div className='flex gap-5'>
        <PrivateChat />
        <MainChat />
        <Chat />
      </div>
    </div>
  );
}
