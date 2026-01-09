'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();

  async function postData(data) {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postData(formData);
    router.push('/');
  };

  return (
    <div className='w-full h-screen flex justify-center items-center rounded-2xl'>
      <div className='h-125 flex justify-center items-center p-5 shadow-2xl  flex-col'>
        <form className='w-full  flex flex-col'>
          <div>
            <label htmlFor=''>username</label>
            <input
              type='text'
              className='border'
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label htmlFor=''>password</label>
            <input
              type='password'
              className='border'
              onChange={onChange}
              required
            />
          </div>
          <button type='submit' onClick={onSubmit}>
            Login
          </button>
        </form>
        <Link href='/register'>register</Link>
      </div>
    </div>
  );
}
