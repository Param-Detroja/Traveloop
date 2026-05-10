"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/profile');
  }, [router]);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white font-sans uppercase text-[10px] font-black tracking-[0.5em] animate-pulse">
      Syncing Elite Config...
    </div>
  );
}
