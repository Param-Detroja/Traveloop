"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Map, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'dashboard', path: '/', icon: Home, label: 'Home' },
    { id: 'trips', path: '/trips', icon: Map, label: 'My Trips' },
    { id: 'search', path: '/search', icon: Compass, label: 'Search' },
    { id: 'profile', path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#0B1120]/90 backdrop-blur-md border-t border-white/10 z-50 px-6 py-3 pb-safe sm:py-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || (item.id === 'dashboard' && pathname === '/create');
          return (
            <Link
              href={item.path}
              key={item.id}
              className={`flex flex-col items-center gap-1.5 transition-colors p-2 rounded-xl ${isActive ? 'text-[#14b8a6]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
              <div className={`relative ${isActive ? 'scale-110 transition-transform' : ''}`}>
                <Icon size={24} className={isActive ? 'drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]' : ''} />
                {isActive && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#14b8a6] rounded-full"></span>}
              </div>
              <span className="text-[10px] font-medium tracking-wide mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
