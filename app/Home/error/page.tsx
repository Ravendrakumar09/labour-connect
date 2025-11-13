'use client';
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <p>Something went wrong!</p>
      <button onClick={() => router.back()} className="text-blue-700 hover:underline">Go to Back</button>
    </div>
  );
}
