'use client'
import React, { useEffect, useState } from 'react'
import Loader from '@/app/components/Loader'
import { createClient } from '@/utils/supaabse/client';

interface user {
  id: string | number;
  user: string;
  full_name: string;
  phone?: string;
  skills?: string;
  experience?: string;
  city?: string;
  about?: string;
  location?: string;
  hourly_rate?: number;
  availability?: string;
  created_at?: string;
}

export default function page() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([])

  useEffect(() => {
    setLoading(true)
    const getAllUsers = async () => {
      const supabase = createClient();
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (error) {
          console.log('users data admin :', error)
        } else {
          setUsers(data as any)
          console.log('data admin:',data)
          setLoading(false)
        }
      } catch (error) {
        console.log('error admin :', error)
      }
    }
    getAllUsers();
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader size="large" text="Loading user..." />
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center text-black h-screen gap-4'>
      Dashboard page
      <div className='flex '>
        <p>Users :</p>
        {users.map((user: user) => (
          <div key={user.id}>
            <p className='space-x-1'>Name : {user.full_name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
