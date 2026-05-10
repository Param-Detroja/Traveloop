"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, ChevronRight, Plus, Star, Sparkles, Zap, DollarSign, Wallet, Navigation, User } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [showIntro, setShowIntro] = useState(false);
  const firstName = user?.firstName || 'Traveler';
  const profileImageUrl = user?.imageUrl || 'https://i.pravatar.cc/150?img=32';

  const [recentTrips, setRecentTrips] = useState<any[]>([]);

  useEffect(() => {
    const hasShownIntro = sessionStorage.getItem('traveloop_intro_shown');
    
    if (!hasShownIntro && isLoaded && user) {
      setShowIntro(true);
      sessionStorage.setItem('traveloop_intro_shown', 'true');
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const saved = localStorage.getItem('traveloop_trips');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRecentTrips(parsed.slice(0, 3)); 
      } catch (e) {
        console.error("Could not parse trips", e);
      }
    } else {
      setRecentTrips([
        { id: 1, name: 'Euro Trip 2026', date: 'Jun 10 - Jun 25', cities: 4, budget: '$12,400', image: '/images/cities/paris.jpg' },
        { id: 2, name: 'Maldives Getaway', date: 'Oct 05 - Oct 12', cities: 1, budget: '$8,200', image: '/images/cities/bali.jpg' },
        { id: 3, name: 'Japan Winter', date: 'Dec 15 - Jan 02', cities: 3, budget: '$15,000', image: '/images/cities/tokyo.jpg' },
      ]);
    }
  }, []);

  const recommended = [
    { id: 1, city: 'Sushi Archive', country: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80' },
    { id: 2, city: 'Pizza Artisanal', country: 'Naples, Italy', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
    { id: 3, city: 'Chicken Tikka', country: 'Delhi, India', image: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&w=800&q=80' },
    { id: 4, city: 'Fish & Chips', country: 'London, UK', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80' },
    { id: 5, city: 'Pasta Prime', country: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80' },
    { id: 6, city: 'Dim Sum', country: 'Hong Kong', image: 'https://images.unsplash.com/photo-1496116214483-b4342a04b7bb?auto=format&fit=crop&w=800&q=80' },
  ];

  if (!isLoaded) return null;

  return (
    <div className="bg-black min-h-screen w-full text-white pb-24 relative overflow-x-hidden font-sans">
      
      {/* MINIMALIST CINEMATIC INTRO - Strictly B&W */}
      {showIntro && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-out fade-out duration-1000 delay-[2500ms] fill-mode-forwards">
          <div className="relative flex flex-col items-center max-w-5xl px-6 text-center">
            <div className="mb-12 w-24 h-24 md:w-32 md:h-32 animate-in fade-in zoom-in-95 duration-1000">
               <img src="/images/logo.png" alt="Traveloop Logo" className="w-full h-full object-contain filter invert opacity-90" />
            </div>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-forwards">
               <h2 className="text-4xl md:text-6xl font-normal text-white tracking-[0.2em] font-cinzel leading-tight uppercase">
                  Welcome {firstName}
               </h2>
               <div className="h-[1px] w-24 bg-white/20 mx-auto"></div>
               <h3 className="text-xl md:text-2xl font-normal text-white/60 tracking-[0.4em] font-cinzel uppercase">
                  to Traveloop
               </h3>
               <p className="pt-8 text-white/30 text-[10px] font-bold tracking-[0.6em] uppercase">
                  Where elite journeys begin
               </p>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD CONTENT - ELITE NEON COLOR TOUCHES */}
      <div className={`max-w-7xl mx-auto px-6 lg:px-12 pt-10 transition-all duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <img src="/src/assets/logo.png" className="w-24 h-24 object-contain drop-shadow-[0_0_30px_rgba(0,243,255,0.4)]" alt="Traveloop Logo" />
            <div>
              <p className="text-[#00f3ff] text-[10px] font-bold uppercase tracking-[0.4em] mb-2 italic drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">Account Active: Elite Tier</p>
              <h1 className="text-4xl font-bold text-white tracking-tight uppercase">Hello, <span className="text-[#00f3ff] drop-shadow-[0_0_20px_rgba(0,243,255,0.6)]"> {firstName} </span></h1>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#00f3ff] shadow-[0_0_30px_rgba(0,243,255,0.2)] rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src={profileImageUrl} alt="User Profile" className="w-full h-full object-cover" />
          </div>
        </header>

        {/* UPGRADED BUDGET HIGHLIGHTS - NEON BLUE VIBE */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
           <div className="bg-[#0A0A0A] border-2 border-[#00f3ff]/10 p-10 rounded-[40px] hover:border-[#00f3ff]/50 hover:bg-[#00f3ff]/5 transition-all group relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.05)]">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00f3ff]/10 rounded-full blur-2xl group-hover:bg-[#00f3ff]/20 transition-all"></div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 group-hover:text-[#00f3ff] transition-colors">Total Value</p>
              <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-[#00f3ff] transition-colors">$35,600</h3>
           </div>
           
           <div className="bg-[#0A0A0A] border-2 border-[#00f3ff]/10 p-10 rounded-[40px] hover:border-[#00f3ff]/50 hover:bg-[#00f3ff]/5 transition-all group relative overflow-hidden">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 group-hover:text-[#00f3ff] transition-colors">Active Nodes</p>
              <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-[#00f3ff] transition-colors">03</h3>
           </div>

           <div className="bg-[#0A0A0A] border-2 border-[#00f3ff]/10 p-10 rounded-[40px] hover:border-[#00f3ff]/50 hover:bg-[#00f3ff]/5 transition-all group relative overflow-hidden">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 group-hover:text-[#00f3ff] transition-colors">Avg. Invest</p>
              <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-[#00f3ff] transition-colors">$11.8k</h3>
           </div>

           <div className="bg-[#0A0A0A] border-2 border-[#fbbf24]/10 p-10 rounded-[40px] hover:border-[#fbbf24]/50 hover:bg-[#fbbf24]/5 transition-all group relative overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.05)]">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 group-hover:text-[#fbbf24] transition-colors">Tier</p>
              <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-[#fbbf24] transition-colors">ELITE</h3>
           </div>
        </section>

        {/* QUICK NAVIGATION CARDS - NEON ACCENTS */}
        <section className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-20">
           <Link href="/search" className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[32px] hover:border-[#00f3ff]/40 hover:bg-[#00f3ff]/5 transition-all group flex flex-col items-center text-center">
              <div className="bg-[#00f3ff]/5 text-[#00f3ff] p-4 rounded-2xl mb-4 group-hover:bg-[#00f3ff] group-hover:text-black transition-all drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                <MapPin size={24} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">Explore</h4>
           </Link>
           <Link href="/trips" className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[32px] hover:border-[#00f3ff]/40 hover:bg-[#00f3ff]/5 transition-all group flex flex-col items-center text-center">
              <div className="bg-[#00f3ff]/5 text-[#00f3ff] p-4 rounded-2xl mb-4 group-hover:bg-[#00f3ff] group-hover:text-black transition-all drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                <Calendar size={24} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">My Trips</h4>
           </Link>
           <Link href="/packing" className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[32px] hover:border-[#00f3ff]/40 hover:bg-[#00f3ff]/5 transition-all group flex flex-col items-center text-center">
              <div className="bg-[#00f3ff]/5 text-[#00f3ff] p-4 rounded-2xl mb-4 group-hover:bg-[#00f3ff] group-hover:text-black transition-all drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                <Sparkles size={24} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">Packing</h4>
           </Link>
           <Link href="/notes" className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[32px] hover:border-[#00f3ff]/40 hover:bg-[#00f3ff]/5 transition-all group flex flex-col items-center text-center">
              <div className="bg-[#00f3ff]/5 text-[#00f3ff] p-4 rounded-2xl mb-4 group-hover:bg-[#00f3ff] group-hover:text-black transition-all drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                <Calendar size={24} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">Notes</h4>
           </Link>
           <Link href="/share" className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[32px] hover:border-[#fbbf24]/40 hover:bg-[#fbbf24]/5 transition-all group flex flex-col items-center text-center">
              <div className="bg-[#fbbf24]/5 text-[#fbbf24] p-4 rounded-2xl mb-4 group-hover:bg-[#fbbf24] group-hover:text-black transition-all drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                <Zap size={24} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">Share</h4>
           </Link>
           <Link href="/profile" className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[32px] hover:border-white/40 hover:bg-white/5 transition-all group flex flex-col items-center text-center">
              <div className="bg-white/5 text-white/60 p-4 rounded-2xl mb-4 group-hover:bg-white group-hover:text-black transition-all">
                <User size={24} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">Profile</h4>
           </Link>
        </section>

        {/* PREMIUM CREATE TRIP BUTTON - NEON GLOW ONLY ON HOVER */}
        <Link 
          href="/create"
          className="w-full relative overflow-hidden bg-white border-4 border-black rounded-[48px] p-12 mb-20 shadow-[0_0_60px_rgba(255,255,255,0.1)] group transition-all transform hover:-translate-y-2 block"
        >
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[#00f3ff]/5 -skew-x-12 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-700"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="text-left">
              <div className="flex items-center gap-3 text-black/40 mb-3 font-black text-[10px] tracking-[0.5em] uppercase">
                <Sparkles size={16} />
                Elite Access
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-1 tracking-tighter uppercase leading-none">
                Start New Expedition
              </h2>
              <p className="text-black/60 font-medium text-lg italic font-cinzel">Where your next legacy begins.</p>
            </div>
            <div className="bg-black text-white p-8 rounded-full shadow-2xl group-hover:bg-[#00f3ff] group-hover:text-black transition-all duration-500">
              <Plus size={40} strokeWidth={4} />
            </div>
          </div>
        </Link>

        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Active Portfolios</h2>
            <Link href="/trips" className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white/20 pb-1 hover:text-[#00f3ff] hover:border-[#00f3ff] transition-all">Access All</Link>
          </div>
          
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-12 pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 hide-scrollbar snap-x snap-mandatory">
            {recentTrips.map((trip) => (
              <Link href="/trips" key={trip.id} className="min-w-[360px] lg:min-w-0 bg-[#080808] border border-white/5 rounded-[56px] overflow-hidden hover:border-[#00f3ff]/40 transition-all duration-700 snap-center group block shadow-2xl">
                <div className="h-64 relative overflow-hidden">
                  <img src={trip.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute top-8 right-8 z-20 bg-black/80 backdrop-blur-3xl px-6 py-3 rounded-full border border-[#00f3ff]/30 text-xs font-black tracking-widest text-[#00f3ff] shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                    {trip.budget || '$10k+'}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="font-bold text-3xl text-white mb-2 uppercase tracking-tighter group-hover:text-[#00f3ff] transition-all">{trip.name}</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{trip.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Gourmet Collection</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {recommended.map((dest) => (
              <Link href="/search" key={dest.id} className="relative h-96 rounded-[56px] overflow-hidden group block border border-white/5 hover:border-[#00f3ff]/30 transition-all">
                <img src={dest.image} className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <h3 className="text-3xl font-normal text-white uppercase tracking-wider mb-2 font-cinzel group-hover:text-[#00f3ff] transition-colors">{dest.city}</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] font-cinzel">{dest.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Elite Activities Archive</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { id: 1, title: 'Private Yachting', loc: 'Monaco', image: 'https://images.unsplash.com/photo-1567891299233-da391a30ca00?auto=format&fit=crop&w=800&q=80' },
              { id: 2, title: 'Hot Air Ballooning', loc: 'Cappadocia', image: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80' },
              { id: 3, title: 'Desert Safari', loc: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=800&q=80' },
              { id: 4, title: 'Aurora Protocol', loc: 'Iceland', image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80' },
              { id: 5, title: 'Deep Sea Archive', loc: 'Maldives', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
              { id: 6, title: 'Alpine Heli-Ski', loc: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80' },
            ].map((act) => (
              <Link href="/search" key={act.id} className="relative h-[450px] rounded-[56px] overflow-hidden group block border border-white/5 hover:border-[#fbbf24]/30 transition-all">
                <img src={act.image} className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-[1px] w-8 bg-[#fbbf24]/50"></div>
                    <span className="text-[#fbbf24] text-[8px] font-bold uppercase tracking-[0.4em]">Activity Node</span>
                  </div>
                  <h3 className="text-4xl font-normal text-white uppercase tracking-wider mb-2 font-cinzel group-hover:text-[#fbbf24] transition-colors">{act.title}</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] font-cinzel">{act.loc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .stroke-text-blue {
          -webkit-text-stroke: 1.5px rgba(0, 243, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
