import React, { useState } from 'react';
import { Users, Map, Plane, Activity, ShieldAlert, ShieldCheck, Trash2, Search, BarChart3, TrendingUp, MoreVertical } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Rivera', email: 'alex@elite.travel', trips: 12, status: 'Active' },
    { id: 2, name: 'Elena Smith', email: 'elena@travel.com', trips: 5, status: 'Active' },
    { id: 3, name: 'Jordan Lee', email: 'jordan@legacy.com', trips: 8, status: 'Suspended' },
    { id: 4, name: 'Sara Tancredi', email: 'sara@arch.com', trips: 3, status: 'Active' },
  ]);

  const stats = [
    { label: 'Total Users', value: '1,240', icon: Users, color: 'text-teal-400' },
    { label: 'Total Trips', value: '3,850', icon: Plane, color: 'text-amber-400' },
    { label: 'Total Cities', value: '142', icon: Map, color: 'text-blue-400' },
    { label: 'Active Today', value: '86', icon: Activity, color: 'text-emerald-400' },
  ];

  const popularCities = [
    { name: 'Paris', country: 'France', trips: 840, cost: 'High' },
    { name: 'Tokyo', country: 'Japan', trips: 720, cost: 'High' },
    { name: 'Bali', country: 'Indonesia', trips: 650, cost: 'Low' },
    { name: 'Rome', country: 'Italy', trips: 590, cost: 'Medium' },
    { name: 'NYC', country: 'USA', trips: 510, cost: 'Ultra' },
  ];

  const recentTrips = [
    { id: 101, user: 'Alex Rivera', trip: 'Europe Elite 2026', date: 'Just now' },
    { id: 102, user: 'Elena Smith', trip: 'Maldives Getaway', date: '2h ago' },
    { id: 103, user: 'Michael S.', trip: 'Japan Winter', date: '5h ago' },
  ];

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  return (
    <div className="min-h-screen bg-[#050B18] text-white p-8 lg:p-12 font-sans">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <img src="/src/assets/logo.png" className="w-20 h-20 object-contain" alt="Traveloop Logo" />
          <div>
            <p className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.6em] mb-2">Central Command</p>
            <h1 className="text-5xl font-black tracking-tighter uppercase">Admin Console</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[24px] border border-white/5">
           <Search className="text-white/20" size={20} />
           <input type="text" placeholder="Search archives..." className="bg-transparent border-none outline-none text-sm w-48 lg:w-64" />
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#0A1120] border border-white/5 p-10 rounded-[40px] shadow-2xl group hover:border-teal-500/30 transition-all">
              <div className={`${stat.color} mb-6 bg-black/20 w-fit p-4 rounded-2xl`}>
                <Icon size={32} />
              </div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Bar Chart Simulation */}
        <div className="lg:col-span-2 bg-[#0A1120] border border-white/5 p-10 rounded-[48px] shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
              <BarChart3 className="text-teal-400" />
              Trip Generation (Last 7 Days)
            </h2>
            <TrendingUp className="text-emerald-400" />
          </div>
          <div className="flex items-end justify-between h-64 gap-4 px-4">
            {[45, 62, 51, 89, 72, 95, 84].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <div 
                  className="w-full bg-gradient-to-t from-teal-500/20 to-teal-400 rounded-t-xl transition-all duration-1000 group hover:brightness-125"
                  style={{ height: `${val}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black bg-teal-400 text-black px-2 py-1 rounded">
                    {val}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0A1120] border border-white/5 p-10 rounded-[48px] shadow-2xl">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-8">Recent Expeditions</h2>
          <div className="space-y-6">
            {recentTrips.map(trip => (
              <div key={trip.id} className="flex items-center justify-between p-4 bg-white/5 rounded-3xl border border-white/5">
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-tight">{trip.user}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{trip.trip}</p>
                </div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">{trip.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-[#0A1120] border border-white/5 p-10 rounded-[48px] shadow-2xl overflow-hidden mb-12">
        <h2 className="text-xl font-bold uppercase tracking-tight mb-8 flex items-center gap-3">
          <Users className="text-amber-400" />
          Protocol Personnel (User Management)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
                <th className="pb-6 px-4">Identifier</th>
                <th className="pb-6 px-4">Archive Email</th>
                <th className="pb-6 px-4">Expeditions</th>
                <th className="pb-6 px-4">Status</th>
                <th className="pb-6 px-4 text-right">Commands</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(user => (
                <tr key={user.id} className="group hover:bg-white/5 transition-all">
                  <td className="py-6 px-4 font-bold uppercase tracking-tight">{user.name}</td>
                  <td className="py-6 px-4 text-white/40 text-sm italic">{user.email}</td>
                  <td className="py-6 px-4">
                    <span className="bg-teal-500/10 text-teal-400 text-[10px] font-black px-4 py-1 rounded-full border border-teal-500/20">
                      {user.trips} Trips
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 ${user.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      className={`p-3 rounded-xl transition-all ${user.status === 'Active' ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white'}`}
                    >
                      {user.status === 'Active' ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Cities Table */}
      <div className="bg-[#0A1120] border border-white/5 p-10 rounded-[48px] shadow-2xl overflow-hidden">
        <h2 className="text-xl font-bold uppercase tracking-tight mb-8">High-Value Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {popularCities.map((city, i) => (
            <div key={i} className="bg-black/20 p-8 rounded-[32px] border border-white/5 group hover:border-amber-500/30 transition-all">
              <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">Rank #{i+1}</h4>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{city.name}</h3>
              <p className="text-white/40 text-sm mb-6">{city.country}</p>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest pt-6 border-t border-white/5">
                <span className="text-teal-400">{city.trips} Hits</span>
                <span className="text-white/20">{city.cost} Cost</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
