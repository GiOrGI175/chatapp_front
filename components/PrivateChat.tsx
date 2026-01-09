'use client';

import { useEffect, useState } from 'react';
import { useChatStore } from '@/store/chatStore';

type User = {
  id: number;
  username: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const setSelectedChatId = useChatStore((s) => s.setSelectedChatId);

  const senderId =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('sender') || 'null')
      : null;

  async function getUsers() {
    const res = await fetch('http://localhost:3001/api/auth/getUsers');
    setUsers(await res.json());
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleUserClick(receiverId: number) {
    const res = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userIds: [senderId, receiverId],
      }),
    });

    const chat = await res.json();
    setSelectedChatId(chat.id);
  }

  return (
    <div className='border flex gap-5 p-5'>
      {users
        .filter((u) => u.id !== senderId)
        .map((u) => (
          <div
            key={u.id}
            onClick={() => handleUserClick(u.id)}
            className='cursor-pointer hover:underline border'
          >
            {u.username}
          </div>
        ))}
    </div>
  );
}
