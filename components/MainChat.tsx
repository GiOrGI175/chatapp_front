'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

export type Message = {
  id: number;
  text: string;
  senderId: number;
  createdAt: string;
};

export type Chat = {
  id: number;
  userIds: number[];
  messages: Message[];
};

export default function MainChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [senderId, setSenderId] = useState<number | null>(null);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const item = localStorage.getItem('sender');
    if (item) setSenderId(JSON.parse(item));
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit('join-main');

    socket.on('main-message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('main-message');
    };
  }, []);

  async function getChatMessages() {
    const response = await fetch('http://localhost:3001/api/chat/mainChat');
    const result = await response.json();
    setMessages(result.messages);
  }

  useEffect(() => {
    getChatMessages();
  }, []);

  async function addMessage() {
    await fetch('http://localhost:3001/api/chat/mainChat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, senderId }),
    });

    setText('');
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    addMessage();
  };

  return (
    <div className='w-200 h-125 border flex flex-col justify-between'>
      <div className='p-2 overflow-auto'>
        {messages.map((m) => (
          <div key={m.id}>
            <b>{m.senderId}:</b> {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className='p-2'>
        <input
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          className='border w-full'
        />
        <button type='submit'>send</button>
      </form>
    </div>
  );
}
