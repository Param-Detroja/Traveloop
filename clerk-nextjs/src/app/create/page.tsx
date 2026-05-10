"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Calendar, DollarSign, MapPin, Sparkles } from 'lucide-react';

export default function CreateTrip() {
  const [tripData, setTripData] = useState({
    name: '',
    budget: '10000',
    date: '',
    passengers: '1'
  });

  const handleSave = () => {
    if (!tripData.name) return alert("Please enter a name for your expedition.");

    const newTrip = {
      id: Date.now(),
      name: tripData.name,
      date: tripData.date || 'TBD',
      budget: `$${parseInt(tripData.budget).toLocaleString()}`,
      cities: 0,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'
    };

    const saved = localStorage.getItem('traveloop_trips');
    const existing = saved ? JSON.parse(saved) : [];
    localStorage.setItem('traveloop_trips', JSON.stringify([newTrip, ...existing]));
    
    window.location.href = '/'; 
  };

  return (
    <div className="bg-black min-h-screen w-full text-white font-sans pb-20">
      {/* Back Button */}
      <Link href="/" className="absolute top-10 left-10 flex items-center gap-2 text-white/40 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest z-50">
        <ChevronLeft size={16} /> Back to Dashboard
      </Link>

      <div className="max-w-4xl mx-auto pt-32 px-6 relative">
        {/* Background Elite Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>
        
        <header className="mb-16 text-center relative z-10">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em] mb-4 animate-in fade-in slide-in-from-top-4 duration-700">Protocol 01: Initiation</p>
          <h1 className="text-5xl md:text-7xl font-normal tracking-[0.2em] font-cinzel uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            New Expedition
          </h1>
          <div className="h-[1px] w-24 bg-white/20 mx-auto"></div>
        </header>

        <div className="space-y-12 bg-[#0A0A0A] border border-white/5 p-12 rounded-[48px] shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-1000 delay-300">
          {/* Trip Name */}
          <div className="space-y-4">
            <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-2">Expedition Name</label>
            <input 
              type="text" 
              placeholder="E.G. THE GRAND EUROPEAN ARCHIVE" 
              value={tripData.name}
              onChange={(e) => setTripData({...tripData, name: e.target.value.toUpperCase()})}
              className="w-full bg-black border border-white/10 rounded-[24px] p-8 text-2xl font-medium tracking-tight focus:border-white focus:outline-none transition-all placeholder:text-white/5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Budget */}
            <div className="space-y-4">
              <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-2 flex justify-between">
                Planned Investment <span className="text-white">${parseInt(tripData.budget).toLocaleString()}</span>
              </label>
              <div className="bg-black border border-white/10 rounded-[24px] p-8">
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="500"
                  value={tripData.budget}
                  onChange={(e) => setTripData({...tripData, budget: e.target.value})}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-4">
              <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-2">Departure Cycle</label>
              <input 
                type="text" 
                placeholder="MONTH / YEAR" 
                value={tripData.date}
                onChange={(e) => setTripData({...tripData, date: e.target.value.toUpperCase()})}
                className="w-full bg-black border border-white/10 rounded-[24px] p-8 text-lg font-medium tracking-tight focus:border-white focus:outline-none transition-all placeholder:text-white/5"
              />
            </div>
          </div>

          <div className="pt-8">
            <button 
              onClick={handleSave}
              className="w-full bg-white text-black py-10 rounded-[32px] font-black text-sm uppercase tracking-[0.4em] hover:bg-[#eee] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4"
            >
              Initialize Expedition
              <Sparkles size={20} />
            </button>
            <p className="text-center text-white/10 text-[10px] font-bold uppercase tracking-widest mt-8 italic">
              — SECURE DATA ARCHIVAL ENABLED —
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
