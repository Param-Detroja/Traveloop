import React, { useState } from 'react';
import { MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';

const MyTrips = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingTrips = [
    { id: 1, name: 'Euro Trip 2026', date: 'Jun 10 - Jun 25', status: 'Planned', cities: 4, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Maldives Getaway', date: 'Oct 05 - Oct 12', status: 'Booked', cities: 1, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80' },
  ];

  const pastTrips = [
    { id: 3, name: 'Japan Winter', date: 'Dec 15 - Jan 02', status: 'Completed', cities: 3, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'New York Weekend', date: 'Apr 10 - Apr 12', status: 'Completed', cities: 1, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
  ];

  const tripsToDisplay = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

  return (
    <div className="pb-24 lg:pb-8 pt-8 px-6 lg:px-12 max-w-7xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Trips</h1>
        <p className="text-gray-400">Manage and view all your travel itineraries.</p>
      </header>

      {/* Tabs */}
      <div className="flex bg-white/5 p-1 rounded-xl mb-8 max-w-sm">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'upcoming' ? 'bg-[#14b8a6] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'past' ? 'bg-[#14b8a6] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
        >
          Past
        </button>
      </div>

      {/* Trip List */}
      <div className="space-y-5">
        {tripsToDisplay.map((trip) => (
          <div key={trip.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-5 hover:border-[#14b8a6]/50 transition-all cursor-pointer group">
            <div className="w-full sm:w-48 h-32 sm:h-auto rounded-xl overflow-hidden shrink-0 relative">
              <img src={trip.image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#14b8a6] transition-colors">{trip.name}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${trip.status === 'Completed' ? 'bg-gray-500/20 text-gray-400' : 'bg-[#fbbf24]/20 text-[#fbbf24]'}`}>
                    {trip.status === 'Completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {trip.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-[#14b8a6]" />
                    {trip.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-[#14b8a6]" />
                    {trip.cities} Cities
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">View Details</button>
                {activeTab === 'upcoming' && (
                  <button className="flex-1 py-2 bg-[#14b8a6]/10 border border-[#14b8a6]/30 hover:bg-[#14b8a6] hover:text-white text-[#14b8a6] rounded-lg text-sm font-medium transition-colors">Edit Trip</button>
                )}
              </div>
            </div>
          </div>
        ))}

        {tripsToDisplay.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
            <MapPin className="mx-auto text-gray-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">No trips found</h3>
            <p className="text-gray-400">You don't have any {activeTab} trips.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
