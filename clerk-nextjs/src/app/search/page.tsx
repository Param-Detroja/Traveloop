"use client";

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, Star, Plus, MapPin, Clock, DollarSign, Check, Map as MapIcon, Grid, X, Navigation, Utensils, Heart } from 'lucide-react';

export default function SearchScreen() {
  const [activeTab, setActiveTab] = useState<'cities' | 'activities'>('cities');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  
  // Interaction State
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleAdd = (type: string, id: number | string) => {
    const key = `${type}-${id}`;
    setAddedItems(prev => prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  
  // City Search State
  const [cityFilter, setCityFilter] = useState('All');
  const cityFilters = ['All', 'Europe', 'Asia', 'Middle East', 'Americas', 'Africa', 'Oceania'];
  
  const [cities, setCities] = useState([
    { id: 1, name: 'Paris', country: 'France', region: 'Europe', cost: '$$$', stars: 5, image: '/images/cities/paris.jpg', description: 'The City of Light. Must try: Croissants.' },
    { id: 2, name: 'Tokyo', country: 'Japan', region: 'Asia', cost: '$$$', stars: 5, image: '/images/cities/tokyo.jpg', description: 'Modern neon meets ancient temples. Must try: Sushi.' },
    { id: 3, name: 'Dubai', country: 'UAE', region: 'Middle East', cost: '$$$$', stars: 4, image: '/images/cities/dubai.jpg', description: 'Futuristic luxury oasis. Must try: Shawarma.' },
    { id: 4, name: 'New York', country: 'USA', region: 'Americas', cost: '$$$$', stars: 5, image: '/images/cities/newyork.jpg', description: 'The city that never sleeps. Must try: NYC Pizza.' },
    { id: 5, name: 'Bali', country: 'Indonesia', region: 'Asia', cost: '$$', stars: 5, image: '/images/cities/bali.jpg', description: 'Tropical paradise. Must try: Babi Guling.' },
    { id: 6, name: 'London', country: 'UK', region: 'Europe', cost: '$$$', stars: 4, image: '/images/cities/london.jpg', description: 'Historic global capital. Must try: Fish and Chips.' },
    { id: 7, name: 'Bangkok', country: 'Thailand', region: 'Asia', cost: '$', stars: 4, image: '/images/cities/bangkok.jpg', description: 'Vibrant street life. Must try: Pad Thai.' },
    { id: 8, name: 'Rome', country: 'Italy', region: 'Europe', cost: '$$$', stars: 5, image: '/images/cities/rome.jpg', description: 'The Eternal City. Must try: Carbonara.' },
    { id: 9, name: 'Edinburgh', country: 'UK', region: 'Europe', cost: '$$', stars: 5, image: '/images/cities/edinburgh.jpg', description: 'Medieval charm. Must try: Haggis.' },
    { id: 10, name: 'Cape Town', country: 'South Africa', region: 'Africa', cost: '$$', stars: 4, image: '/images/cities/capetown.jpg', description: 'Table Mountain views. Must try: Bobotie.' },
    { id: 11, name: 'Santorini', country: 'Greece', region: 'Europe', cost: '$$$$', stars: 5, image: '/images/cities/santorini.jpg', description: 'Iconic white houses. Must try: Moussaka.' },
    { id: 12, name: 'Sydney', country: 'Australia', region: 'Oceania', cost: '$$$', stars: 4, image: '/images/cities/sydney.jpg', description: 'Harbor city beauty. Must try: Meat Pies.' },
    { id: 13, name: 'Mumbai', country: 'India', region: 'Asia', cost: '$$', stars: 4, image: '/images/cities/mumbai.jpg', description: 'City of Dreams. Must try: Vada Pav.' },
    { id: 14, name: 'Delhi', country: 'India', region: 'Asia', cost: '$$', stars: 4, image: '/images/cities/delhi.jpg', description: 'The capital city. Must try: Butter Chicken.' },
    { id: 15, name: 'Jaipur', country: 'India', region: 'Asia', cost: '$', stars: 5, image: '/images/cities/jaipur.jpg', description: 'The Pink City. Must try: Dal Baati Churma.' },
    { id: 16, name: 'Agra', country: 'India', region: 'Asia', cost: '$', stars: 5, image: '/images/cities/agra.jpg', description: 'Home to Taj Mahal. Must try: Petha.' },
    { id: 17, name: 'Kolkata', country: 'India', region: 'Asia', cost: '$', stars: 5, image: '/images/cities/kolkata.jpg', description: 'City of Joy. Must try: Rosogolla.' },
    { id: 18, name: 'Hyderabad', country: 'India', region: 'Asia', cost: '$$', stars: 4, image: '/images/cities/hyderabad.jpg', description: 'City of Pearls. Must try: Biryani.' },
    { id: 19, name: 'Chennai', country: 'India', region: 'Asia', cost: '$', stars: 4, image: '/images/cities/chennai.jpg', description: 'Cultural capital. Must try: Dosa.' },
    { id: 20, name: 'Manchester', country: 'UK', region: 'Europe', cost: '$$', stars: 4, image: '/images/cities/manchester.jpg', description: 'Football capital.' },
    { id: 21, name: 'Liverpool', country: 'UK', region: 'Europe', cost: '$$', stars: 4, image: '/images/cities/liverpool.jpg', description: 'Home of Beatles.' },
    { id: 22, name: 'Oxford', country: 'UK', region: 'Europe', cost: '$$$', stars: 5, image: '/images/cities/oxford.jpg', description: 'City of Dreaming Spires.' },
    { id: 23, name: 'Moscow', country: 'Russia', region: 'Europe', cost: '$$$', stars: 5, image: '/images/cities/moscow.jpg', description: 'The iconic capital. Must try: Borscht.' },
    { id: 24, name: 'Saint Petersburg', country: 'Russia', region: 'Europe', cost: '$$$', stars: 5, image: '/images/cities/stpetersburg.jpg', description: 'Venice of the North.' },
    { id: 25, name: 'Sochi', country: 'Russia', region: 'Europe', cost: '$$', stars: 4, image: '/images/cities/sochi.jpg', description: 'Black Sea resort.' },
    { id: 26, name: 'Jakarta', country: 'Indonesia', region: 'Asia', cost: '$$', stars: 4, image: '/images/cities/jakarta.jpg', description: 'Massive capital city.' },
    { id: 27, name: 'Yogyakarta', country: 'Indonesia', region: 'Asia', cost: '$', stars: 5, image: '/images/cities/yogyakarta.jpg', description: 'Cultural heart of Java.' },
    { id: 28, name: 'Ubud', country: 'Indonesia', region: 'Asia', cost: '$$', stars: 5, image: '/images/cities/ubud.jpg', description: 'Heart of Bali.' },
    // ELITE LOCATIONS
    { id: 29, name: 'Monaco', country: 'Monaco', region: 'Europe', cost: '$$$$$', stars: 5, image: '/images/cities/monaco.jpg', description: 'The peak of luxury. Must try: Fine dining at Monte Carlo.' },
    { id: 30, name: 'Singapore', country: 'Singapore', region: 'Asia', cost: '$$$$', stars: 5, image: '/images/cities/singapore.jpg', description: 'The Garden City of the future. Must try: Chili Crab.' },
    { id: 31, name: 'Zurich', country: 'Switzerland', region: 'Europe', cost: '$$$$', stars: 5, image: '/images/cities/zurich.jpg', description: 'Swiss elegance and Alpine beauty. Must try: Chocolate Fondue.' },
  ]);

  const [activityFilter, setActivityFilter] = useState('All');
  const activityFilters = ['All', 'Sightseeing', 'Food', 'Adventure', 'Culture'];

  const activities = [
    { id: 1, name: 'Jalebi Archive', type: 'Food', duration: '1 hour', cost: '$5', description: 'Crispy, golden-fried circles of pure bliss. A city favorite.', image: 'https://images.unsplash.com/photo-1589114473223-c44fc7c35193?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Club Sandwich Prime', type: 'Food', duration: '1 hour', cost: '$15', description: 'Triple-layered artisanal sourdough with premium proteins.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Vada Pav Protocol', type: 'Food', duration: '1 hour', cost: '$3', description: 'The legendary Mumbai slider. Spicy and iconic.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Tandoori Expedition', type: 'Food', duration: '2 hours', cost: '$30', description: 'Clay-oven masterpieces from the heart of Delhi.', image: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Skydiving Archive', type: 'Adventure', duration: '4 hours', cost: '$300', description: 'Plunge from 15,000ft over the Palm Jumeirah.', image: 'https://images.unsplash.com/photo-1521673461164-de100ebcfb17?auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Shark Diving Protocol', type: 'Adventure', duration: '5 hours', cost: '$250', description: 'Face-to-face encounter with the ocean\'s apex predators.', image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=800&q=80' },
    { id: 7, name: 'Himalayan Trek', type: 'Adventure', duration: '5 days', cost: '$1200', description: 'Conquer the peaks of the worlds highest archive.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
    { id: 8, name: 'Desert Dune Bashing', type: 'Adventure', duration: '6 hours', cost: '$90', description: 'High-speed 4x4 maneuvers across shifting sands.', image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=800&q=80' },
    { id: 9, name: 'Private Yachting', type: 'Adventure', duration: '8 hours', cost: '$5000', description: 'Unparalleled sovereignty over the Mediterranean.', image: 'https://images.unsplash.com/photo-1567891299233-da391a30ca00?auto=format&fit=crop&w=800&q=80' },
  ];

  const filteredCities = cities.filter(c => cityFilter === 'All' || c.region === cityFilter)
                               .filter(c => 
                                 c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 c.country.toLowerCase().includes(searchQuery.toLowerCase())
                               );
  
  const filteredActivities = activities.filter(a => activityFilter === 'All' || a.type === activityFilter)
                                       .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const saveTrip = () => {
    const selectedCities = cities.filter(c => addedItems.includes(`city-${c.id}`));
    if (selectedCities.length === 0) return;

    const newTrip = {
      id: Date.now(),
      name: `${selectedCities[0].name} & More`,
      date: 'Pending Date',
      cities: selectedCities.length,
      image: selectedCities[0].image
    };

    const saved = localStorage.getItem('traveloop_trips');
    const existing = saved ? JSON.parse(saved) : [];
    localStorage.setItem('traveloop_trips', JSON.stringify([newTrip, ...existing]));
    
    // Clear selection and notify
    setAddedItems([]);
    window.location.href = '/'; // Go home to see it
  };

  return (
    <div className="bg-black min-h-screen pt-8 px-6 lg:px-12 w-full pb-32 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tighter uppercase">Discover</h1>
            <div className="flex bg-[#111] p-1.5 rounded-2xl border border-white/5 shadow-2xl">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
              >
                <Grid size={22} />
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'map' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
              >
                <MapIcon size={22} />
              </button>
            </div>
          </div>
          
          <div className="flex bg-[#111] p-1.5 rounded-2xl mb-8 shadow-xl border border-white/5">
            <button 
              onClick={() => { setActiveTab('cities'); setSearchQuery(''); }}
              className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${activeTab === 'cities' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              DESTINATIONS
            </button>
            <button 
              onClick={() => { setActiveTab('activities'); setSearchQuery(''); }}
              className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${activeTab === 'activities' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              ACTIVITIES & FOOD
            </button>
          </div>

          <div className="relative mb-10 group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-600" size={24} />
            </div>
            <input
              type="text"
              placeholder={activeTab === 'cities' ? "Search global cities, food, or countries..." : "Search activities and experiences..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-[24px] bg-[#0A0A0A] border border-white/10 text-white placeholder-gray-700 focus:outline-none focus:border-white transition-all text-lg"
            />
          </div>

          <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
            {(activeTab === 'cities' ? cityFilters : activityFilters).map(filter => (
              <button
                key={filter}
                onClick={() => activeTab === 'cities' ? setCityFilter(filter) : setActivityFilter(filter)}
                className={`whitespace-nowrap px-8 py-3 rounded-2xl text-xs font-bold tracking-[0.1em] transition-all border ${
                  (activeTab === 'cities' ? cityFilter : activityFilter) === filter 
                  ? 'bg-white text-black border-white' 
                  : 'bg-[#111] text-gray-500 border-white/5 hover:text-white'
                }`}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        {viewMode === 'map' ? (
          <div className="relative w-full h-[650px] rounded-[48px] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-700">
             <div className="absolute inset-0 bg-[#050505]">
                <div className="w-full h-full opacity-20 grayscale contrast-150 brightness-50" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80)', backgroundSize: 'cover' }}></div>
                {filteredCities.slice(0, 15).map((city, idx) => (
                  <div key={city.id} className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2" style={{ top: `${15 + (idx * 12) % 70}%`, left: `${10 + (idx * 18) % 80}%` }}>
                    <div className="relative flex flex-col items-center">
                      <div className="bg-white text-black p-3 rounded-2xl shadow-[0_5px_15px_rgba(255,255,255,0.2)] flex items-center gap-2 group-hover:scale-125 transition-all duration-300">
                        <MapPin size={18} fill="black" />
                        <span className="text-[10px] font-black uppercase tracking-tight whitespace-nowrap">{city.name}</span>
                      </div>
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white"></div>
                    </div>
                  </div>
                ))}
             </div>
             <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[40px] flex justify-between items-center shadow-2xl">
                <div>
                  <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em] mb-1 italic">Intelligence Mode</p>
                  <h3 className="text-2xl font-bold text-white">{filteredCities.length} LOCATIONS MAPPED</h3>
                </div>
                <button onClick={() => setViewMode('grid')} className="px-10 py-4 bg-white text-black rounded-[24px] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">EXIT MAP</button>
             </div>
          </div>
        ) : (
          activeTab === 'cities' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredCities.map((city) => (
                <div key={city.id} className="bg-[#0A0A0A] border border-white/10 rounded-[40px] overflow-hidden hover:border-white/30 transition-all duration-700 group flex flex-col h-full shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                  <div className="h-64 relative overflow-hidden shrink-0 bg-[#111]">
                    <img 
                      src={city.image} 
                      alt={city.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('loremflickr')) {
                          target.src = `https://loremflickr.com/800/600/${city.name.replace(' ', '')},travel`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <button onClick={() => toggleFavorite(city.name)} className="absolute top-6 left-6 p-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 text-white transition-colors">
                      <Heart size={20} className={favorites.includes(city.name) ? 'fill-white text-white' : ''} />
                    </button>
                  </div>
                  <div className="p-8 flex flex-col flex-1 bg-gradient-to-b from-black to-[#050505]">
                    <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-1">{city.name}</h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{city.country}</p>
                    <p className="text-gray-500 text-sm mb-8 line-clamp-2 italic leading-relaxed font-medium flex-1">"{city.description}"</p>
                    <button 
                      onClick={() => handleAdd('city', city.id)}
                      className={`w-full py-5 rounded-[24px] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 border-2 ${
                        addedItems.includes(`city-${city.id}`) ? 'bg-white/10 text-white border-white/30' : 'bg-[#111] hover:bg-white hover:text-black border-transparent'
                      }`}
                    >
                      {addedItems.includes(`city-${city.id}`) ? <Check size={20} strokeWidth={4} /> : <Plus size={20} strokeWidth={4} />}
                      {addedItems.includes(`city-${city.id}`) ? 'SELECTED' : 'SELECT'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="bg-[#0A0A0A] border border-white/10 rounded-[40px] overflow-hidden hover:border-white/30 transition-all group flex flex-col h-full shadow-2xl">
                  <div className="h-44 relative overflow-hidden shrink-0">
                    <img src={activity.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-2">{activity.name}</h3>
                    <div className="flex gap-4 mb-4">
                      <span className="bg-[#111] px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-widest">{activity.type}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-1 font-medium italic">"{activity.description}"</p>
                    <button 
                      onClick={() => handleAdd('activity', activity.id)}
                      className={`w-full py-4 rounded-[20px] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border-2 ${
                        addedItems.includes(`activity-${activity.id}`) ? 'bg-white/10 text-white border-white/30' : 'bg-white text-black border-transparent'
                      }`}
                    >
                      {addedItems.includes(`activity-${activity.id}`) ? <Check size={18} strokeWidth={4} /> : <Plus size={18} strokeWidth={4} />}
                      {addedItems.includes(`activity-${activity.id}`) ? 'SELECTED' : 'ADD TO PLAN'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* SAVE TRIP FOOTER */}
        {addedItems.length > 0 && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-20 duration-500">
            <button 
              onClick={saveTrip}
              className="bg-white text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 border-4 border-black"
            >
              Confirm Trip ({addedItems.length} Items)
              <Plus size={20} strokeWidth={4} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
