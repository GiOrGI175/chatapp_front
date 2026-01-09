'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  username: string;
  email?: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const senderId: number | null =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('sender') || 'null')
      : null;

  async function getUsers(): Promise<void> {
    const response = await fetch('http://localhost:3001/api/auth/getUsers');
    const result: User[] = await response.json();
    setUsers(result);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function addChat(receiverId: number): Promise<void> {
    await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userIds: [senderId, receiverId],
      }),
    });
  }

  return (
    <div className='border flex  gap-5 p-5'>
      {users
        .filter((u) => u.id !== senderId)
        .map((item) => (
          <div
            key={item.id}
            onClick={() => addChat(item.id)}
            className='cursor-pointer hover:underline border'
          >
            {item.username}
          </div>
        ))}
    </div>
  );
}
