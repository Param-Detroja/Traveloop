"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar as CalendarIcon, List, Clock, DollarSign, MapPin, Sparkles, ChevronRight } from 'lucide-react';

export default function ItineraryView() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedDay, setSelectedDay] = useState<number | null>(1);

  const itineraryData = [
    { 
      day: 1, 
      city: 'PARIS', 
      date: 'JUN 10',
      activities: [
        { name: 'Eiffel Tower', time: '9:00 AM', cost: 25 },
        { name: 'Louvre Museum', time: '2:00 PM', cost: 20 }
      ]
    },
    { 
      day: 2, 
      city: 'PARIS', 
      date: 'JUN 11',
      activities: [
        { name: 'Seine River Cruise', time: '11:00 AM', cost: 15 },
        { name: 'Montmartre Walk', time: '4:00 PM', cost: 0 }
      ]
    },
    { 
      day: 4, 
      city: 'ROME', 
      date: 'JUN 13',
      activities: [
        { name: 'Colosseum', time: '10:00 AM', cost: 30 },
        { name: 'Vatican City', time: '3:00 PM', cost: 25 }
      ]
    },
    { 
      day: 7, 
      city: 'DUBAI', 
      date: 'JUN 16',
      activities: [
        { name: 'Burj Khalifa', time: '11:00 AM', cost: 40 },
        { name: 'Desert Safari', time: '5:00 PM', cost: 80 }
      ]
    }
  ];

  const calculateDayTotal = (activities: any[]) => activities.reduce((sum, act) => sum + act.cost, 0);

  return (
    <div className="bg-[#050B18] min-h-screen w-full text-white font-sans pb-32 relative">
      
      {/* Header Area */}
      <div className="max-w-5xl mx-auto pt-20 px-6">
        <Link href="/trips" className="flex items-center gap-2 text-[#2dd4bf]/60 hover:text-[#2dd4bf] transition-all uppercase text-[10px] font-black tracking-widest mb-10">
          <ChevronLeft size={16} /> Back to Planner
        </Link>

        <header className="flex justify-between items-end mb-16">
          <div>
            <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Live Itinerary</p>
            <h1 className="text-4xl md:text-5xl font-normal tracking-[0.1em] font-cinzel uppercase text-white">
              Expedition View
            </h1>
          </div>
          
          {/* Toggle */}
          <div className="flex bg-[#0A1120] p-1.5 rounded-2xl border border-white/5 shadow-2xl">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-[#2dd4bf] text-black shadow-lg shadow-[#2dd4bf]/20' : 'text-white/40 hover:text-white'}`}
            >
              <List size={14} /> List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'calendar' ? 'bg-[#2dd4bf] text-black shadow-lg shadow-[#2dd4bf]/20' : 'text-white/40 hover:text-white'}`}
            >
              <CalendarIcon size={14} /> Calendar
            </button>
          </div>
        </header>

        {viewMode === 'list' ? (
          <div className="space-y-12">
            {itineraryData.map((dayData) => (
              <div key={dayData.day} className="relative pl-12 border-l border-white/10 animate-in slide-in-from-bottom-10 duration-700">
                {/* Timeline Marker */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.5)]"></div>
                
                <div className="mb-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">
                        {dayData.city} — DAY {dayData.day}
                      </h3>
                      <p className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-widest italic">{dayData.date}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-1">Day Spend</p>
                       <p className="text-xl font-black text-[#fbbf24]">${calculateDayTotal(dayData.activities)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dayData.activities.map((activity, idx) => (
                    <div key={idx} className="bg-[#0A1120] border border-white/5 rounded-[32px] p-8 hover:border-[#2dd4bf]/30 transition-all group shadow-xl">
                       <div className="flex justify-between items-start mb-4">
                          <div className="bg-[#2dd4bf]/10 text-[#2dd4bf] p-3 rounded-2xl group-hover:bg-[#2dd4bf] group-hover:text-black transition-all">
                             <Clock size={18} />
                          </div>
                          <span className="text-[#fbbf24] font-black text-sm">${activity.cost}</span>
                       </div>
                       <h4 className="text-xl font-bold text-white uppercase tracking-tight mb-2">{activity.name}</h4>
                       <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Calendar Grid Placeholder */}
                <div className="bg-[#0A1120] border border-white/5 rounded-[48px] p-10 shadow-2xl">
                   <div className="flex justify-between items-center mb-10">
                      <h3 className="text-2xl font-black uppercase tracking-widest">JUNE 2025</h3>
                      <div className="flex gap-4">
                         <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10"><ChevronLeft size={18}/></button>
                         <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10"><ChevronRight size={18}/></button>
                      </div>
                   </div>
                   <div className="grid grid-cols-7 gap-4 mb-8">
                      {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center text-white/20 text-[10px] font-bold">{d}</div>)}
                      {Array.from({length: 30}).map((_, i) => {
                        const day = i + 1;
                        const hasActivity = itineraryData.some(d => d.day === day);
                        return (
                          <button 
                            key={i} 
                            onClick={() => hasActivity && setSelectedDay(day)}
                            className={`h-12 rounded-xl text-xs font-bold transition-all ${hasActivity ? 'bg-[#2dd4bf]/20 text-[#2dd4bf] border border-[#2dd4bf]/40 hover:bg-[#2dd4bf] hover:text-black shadow-[0_0_20px_rgba(45,212,191,0.2)]' : 'text-white/10 hover:bg-white/5'}`}
                          >
                            {day}
                          </button>
                        );
                      })}
                   </div>
                   <div className="flex gap-6 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[#2dd4bf]"></div>
                         <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Expedition Days</span>
                      </div>
                   </div>
                </div>

                {/* Day Details */}
                <div className="bg-[#0A1120] border border-white/5 rounded-[48px] p-10 shadow-2xl">
                   {selectedDay ? (
                      <div className="animate-in fade-in slide-in-from-right-10 duration-500">
                         <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">DAY {selectedDay}</h3>
                         <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-widest italic mb-10">Elite Schedule</p>
                         
                         <div className="space-y-6">
                            {itineraryData.find(d => d.day === selectedDay)?.activities.map((act, i) => (
                               <div key={i} className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                                  <div className="text-[#2dd4bf]"><Clock size={24}/></div>
                                  <div>
                                     <h4 className="font-bold text-white uppercase tracking-tight">{act.name}</h4>
                                     <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{act.time}</p>
                                  </div>
                                  <div className="ml-auto text-[#fbbf24] font-black">${act.cost}</div>
                               </div>
                            )) || <p className="text-white/20 uppercase tracking-widest text-sm italic">Rest day. No protocols scheduled.</p>}
                         </div>
                      </div>
                   ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                         <CalendarIcon size={64} className="mb-6" />
                         <p className="uppercase tracking-[0.3em] font-black text-sm">Select an active node to view protocols</p>
                      </div>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
