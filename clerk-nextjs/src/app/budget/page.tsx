"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Wallet, TrendingUp, AlertCircle, DollarSign, PieChart as PieIcon, BarChart3, ArrowUpRight } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';

export default function BudgetScreen() {
  const [userBudget, setUserBudget] = useState(2000);
  const totalCost = 1450;
  const progress = (totalCost / userBudget) * 100;

  const pieData = [
    { name: 'Transport', value: 300, color: '#2dd4bf' },
    { name: 'Stay', value: 600, color: '#fbbf24' },
    { name: 'Activities', value: 350, color: '#14b8a6' },
    { name: 'Meals', value: 200, color: '#f59e0b' },
  ];

  const barData = [
    { day: 'D1', cost: 120 },
    { day: 'D2', cost: 180 },
    { day: 'D3', cost: 140 },
    { day: 'D4', cost: 220 }, // Exceeds budget if daily limit < 200
    { day: 'D5', cost: 150 },
    { day: 'D6', cost: 170 },
    { day: 'D7', cost: 190 },
    { day: 'D8', cost: 130 },
    { day: 'D9', cost: 150 },
  ];

  const dailyBudget = userBudget / 9;

  return (
    <div className="bg-[#050B18] min-h-screen w-full text-white font-sans pb-32">
      
      {/* Header Area */}
      <div className="max-w-6xl mx-auto pt-20 px-6">
        <Link href="/" className="flex items-center gap-2 text-[#2dd4bf]/60 hover:text-[#2dd4bf] transition-all uppercase text-[10px] font-black tracking-widest mb-10">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <header className="mb-16">
          <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Financial Protocol</p>
          <h1 className="text-4xl md:text-6xl font-normal tracking-[0.1em] font-cinzel uppercase mb-8">
            Trip Budget
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="bg-[#0A1120] border border-white/5 p-12 rounded-[56px] shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#fbbf24]/5 rounded-full blur-3xl"></div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Estimated Total Cost</p>
                <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-4">${totalCost}</h2>
                <div className="flex items-center gap-3 text-[#2dd4bf]">
                   <TrendingUp size={20} />
                   <span className="text-sm font-bold uppercase tracking-widest">Efficiency: 88%</span>
                </div>
             </div>

             <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[40px]">
                   <div className="flex justify-between items-center mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Set Total Budget</p>
                      <span className="text-xl font-black text-[#fbbf24]">${userBudget}</span>
                   </div>
                   <input 
                     type="range" 
                     min="1000" 
                     max="5000" 
                     step="100"
                     value={userBudget}
                     onChange={(e) => setUserBudget(parseInt(e.target.value))}
                     className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#fbbf24] mb-6"
                   />
                   <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                         <span>Utilization</span>
                         <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                         <div 
                           className={`h-full rounded-full transition-all duration-1000 ${progress > 90 ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-[#2dd4bf]'}`} 
                           style={{ width: `${Math.min(progress, 100)}%` }}
                         ></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </header>

        {/* ALERT BANNER */}
        {barData.some(d => d.cost > dailyBudget) && (
           <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-[32px] mb-12 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-red-500 p-3 rounded-2xl text-white">
                 <AlertCircle size={20} />
              </div>
              <div>
                 <h4 className="text-sm font-black text-white uppercase tracking-widest">Budget Deviation Detected</h4>
                 <p className="text-red-500/60 text-xs font-bold uppercase tracking-wider">Days 4 exceeds the calculated daily limit of ${Math.round(dailyBudget)}.</p>
              </div>
           </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
           {/* PIE CHART SECTION */}
           <div className="bg-[#0A1120] border border-white/5 rounded-[56px] p-12 shadow-2xl flex flex-col items-center">
              <h3 className="text-xl font-bold uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                 <PieIcon size={20} className="text-[#2dd4bf]" />
                 Expense Distribution
              </h3>
              <div className="w-full h-80">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                         data={pieData}
                         innerRadius={80}
                         outerRadius={120}
                         paddingAngle={8}
                         dataKey="value"
                         stroke="none"
                       >
                          {pieData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#0A1120', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} 
                         itemStyle={{ color: '#fff' }}
                       />
                       <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* BAR CHART SECTION */}
           <div className="bg-[#0A1120] border border-white/5 rounded-[56px] p-12 shadow-2xl flex flex-col items-center">
              <h3 className="text-xl font-bold uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                 <BarChart3 size={20} className="text-[#fbbf24]" />
                 Daily Spend Analysis
              </h3>
              <div className="w-full h-80">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                       <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 10, fontWeight: 800}} />
                       <YAxis hide />
                       <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0A1120', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }} />
                       <Bar dataKey="cost" radius={[12, 12, 12, 12]} barSize={20}>
                          {barData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.cost > dailyBudget ? '#ef4444' : '#2dd4bf'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* COST TABLE */}
        <div className="bg-[#0A1120] border border-white/5 rounded-[56px] p-12 shadow-2xl mb-20">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-bold uppercase tracking-widest">Protocol Breakdown</h3>
              <div className="bg-[#2dd4bf]/10 px-6 py-3 rounded-2xl">
                 <span className="text-[10px] font-bold text-[#2dd4bf] uppercase tracking-widest">Avg. $161 / Day</span>
              </div>
           </div>

           <div className="space-y-4">
              {pieData.map((row) => (
                 <div key={row.name} className="flex items-center justify-between p-8 bg-white/5 rounded-[32px] hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-6">
                       <div className="w-4 h-4 rounded-full" style={{ backgroundColor: row.color }}></div>
                       <span className="text-lg font-bold uppercase tracking-tight">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-10">
                       <span className="text-white/40 text-sm font-bold">{Math.round((row.value / totalCost) * 100)}%</span>
                       <span className="text-2xl font-black text-white">${row.value}</span>
                       <ArrowUpRight size={20} className="text-white/20 group-hover:text-[#2dd4bf] transition-colors" />
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
