import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, ChevronRight, PlusCircle, Sparkles, Utensils, Zap, Compass } from 'lucide-react';

const Dashboard = ({ navigateTo }) => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasShownIntro = sessionStorage.getItem('traveloop_intro_shown_vite');
    if (!hasShownIntro) {
      setShowIntro(true);
      sessionStorage.setItem('traveloop_intro_shown_vite', 'true');
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);
  const recentTrips = [
    { id: 1, name: 'EUROPE ELITE 2026', date: 'Jun 10 - Jun 25', cities: 4, budget: '$12,400', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'MALDIVES GETAWAY', date: 'Oct 05 - Oct 12', cities: 1, budget: '$8,200', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'JAPAN WINTER', date: 'Dec 15 - Jan 02', cities: 3, budget: '$15,000', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80' },
  ];

  const gourmetFood = [
    { id: 1, name: 'Sushi Archive', loc: 'Tokyo', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Pizza Artisanal', loc: 'Naples', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Jalebi Archive', loc: 'Delhi, India', image: 'https://images.unsplash.com/photo-1589114473223-c44fc7c35193?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Pasta Prime', loc: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80' },
  ];

  const eliteActivities = [
    { id: 1, name: 'Skydiving Archive', loc: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1521673461164-de100ebcfb17?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Aurora Archive', loc: 'Iceland', image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Shark Diving', loc: 'Cape Town, SA', image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Private Yachting', loc: 'Monaco', image: 'https://images.unsplash.com/photo-1567891299233-da391a30ca00?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="bg-[#050B18] min-h-screen text-white relative overflow-x-hidden font-sans">
      
      {/* MINIMALIST CINEMATIC INTRO */}
      {showIntro && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-out fade-out duration-1000 delay-[2500ms] fill-mode-forwards">
          <div className="relative flex flex-col items-center max-w-5xl px-6 text-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-forwards">
               <h2 className="text-4xl md:text-6xl font-normal text-white tracking-[0.2em] font-cinzel leading-tight uppercase">
                  Welcome Traveler
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

      <div className={`pb-32 lg:pb-8 pt-8 px-6 lg:px-12 max-w-7xl mx-auto w-full transition-all duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <img src="/src/assets/logo.png" className="w-12 h-12 object-contain" alt="Traveloop Logo" />
          <div>
            <p className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.4em] mb-1 italic">Account Active: Elite</p>
            <h1 className="text-4xl font-bold text-white tracking-tighter uppercase">Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#fbbf24]">{localStorage.getItem('user_name') || 'ALEX'}</span></h1>
          </div>
        </div>
          <button 
            onClick={() => navigateTo('profile')}
            className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,0.2)] rotate-3 hover:rotate-0 transition-all duration-500 cursor-pointer"
          >
            <img src={localStorage.getItem('user_image') || (localStorage.getItem('user_role') === 'ADMIN' ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' : 'https://i.pravatar.cc/150?img=32')} alt="User Profile" className="w-full h-full object-cover" />
          </button>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#0A1120] border border-white/5 p-8 rounded-[32px] hover:border-[#2dd4bf]/40 transition-all group">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#2dd4bf]">Invested</p>
          <h3 className="text-3xl font-black text-white group-hover:text-[#2dd4bf] transition-colors">$35.6k</h3>
        </div>
        <div className="bg-[#0A1120] border border-white/5 p-8 rounded-[32px] hover:border-[#fbbf24]/40 transition-all group">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#fbbf24]">Nodes</p>
          <h3 className="text-3xl font-black text-white group-hover:text-[#fbbf24] transition-colors">03</h3>
        </div>
        <div className="bg-[#0A1120] border border-white/5 p-8 rounded-[32px] hover:border-[#2dd4bf]/40 transition-all group">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#2dd4bf]">Tier</p>
          <h3 className="text-3xl font-black text-white group-hover:text-[#2dd4bf] transition-colors">ELITE</h3>
        </div>
        <div 
          onClick={() => navigateTo('rewards')}
          className="bg-[#0A1120] border border-white/5 p-8 rounded-[32px] hover:border-[#fbbf24]/40 transition-all group cursor-pointer"
        >
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#fbbf24]">Points</p>
          <h3 className="text-3xl font-black text-white group-hover:text-[#fbbf24] transition-colors">12k</h3>
        </div>
      </section>

      {/* Plan New Trip Big Button */}
      <button 
        onClick={() => navigateTo('create')}
        className="w-full relative overflow-hidden bg-white border-4 border-black rounded-[48px] p-12 mb-16 shadow-[0_20px_50px_rgba(255,255,255,0.1)] group transition-all transform hover:-translate-y-2 text-left"
      >
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#2dd4bf]/5 -skew-x-12 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-700"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 text-black/40 mb-3 font-black text-[10px] tracking-[0.5em] uppercase">
              <Sparkles size={16} />
              Elite Initiation
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-1 tracking-tighter uppercase leading-none">
              Start Expedition
            </h2>
            <p className="text-black/60 font-medium text-lg italic font-cinzel">Legacy begins here.</p>
          </div>
          <div className="bg-black text-white p-8 rounded-full shadow-2xl group-hover:bg-[#2dd4bf] group-hover:text-black transition-all duration-500">
            <PlusCircle size={40} strokeWidth={3} />
          </div>
        </div>
      </button>

      {/* Recent Trips */}
      <section className="mb-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Active Portfolios</h2>
          <button onClick={() => navigateTo('trips')} className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white/10 pb-1 hover:text-[#2dd4bf] transition-all">Archive All</button>
        </div>
        
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-10 pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 hide-scrollbar snap-x snap-mandatory">
          {recentTrips.map((trip) => (
            <div key={trip.id} className="min-w-[340px] lg:min-w-0 bg-[#0A1120] border border-white/5 rounded-[56px] overflow-hidden hover:border-[#2dd4bf]/40 transition-all duration-700 snap-center group cursor-pointer shadow-2xl">
              <div className="h-64 relative overflow-hidden">
                <img src={trip.image} alt={trip.name} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-transparent"></div>
                <div className="absolute top-8 right-8 z-20 bg-black/80 backdrop-blur-3xl px-6 py-2 rounded-full border border-[#2dd4bf]/30 text-[10px] font-black tracking-widest text-[#2dd4bf]">
                  {trip.budget}
                </div>
              </div>
              <div className="p-10">
                <h3 className="font-bold text-3xl text-white mb-2 uppercase tracking-tighter group-hover:text-[#2dd4bf] transition-colors">{trip.name}</h3>
                <div className="flex items-center gap-3 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                  <Calendar size={14} className="text-[#2dd4bf]" />
                  <span>{trip.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gourmet Protocols */}
      <section className="mb-20 relative">
        <div className="absolute -right-20 -top-20 w-96 h-96 opacity-[0.03] blur-3xl pointer-events-none rotate-12 overflow-hidden rounded-full">
           <img src="https://plus.unsplash.com/premium_photo-1694141253428-299f242502f6?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-between items-end mb-10 relative z-10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-4">
            <Utensils className="text-[#fbbf24]" />
            Gourmet Protocols
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {gourmetFood.map((food) => (
            <div key={food.id} className="relative h-96 rounded-[56px] overflow-hidden group cursor-pointer border border-white/5 hover:border-[#fbbf24]/30 transition-all">
              <img src={food.image} alt={food.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <h3 className="text-2xl font-normal text-white uppercase tracking-wider mb-1 font-cinzel group-hover:text-[#fbbf24] transition-colors">{food.name}</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] font-cinzel">{food.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Elite Activities */}
      <section className="mb-20 relative">
        <div className="absolute -left-40 top-0 w-[600px] h-[600px] opacity-[0.03] blur-[100px] pointer-events-none overflow-hidden rounded-full">
           <img src="https://images.unsplash.com/photo-1476984252817-72433945936e?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -right-40 bottom-0 w-[500px] h-[500px] opacity-[0.02] blur-[80px] pointer-events-none overflow-hidden rounded-full">
           <img src="https://images.unsplash.com/photo-1540946484620-2ef4c7ef5819?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-between items-end mb-10 relative z-10">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-4">
            <Zap className="text-[#2dd4bf]" />
            Elite Activity Archive
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {eliteActivities.map((act) => (
            <div key={act.id} className="relative h-96 rounded-[56px] overflow-hidden group cursor-pointer border border-white/5 hover:border-[#2dd4bf]/30 transition-all">
              <img src={act.image} alt={act.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <h3 className="text-2xl font-normal text-white uppercase tracking-wider mb-1 font-cinzel group-hover:text-[#2dd4bf] transition-colors">{act.name}</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] font-cinzel">{act.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
};

export default Dashboard;
