'use client'
import React, { useEffect, useState } from 'react'
import Loader from '@/app/components/Loader'
import { createClient } from '@/utils/supaabse/client';

interface user {
  id: string | number;
  user: string;
  full_name: string;
  phone?: string;
  work_type?: string;
  experience?: string;
  city?: string;
  about?: string;
  location?: string;
  hourly_rate?: number;
  availability?: string;
  created_at?: string;
}

interface worker {
  id: string | number;
  user: string;
  name: string;
  phone?: string;
  work_type?: string;
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
  const [workers, setWorkers] = useState([])

  // get all users list
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
          console.log('data admin:', data)
          setLoading(false)
        }
      } catch (error) {
        console.log('error admin :', error)
      }
    }
    getAllUsers();
  }, [])

  // get all workers list
  useEffect(() => {
    setLoading(true);
    const getAllWorkers = async () => {
      const supabase = createClient();
      try {
        const { data, error } = await supabase.from('workers').select('*');
        if (error) throw new Error;
        console.log('workers data', data)
        setWorkers(data as any)
      } catch (error) {
        console.log('catch error', error)
      }
    };
    getAllWorkers();
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader size="large" text="Loading user..." />
      </div>
    );
  }

  return (
    <div className='flex flex-col pt-8 items-center text-black h-screen gap-4'>
      <p className='font-semibold'>Dashboard page</p>
      <div>
        <p>Total Users Name :</p>
        {users.map((user: user, index) => (
          <ul key={user.id}>
            <li className='space-x-1 pl-2 text-blue-500'><span className='text-black'>{index + 1}-</span>{' '}{user.full_name}</li>
          </ul>
        ))}
      </div>
      <div>
        <p>Total Workers Name:</p>
        {workers.map((worker: worker, index) => (
          <ul key={worker.id}>
            <li className='space-x-1 pl-2 text-blue-500'><span className='text-black'>{index + 1}-</span>{' '}{worker.name}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}
