'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const senderId =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('sender'))
      : null;

  async function getUsers() {
    const response = await fetch('http://localhost:3001/api/auth/getUsers');
    const result = await response.json();
    setUsers(result);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function addChat(receiverId) {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userIds: [senderId, receiverId],
      }),
    });

    const chat = await response.json();
  }

  return (
    <div className=' border flex gap-5 p-5'>
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
