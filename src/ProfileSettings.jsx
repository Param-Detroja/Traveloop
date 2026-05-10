import React, { useState } from 'react';
import { User, Settings, Bell, Shield, CreditCard, ChevronRight, LogOut, Camera, Mail, Phone, Globe, Edit3, Save, X } from 'lucide-react';

const ProfileSettings = ({ navigateTo }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Load from localStorage or defaults
  const storedName = localStorage.getItem('user_name') || 'ALEX RIVERA';
  const storedEmail = localStorage.getItem('user_email') || 'alex.rivera@elite.travel';
  const storedImage = localStorage.getItem('user_image') || 'https://i.pravatar.cc/150?img=32';
  const isAdmin = localStorage.getItem('user_role') === 'ADMIN';

  const [profile, setProfile] = useState({
    name: storedName,
    email: storedEmail,
    tier: isAdmin ? 'SOVEREIGN ADMIN' : 'ELITE SOVEREIGN',
    points: '12,450',
    trips: '24',
    image: isAdmin && !localStorage.getItem('user_image') ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' : storedImage
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

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
        { id: 4, icon: CreditCard, label: 'Payment Methods', value: 'Visa 4242' },
        { id: 5, icon: Settings, label: 'Budget Protocols', value: 'Managed' }
      ]
    }
  ];

  return (
    <div className="pb-32 pt-12 px-6 lg:px-12 max-w-3xl mx-auto w-full bg-[#050B18] animate-in fade-in duration-700">
      <header className="mb-16 text-center">
        <div className="flex justify-end mb-4">
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

        <div className="relative inline-block mb-6 group">
          <div className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-[#fbbf24] shadow-[0_0_40px_rgba(251,191,36,0.3)] group-hover:rotate-6 transition-all duration-500">
            <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-[#2dd4bf] text-black p-3 rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-[#050B18]">
            <Camera size={20} strokeWidth={3} />
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4 max-w-md mx-auto">
            <input 
              type="text" 
              value={tempProfile.name}
              onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value.toUpperCase() })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-center text-3xl font-black uppercase tracking-tighter focus:border-[#2dd4bf] outline-none"
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
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">{profile.name}</h1>
            <p className="text-white/40 text-sm font-medium mb-6 italic">{profile.email}</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-[0.4em] px-4 py-1.5 bg-[#fbbf24]/10 rounded-full border border-[#fbbf24]/20">{profile.tier}</span>
              <span className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.4em] px-4 py-1.5 bg-[#2dd4bf]/10 rounded-full border border-[#2dd4bf]/20">{profile.trips} EXPEDITIONS</span>
            </div>
          </>
        )}
      </header>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.5em] ml-4">{section.title}</h2>
            <div className="bg-[#0A1120] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
              {section.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} className={`w-full flex items-center justify-between p-8 hover:bg-white/5 transition-all group ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <div className="flex items-center gap-6">
                      <div className="bg-[#050B18] p-4 rounded-2xl text-white/40 group-hover:text-[#fbbf24] group-hover:bg-[#fbbf24]/10 transition-all">
                        <Icon size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold tracking-tight">{item.label}</p>
                        <p className="text-white/20 text-xs font-medium uppercase tracking-widest mt-0.5">{item.value}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-white/10 group-hover:text-[#fbbf24] group-hover:translate-x-1 transition-all" size={20} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="pt-8">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-red-500/5 border border-red-500/20 text-red-500 py-8 rounded-[40px] font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-red-500 hover:text-white transition-all shadow-xl"
          >
            <LogOut size={20} strokeWidth={3} />
            Terminate Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
