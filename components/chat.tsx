'use client';

import { useId } from '@/store/setIdStore';
import { useEffect, useState } from 'react';
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

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [senderId, setSenderId] = useState(null);
  const [text, setText] = useState('');

  const chatId = useId((state) => state.id);

  useEffect(() => {
    const item = localStorage.getItem('sender');
    if (item) {
      setSenderId(JSON.parse(item));
    }
  }, []);

  useEffect(() => {
    if (chatId) {
      getChatMessages();
    }
  }, [chatId]);

  async function getChatMessages() {
    const response = await fetch(`http://localhost:3001/api/chat/${chatId}`);
    const result = await response.json();
    setMessages(result.messages || []);
  }

  async function addMessage() {
    await fetch(`http://localhost:3001/api/chat/${chatId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, senderId }),
    });

    setText('');
    getChatMessages();
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    addMessage();
  };

  return (
    <div className='w-50 h-125 border flex flex-col justify-between'>
      <div>chat:{chatId}</div>
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
          onChange={(e) => setText(e.target.value)}
          className='border w-full'
          placeholder='Type message...'
        />
        <button type='submit'>send</button>
      </form>
    </div>
  );
}
