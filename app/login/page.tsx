'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();

  async function postData(data) {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const result = await response.json();
    localStorage.setItem('sender', JSON.stringify(result.user.id));
    return result;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await postData(formData);
    router.push('/');
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='p-5 shadow-2xl flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col gap-2'>
          <input
            name='username'
            placeholder='username'
            className='border'
            onChange={onChange}
            required
          />
          <input
            name='password'
            type='password'
            placeholder='password'
            className='border'
            onChange={onChange}
            required
          />
          <button type='submit'>Login</button>
        </form>
        <Link href='/register'>register</Link>
      </div>
    </div>
  );
}
