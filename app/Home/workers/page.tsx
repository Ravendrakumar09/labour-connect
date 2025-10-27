'use client';

import { createClient } from '@/utils/supaabse/client'
import React, { useEffect, useState } from 'react'
import Loader from '@/app/components/Loader'
import Link from 'next/link'

interface Worker {
  id: string | number;
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
  workerType?: string; 
}

export default function page() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState('');
  const [search, setSearch] = useState('')

  // fetch worker Table
  useEffect(() => {
    const fetchWorkers = async () => {
      const supabase = createClient();
      try {
        const { data, error } = await supabase.from('workers').select('*')
        // console.log('workers :', data)
        if (error) {
          console.log('workers error :', error)
        } else {
          setWorkers(data as Worker[])
        }
      } catch (error) {
        console.log('worker catch error', error)
      } finally {
        setLoading(false);
      }
    }
    fetchWorkers();
  }, []);

  // for filter workers list
  const filteredWorkers = workers.filter((worker: Worker) =>
    worker.work_type?.toLowerCase().includes(search.toLowerCase())
  );

  // for search list 
  const selectWorker = (workerType: any ) => {
    console.log('select worker',workerType);
    setSearch(workerType);
    setIsOpen(false);
  }

  // loader
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader size="large" text="Loading workers..." />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='mb-8 flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Available Workers</h1>
            <p className='text-gray-600'>Find skilled workers for your projects</p>
          </div>
          <div className='relative w-64'>
            <input
              type="text"
              placeholder="Search worker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border outline-none rounded"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-sm mt-1 shadow-md z-10">
                {filteredWorkers.map((worker, index) => (
                  <div key={index} onClick={() => selectWorker(worker?.work_type)} className='pl-1 hover:bg-blue-300 transition-all'>
                    {worker.work_type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredWorkers.length > 0 ? (
           filteredWorkers.map((worker, index) => (
              <Link
                key={worker.id ?? index}
                href={`/Home/worker/${worker.id}`}
                className='block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group'
              >
                <div className='flex flex-col h-full'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>{worker.name}</h3>
                    {worker.work_type && (
                      <p className='text-sm text-gray-600 mb-2'>
                        <span className='font-medium'>Skill:</span> {worker.work_type}
                      </p>
                    )}
                    {worker.experience && (
                      <p className='text-sm text-gray-500 mb-2'>
                        <span className='font-medium'>Experience:</span> {worker.experience}
                      </p>
                    )}
                    {worker.location && (
                      <p className='text-sm text-gray-500 mb-2'>
                        <span className='font-medium'>Location:</span> {worker.location}
                      </p>
                    )}
                  </div>
                  <div className='mt-4 pt-4 border-t border-gray-100'>
                    <div className='flex justify-between items-center'>
                      <span className='text-blue-600 text-sm font-medium group-hover:text-blue-800'>
                        View Details
                      </span>
                      <span className='text-blue-600 text-lg group-hover:translate-x-1 transition-transform'>
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <div className='text-gray-400 mb-4'>
                <svg className='mx-auto h-12 w-12' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>No workers found</h3>
              <p className='text-gray-500'>There are currently no workers available. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
