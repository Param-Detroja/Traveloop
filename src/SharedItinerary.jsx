import React from 'react';
import { Share2, Copy, Send, Instagram, MessageCircle, Calendar, MapPin, Globe, Sparkles } from 'lucide-react';

const SharedItinerary = ({ navigateTo }) => {
  const tripData = {
    name: 'EUROPE ELITE 2026',
    creator: 'Alex Rivera',
    shareUrl: 'traveloop.app/share/abc123',
    days: [
      { day: 1, city: 'Paris', activities: ['Eiffel Tower Summit', 'Seine Dinner Cruise', 'Louvre Archive'] },
      { day: 2, city: 'Paris', activities: ['Montmartre Walk', 'Arc de Triomphe', 'Le Marais Gourmet'] },
      { day: 3, city: 'Rome', activities: ['Colosseum Private Tour', 'Vatican Museums', 'Trastevere Evening'] }
    ]
  };

  const handleCopyTrip = () => {
    // Simulate copying logic
    const existingTrips = JSON.parse(localStorage.getItem('traveloop_trips') || '[]');
    const newTrip = {
      id: Date.now(),
      name: `COPY: ${tripData.name}`,
      date: 'Aug 10 - Aug 25',
      cities: tripData.days.length,
      budget: '$10,000',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'
    };
    localStorage.setItem('traveloop_trips', JSON.stringify([newTrip, ...existingTrips]));
    
    // Show success alert
    alert('PROTOCOL INITIATED: Expedition copied to your portfolio.');
    navigateTo('trips');
  };

  return (
    <div className="pb-32 pt-8 px-6 lg:px-12 max-w-4xl mx-auto w-full bg-[#050B18] animate-in fade-in duration-700">
      {/* Banner */}
      <div className="bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-full px-8 py-3 mb-10 flex items-center justify-center gap-3">
        <div className="w-2 h-2 bg-[#fbbf24] rounded-full animate-pulse"></div>
        <span className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-[0.5em]">Shared Itinerary - Read Only</span>
      </div>

      <header className="mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <p className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
              <Globe size={14} /> Created by {tripData.creator}
            </p>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-4">{tripData.name}</h1>
            <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl w-fit">
               <Copy size={14} /> {tripData.shareUrl}
            </div>
          </div>
          <button 
            onClick={handleCopyTrip}
            className="bg-[#2dd4bf] text-black px-10 py-5 rounded-[32px] font-black text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(45,212,191,0.2)] hover:scale-105 transition-all flex items-center gap-3"
          >
            <Sparkles size={18} strokeWidth={3} />
            Copy This Trip
          </button>
        </div>
      </header>

      {/* Itinerary List */}
      <div className="space-y-8 mb-20">
        {tripData.days.map((day, i) => (
          <div key={i} className="bg-[#0A1120] border border-white/5 rounded-[48px] p-10 group hover:border-[#fbbf24]/30 transition-all shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex flex-col items-center justify-center text-[#fbbf24]">
                  <span className="text-xs font-black uppercase tracking-tighter">Day</span>
                  <span className="text-2xl font-black leading-none">{day.day}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white uppercase tracking-tighter flex items-center gap-3">
                    <MapPin className="text-[#2dd4bf]" size={24} />
                    {day.city}
                  </h3>
                </div>
              </div>
              <Calendar className="text-white/10" />
            </div>
            <div className="space-y-4 ml-20">
              {day.activities.map((act, j) => (
                <div key={j} className="flex items-center gap-4 text-white/60 text-lg font-medium">
                  <div className="w-2 h-2 rounded-full bg-[#2dd4bf]/40"></div>
                  {act}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Social Sharing */}
      <div className="bg-[#0A1120] border border-white/5 rounded-[48px] p-12 text-center shadow-2xl">
        <h2 className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.5em] mb-8">Disseminate Expedition</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <button className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center text-white hover:bg-[#25D366] hover:text-white transition-all shadow-xl group">
            <MessageCircle size={32} />
          </button>
          <button className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center text-white hover:bg-[#E4405F] hover:text-white transition-all shadow-xl">
            <Instagram size={32} />
          </button>
          <button className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center text-white hover:bg-[#2dd4bf] hover:text-black transition-all shadow-xl">
            <Send size={32} />
          </button>
          <button className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center text-white hover:bg-[#fbbf24] hover:text-black transition-all shadow-xl">
            <Copy size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedItinerary;
