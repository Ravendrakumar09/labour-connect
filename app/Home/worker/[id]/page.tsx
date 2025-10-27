'use client';

import React, { useEffect, useState, use } from 'react';
import { createClient } from '@/utils/supaabse/client';
import Loader from '@/app/components/Loader';
import Link from 'next/link';

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
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function WorkerDetailPage({ params }: PageProps) {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchWorker = async () => {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from('workers')
          .select('*')
          .eq('id', resolvedParams.id)
          .single();

        if (error) {
          console.error('Error fetching worker:', error);
          setError('Worker not found');
        } else {
          setWorker(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch worker details');
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      fetchWorker();
    }
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader size="large" text="Loading worker details..." />
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>Worker Not Found</h1>
            <p className='text-gray-600 mb-8'>{error || 'The worker you are looking for does not exist.'}</p>
            <Link
              href="/Home/workers"
              className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
            >
              Back to Workers List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Back Button */}
        <div className='mb-8'>
          <Link
            href="/Home/workers"
            className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium'
          >
            ← Back to Workers List
          </Link>
        </div>

        {/* Worker Details Card */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white'>
            <h1 className='text-3xl font-bold mb-2'>{worker.name}</h1>
            {worker?.work_type && (
              <p className='text-blue-100 text-lg'>{worker.work_type}</p>
            )}
          </div>

          {/* Content */}
          <div className='p-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              {/* Basic Information */}
              <div>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Basic Information</h2>
                <div className='space-y-3'>
                  {worker.phone && (
                    <div className='flex items-center'>
                      <span className='text-gray-600 pr-2'>Phone:</span>
                      <span className='text-gray-900'>{worker.phone}</span>
                    </div>
                  )}
                   {worker.work_type && (
                    <div className='flex items-center'>
                      <span className='text-gray-600 pr-2'>Skill:</span>
                      <span className='text-gray-900'>{worker.work_type}</span>
                    </div>
                  )}
                  {worker.city && (
                    <div className='flex items-center'>
                      <span className='text-gray-600 pr-2'>Location:</span>
                      <span className='text-gray-900'>{worker.city}</span>
                    </div>
                  )}
                  {worker.experience && (
                    <div className='flex items-center'>
                      <span className='text-gray-600 pr-2'>Experience:</span>
                      <span className='text-gray-900'>{worker.experience} years</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Work Details */}
              <div>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Work Details</h2>
                <div className='space-y-3'>
                  {worker.hourly_rate && (
                    <div className='flex items-center'>
                      <span className='text-gray-600 pr-2'>Rate:</span>
                      <span className='text-gray-900 font-semibold'>₹{worker.hourly_rate}/hour</span>
                    </div>
                  )}
                  {worker.availability && (
                    <div className='flex items-center'>
                      <span className='text-gray-600 pr-2'>Available:</span>
                      <span className='text-gray-900'>{worker.availability}</span>
                    </div>
                  )}
                  {worker.created_at && (
                    <div className='flex items-center'>
                      <span className='text-gray-600 pr-2'>Joined:</span>
                      <span className='text-gray-900'>
                        {new Date(worker.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {worker.about && (
              <div className='mt-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>About</h2>
                <p className='text-gray-700 leading-relaxed'>{worker.about}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className='mt-8 flex flex-col sm:flex-row gap-4'>
              <button className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
                Contact Worker
              </button>
              <button className='bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors'>
                Hire Now
              </button>
              <button className='border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors'>
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
