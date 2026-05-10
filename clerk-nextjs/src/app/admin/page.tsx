"use client";

import React from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Users, Map, Plane, Activity, ShieldAlert, ShieldCheck, BarChart3, TrendingUp, ChevronLeft, Lock } from 'lucide-react';

export default function AdminPage() {
  const { user, isLoaded } = useUser();

  // --- CLERK ADMIN GATE ---
  // In a real app, you would use user.publicMetadata.role === 'admin'
  // For the demo, we'll check if the email matches Divyesh's elite account
  const isAdmin = user?.emailAddresses.some(e => e.emailAddress === 'divyeshmrug09@gmail.com');

  if (!isLoaded) return <div className="min-h-screen bg-[#050B18] flex items-center justify-center"><div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050B18] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8 border border-red-500/20">
          <Lock size={48} />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Access Denied</h1>
        <p className="text-white/40 max-w-md mb-12">This command console is restricted to Elite Administrative Personnel only. Please return to the civilian dashboard.</p>
        <Link href="/" className="bg-[#fbbf24] text-black px-8 py-4 rounded-[28px] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // --- ADMIN DASHBOARD CONTENT ---
  const stats = [
    { label: 'Total Users', value: '1,240', icon: Users, color: 'text-teal-400' },
    { label: 'Total Trips', value: '3,850', icon: Plane, color: 'text-amber-400' },
    { label: 'Total Cities', value: '142', icon: Map, color: 'text-blue-400' },
    { label: 'Active Today', value: '86', icon: Activity, color: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen bg-[#050B18] text-white p-8 lg:p-12 font-sans">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest">
            <ChevronLeft size={16} /> Dashboard
          </Link>
          <div className="flex items-center gap-6">
            <img src="/src/assets/logo.png" className="w-16 h-16 object-contain" alt="Traveloop Logo" />
            <div>
              <p className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.6em] mb-2">Central Command (Clerk Mode)</p>
              <h1 className="text-5xl font-black tracking-tighter uppercase">Admin Console</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[24px] border border-white/5">
           <img src={user?.imageUrl} className="w-10 h-10 rounded-full border border-teal-500/30" alt="Admin" />
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest">{user?.fullName}</p>
              <p className="text-[8px] text-teal-400 font-bold uppercase tracking-[0.2em]">Sovereign Admin</p>
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#0A1120] border border-white/5 p-10 rounded-[40px] shadow-2xl group hover:border-teal-500/30 transition-all">
              <div className={`${stat.color} mb-6 bg-black/20 w-fit p-4 rounded-2xl`}>
                <Icon size={32} />
              </div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-[#0A1120] border border-white/5 p-10 rounded-[48px] shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
              <BarChart3 className="text-teal-400" />
              Trip Generation (Last 7 Days)
            </h2>
            <TrendingUp className="text-emerald-400" />
          </div>
          <div className="flex items-end justify-between h-64 gap-4 px-4">
            {[45, 62, 51, 89, 72, 95, 84].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <div 
                  className="w-full bg-gradient-to-t from-teal-500/20 to-teal-400 rounded-t-xl transition-all duration-1000 group hover:brightness-125"
                  style={{ height: `${val}%` }}
                ></div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A1120] border border-white/5 p-10 rounded-[48px] shadow-2xl">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-8">System Health</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Database</p>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Optimal</span>
            </div>
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Clerk Auth</p>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Online</span>
            </div>
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">API Engine</p>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">High Load</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/20 p-10 rounded-[48px] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <div className="bg-red-500 text-white p-4 rounded-2xl shadow-xl shadow-red-500/20">
              <ShieldAlert size={32} />
           </div>
           <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">Emergency Protocol</h3>
              <p className="text-red-400/60 text-sm">Initiate system-wide lockdown or archive purge.</p>
           </div>
        </div>
        <button className="bg-red-500 text-white px-12 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-red-500/20">
           Enter Lockdown Mode
        </button>
      </div>
    </div>
  );
}
