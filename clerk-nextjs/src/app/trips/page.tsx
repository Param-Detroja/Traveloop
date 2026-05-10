"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Trash2, GripVertical, Calendar, MapPin, Sparkles, X, Check, Utensils, Moon } from 'lucide-react';

export default function ItineraryBuilder() {
  const [tripName] = useState("EUROPE ELITE 2025");
  const [stops, setStops] = useState([
    { 
      id: 1, 
      city: 'PARIS', 
      arrival: '2025-06-10', 
      departure: '2025-06-15', 
      activities: ['Eiffel Tower', 'Louvre Museum', 'Seine Cruise'] 
    },
    { 
      id: 2, 
      city: 'ROME', 
      arrival: '2025-06-16', 
      departure: '2025-06-20', 
      activities: ['Colosseum', 'Vatican City', 'Pasta Class'] 
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStop, setNewStop] = useState({ city: '', arrival: '', departure: '', activityInput: '' });
  const [currentActivities, setCurrentActivities] = useState<string[]>([]);

  const dummyCities = ['PARIS', 'ROME', 'TOKYO', 'MONACO', 'SANTORINI'];

  const handleAddActivity = () => {
    if (newStop.activityInput) {
      setCurrentActivities([...currentActivities, newStop.activityInput.toUpperCase()]);
      setNewStop({ ...newStop, activityInput: '' });
    }
  };

  const handleAddStop = () => {
    if (!newStop.city || !newStop.arrival) return;
    const stopToAdd = {
      id: Date.now(),
      city: newStop.city,
      arrival: newStop.arrival,
      departure: newStop.departure,
      activities: currentActivities
    };
    setStops([...stops, stopToAdd]);
    setShowAddForm(false);
    setNewStop({ city: '', arrival: '', departure: '', activityInput: '' });
    setCurrentActivities([]);
  };

  const removeStop = (id: number) => {
    setStops(stops.filter(s => s.id !== id));
  };

  return (
    <div className="bg-[#050B18] min-h-screen w-full text-white font-sans pb-32 relative overflow-x-hidden">
      
      {/* Header Area */}
      <div className="max-w-5xl mx-auto pt-20 px-6">
        <Link href="/" className="flex items-center gap-2 text-[#2dd4bf]/60 hover:text-[#2dd4bf] transition-all uppercase text-[10px] font-black tracking-widest mb-10">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <header className="mb-16">
          <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Itinerary Planning</p>
          <h1 className="text-4xl md:text-6xl font-normal tracking-[0.1em] font-cinzel uppercase mb-4 text-white">
            Build Your Itinerary
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-[#2dd4bf] tracking-tighter uppercase italic opacity-80">
            {tripName}
          </h2>
        </header>

        {/* Stops List */}
        <div className="space-y-8 mb-20">
          {stops.map((stop) => (
            <div key={stop.id} className="bg-[#0A1120] border-l-4 border-[#fbbf24] border border-white/5 rounded-[32px] p-8 flex items-center gap-6 shadow-2xl group animate-in slide-in-from-left-10 duration-500">
               <div className="text-white/20 cursor-grab active:cursor-grabbing">
                  <GripVertical size={24} />
               </div>
               
               <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-3">
                           {stop.city}
                           <Sparkles size={16} className="text-[#fbbf24]" />
                        </h3>
                        <p className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-widest mt-1">
                           {stop.arrival} — {stop.departure}
                        </p>
                     </div>
                     <button onClick={() => removeStop(stop.id)} className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
                        <Trash2 size={20} />
                     </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                     {stop.activities.map((act, i) => (
                        <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60 uppercase tracking-wider">
                           {act}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Food Stops Section */}
        <section className="mb-20">
           <div className="flex justify-between items-end mb-10">
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-4">
                 <Utensils className="text-[#fbbf24]" />
                 Gourmet Protocols
              </h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">4K Culinary Mapping</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0A1120] border border-white/5 p-10 rounded-[40px] flex items-center gap-6 group hover:border-[#fbbf24]/30 transition-all">
                 <div className="w-24 h-24 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white uppercase">MICHELIN DINING</h4>
                    <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-widest mt-1">RESERVED: 8:00 PM</p>
                 </div>
                 <div className="ml-auto bg-white/5 p-4 rounded-2xl text-white/20 group-hover:text-[#fbbf24] transition-colors">
                    <Check size={20} />
                 </div>
              </div>
              <div className="bg-[#0A1120] border border-white/5 p-10 rounded-[40px] flex items-center gap-6 group hover:border-[#fbbf24]/30 transition-all">
                 <div className="w-24 h-24 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white uppercase">STREET ARCHIVE</h4>
                    <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-widest mt-1">DISCOVERY MODE</p>
                 </div>
                 <div className="ml-auto bg-white/5 p-4 rounded-2xl text-white/20 group-hover:text-[#fbbf24] transition-colors">
                    <Check size={20} />
                 </div>
              </div>
           </div>
        </section>

        {/* Evening Protocols Section */}
        <section className="mb-20">
           <div className="flex justify-between items-end mb-10">
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-4">
                 <Moon className="text-[#fbbf24]" />
                 Evening Protocols
              </h2>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Nightlife Sovereignty</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0A1120] border border-white/5 p-10 rounded-[40px] flex items-center gap-6 group hover:border-[#fbbf24]/30 transition-all">
                 <div className="w-24 h-24 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white uppercase">SKY BAR ELITE</h4>
                    <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-widest mt-1">GUESTLIST: 11:30 PM</p>
                 </div>
                 <div className="ml-auto bg-white/5 p-4 rounded-2xl text-white/20 group-hover:text-[#fbbf24] transition-colors">
                    <Check size={20} />
                 </div>
              </div>
              <div className="bg-[#0A1120] border border-white/5 p-10 rounded-[40px] flex items-center gap-6 group hover:border-[#fbbf24]/30 transition-all">
                 <div className="w-24 h-24 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white uppercase">VIP LOUNGE</h4>
                    <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-widest mt-1">PROTOCOL: ACCESS GRANTED</p>
                 </div>
                 <div className="ml-auto bg-white/5 p-4 rounded-2xl text-white/20 group-hover:text-[#fbbf24] transition-colors">
                    <Check size={20} />
                 </div>
              </div>
           </div>
        </section>

        {/* Add Stop Button */}
        <button 
          onClick={() => setShowAddForm(true)}
          className="w-full py-10 border-2 border-dashed border-[#2dd4bf]/20 rounded-[40px] flex flex-col items-center justify-center gap-4 text-[#2dd4bf]/60 hover:border-[#2dd4bf] hover:text-[#2dd4bf] hover:bg-[#2dd4bf]/5 transition-all group"
        >
          <div className="bg-[#2dd4bf]/10 p-4 rounded-full group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.4em]">Add New Stop</span>
        </button>

        {/* Save Footer - Moved higher to avoid overlapping with BottomNav */}
        <div className="fixed bottom-28 left-0 right-0 p-10 bg-gradient-to-t from-[#050B18] via-[#050B18] to-transparent z-40">
           <button className="max-w-xl mx-auto w-full bg-[#fbbf24] text-black py-6 rounded-full font-black text-sm uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(251,191,36,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 border-4 border-black">
              Save Expedition Itinerary
              <Check size={20} strokeWidth={4} />
           </button>
        </div>
      </div>

      {/* Add Stop Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-[#0A1120] border border-white/10 rounded-[48px] w-full max-w-2xl p-12 shadow-[0_0_100px_rgba(45,212,191,0.1)] relative">
              <button onClick={() => setShowAddForm(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <h2 className="text-3xl font-normal tracking-[0.1em] font-cinzel uppercase mb-12 text-center">Add Destination</h2>
              
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-widest ml-2">Select City</label>
                    <select 
                      value={newStop.city}
                      onChange={(e) => setNewStop({...newStop, city: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-3xl p-5 text-white focus:border-[#2dd4bf] outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">CHOOSE DESTINATION</option>
                      {dummyCities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-widest ml-2">Arrival</label>
                       <input 
                         type="date" 
                         value={newStop.arrival}
                         onChange={(e) => setNewStop({...newStop, arrival: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 rounded-3xl p-5 text-white focus:border-[#2dd4bf] outline-none transition-all invert"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-widest ml-2">Departure</label>
                       <input 
                         type="date" 
                         value={newStop.departure}
                         onChange={(e) => setNewStop({...newStop, departure: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 rounded-3xl p-5 text-white focus:border-[#2dd4bf] outline-none transition-all invert"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-widest ml-2">Activities</label>
                    <div className="flex gap-4">
                       <input 
                         type="text" 
                         placeholder="E.G. CHAMPAGNE TASTING" 
                         value={newStop.activityInput}
                         onChange={(e) => setNewStop({...newStop, activityInput: e.target.value})}
                         className="flex-1 bg-black/50 border border-white/10 rounded-3xl p-5 text-white focus:border-[#2dd4bf] outline-none transition-all"
                       />
                       <button onClick={handleAddActivity} className="px-8 bg-[#2dd4bf] text-black rounded-3xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">ADD</button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 px-2">
                       {currentActivities.map((act, i) => (
                          <span key={i} className="px-4 py-2 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-full text-[10px] font-bold text-[#fbbf24] uppercase tracking-wider flex items-center gap-2">
                             {act}
                             <X size={10} className="cursor-pointer hover:text-white" onClick={() => setCurrentActivities(currentActivities.filter((_, idx) => idx !== i))} />
                          </span>
                       ))}
                    </div>
                 </div>

                 <div className="pt-8">
                    <button 
                      onClick={handleAddStop}
                      className="w-full bg-white text-black py-6 rounded-full font-black text-sm uppercase tracking-[0.4em] hover:bg-[#2dd4bf] transition-all"
                    >
                      CONFIRM STOP
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
