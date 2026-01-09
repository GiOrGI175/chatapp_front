'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AuthFormData = {
  username: string;
  email?: string;
  password: string;
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  async function postData(data: AuthFormData) {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Register failed');
    }

    return result;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postData(formData);
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
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
            name='email'
            placeholder='email'
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
          <button type='submit'>register</button>
        </form>

        <Link href='/login'>login</Link>
      </div>
    </div>
  );
}
