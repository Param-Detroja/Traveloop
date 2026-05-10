"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Bell, Shield, CreditCard, ChevronRight, LogOut, Camera, Globe, Edit3, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Use a useEffect to load from localStorage to avoid SSR hydration issues
  const [profile, setProfile] = useState({
    name: 'ALEX RIVERA',
    email: 'alex.rivera@elite.travel',
    tier: 'ELITE SOVEREIGN',
    points: '12,450',
    trips: '24',
    image: 'https://i.pravatar.cc/150?img=32'
  });

  React.useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    const storedEmail = localStorage.getItem('user_email');
    const storedImage = localStorage.getItem('user_image');
    const isAdmin = localStorage.getItem('user_role') === 'ADMIN';

    if (storedName || storedEmail || storedImage) {
      setProfile(prev => ({
        ...prev,
        name: storedName || prev.name,
        email: storedEmail || prev.email,
        tier: isAdmin ? 'SOVEREIGN ADMIN' : prev.tier,
        image: storedImage || (isAdmin ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' : prev.image)
      }));
    }
  }, []);

  const [tempProfile, setTempProfile] = useState({ ...profile });

  // Sync tempProfile when profile is loaded from localStorage
  React.useEffect(() => {
    setTempProfile({ ...profile });
  }, [profile]);

  const handleSave = () => {
    setProfile({ ...tempProfile });
    localStorage.setItem('user_name', tempProfile.name);
    localStorage.setItem('user_email', tempProfile.email);
    localStorage.setItem('user_image', tempProfile.image);
    setIsEditing(false);
  };

  const sections = [
    {
      title: 'PROTOCOL SETTINGS',
      items: [
        { id: 1, icon: Bell, label: 'Notifications', value: 'High Priority' },
        { id: 2, icon: Shield, label: 'Security Archive', value: 'Level 4' },
        { id: 3, icon: Globe, label: 'Language & Region', value: 'Global (EN)' }
      ]
    },
    {
      title: 'FINANCIAL ARCHIVE',
      items: [
        { id: 4, icon: CreditCard, label: 'Payment Methods', value: 'Visa 4242' }
      ]
    }
  ];

  return (
    <div className="bg-[#050B18] min-h-screen text-white font-sans pb-32">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest mb-12">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <header className="mb-16 text-center">
          <div className="flex justify-end mb-8">
            {isEditing ? (
              <div className="flex gap-4">
                <button onClick={() => setIsEditing(false)} className="bg-white/5 text-white/40 p-4 rounded-2xl hover:text-white transition-all">
                  <X size={20} />
                </button>
                <button onClick={handleSave} className="bg-[#2dd4bf] text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-white/5 text-[#fbbf24] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-[#fbbf24]/20 hover:bg-[#fbbf24]/10 transition-all">
                <Edit3 size={16} /> Edit Protocol
              </button>
            )}
          </div>

          <div className="relative inline-block mb-8 group">
            <div className="w-40 h-40 rounded-[56px] overflow-hidden border-4 border-[#fbbf24] shadow-[0_0_50px_rgba(251,191,36,0.2)] group-hover:rotate-6 transition-all duration-700">
              <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-2 -right-2 bg-[#2dd4bf] text-black p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all border-4 border-[#050B18]">
              <Camera size={24} strokeWidth={3} />
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-6 max-w-md mx-auto">
              <input 
                type="text" 
                value={tempProfile.name}
                onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value.toUpperCase() })}
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-white text-center text-4xl font-black uppercase tracking-tighter focus:border-[#2dd4bf] outline-none"
                placeholder="NAME"
              />
              <input 
                type="text" 
                value={tempProfile.image}
                onChange={(e) => setTempProfile({ ...tempProfile, image: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white/60 text-center text-sm font-medium focus:border-[#2dd4bf] outline-none"
                placeholder="IMAGE URL"
              />
              <input 
                type="email" 
                value={tempProfile.email}
                onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white/60 text-center text-sm font-medium focus:border-[#2dd4bf] outline-none"
                placeholder="EMAIL"
              />
              <select 
                value={tempProfile.tier}
                onChange={(e) => setTempProfile({ ...tempProfile, tier: e.target.value })}
                className="w-full bg-[#0A1120] border border-[#fbbf24]/20 rounded-2xl p-4 text-[#fbbf24] text-center text-[10px] font-bold uppercase tracking-[0.4em] outline-none"
              >
                <option>ELITE SOVEREIGN</option>
                <option>GOLD SOVEREIGN</option>
                <option>BLACK LEGACY</option>
              </select>
            </div>
          ) : (
            <>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-4">{profile.name}</h1>
              <p className="text-white/40 text-base font-medium mb-8 italic">{profile.email}</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-[0.5em] px-6 py-2 bg-[#fbbf24]/10 rounded-full border border-[#fbbf24]/20">{profile.tier}</span>
                <span className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.5em] px-6 py-2 bg-[#2dd4bf]/10 rounded-full border border-[#2dd4bf]/20">{profile.trips} EXPEDITIONS</span>
              </div>
            </>
          )}
        </header>

        <div className="space-y-16">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.6em] ml-6">{section.title}</h2>
              <div className="bg-[#0A1120] border border-white/5 rounded-[56px] overflow-hidden shadow-2xl">
                {section.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.id} className={`w-full flex items-center justify-between p-10 hover:bg-white/5 transition-all group ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}>
                      <div className="flex items-center gap-8">
                        <div className="bg-[#050B18] p-5 rounded-2xl text-white/20 group-hover:text-[#fbbf24] group-hover:bg-[#fbbf24]/10 transition-all">
                          <Icon size={28} />
                        </div>
                        <div className="text-left">
                          <p className="text-xl font-bold tracking-tight text-white">{item.label}</p>
                          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">{item.value}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-white/10 group-hover:text-[#fbbf24] group-hover:translate-x-2 transition-all" size={24} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-12">
            <button className="w-full bg-red-500/5 border border-red-500/20 text-red-500 py-10 rounded-[56px] font-black text-[10px] uppercase tracking-[0.6em] flex items-center justify-center gap-4 hover:bg-red-500 hover:text-white transition-all shadow-2xl">
              <LogOut size={24} strokeWidth={3} />
              Terminate Elite Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
