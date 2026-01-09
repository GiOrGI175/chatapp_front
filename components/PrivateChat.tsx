'use client';

import { useId } from '@/store/setIdStore';
import { useEffect, useState } from 'react';

export default function PrivateChat() {
  const [privateChats, setPrivateChats] = useState([]);

  async function getPrivateChats() {
    const response = await fetch('http://localhost:3001/api/chat');
    const result = await response.json();

    console.log(result, 'pvchat');

    setPrivateChats(result);
  }

  useEffect(() => {
    getPrivateChats();
  }, []);

  const setId = useId((state) => state.setId);

  return (
    <div className='w-20 h-125 border flex flex-col '>
      {privateChats.map((chat, index) => (
        <div key={index} className='border w-full'>
          <button
            className='cursor-pointer w-full'
            onClick={() => setId(chat.id)}
          >
            <span className='text-[20px]'>chat: {chat.id}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
