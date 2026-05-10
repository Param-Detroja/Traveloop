import React from 'react';
import { Award, Star, TrendingUp, Gift, ShieldCheck, ChevronRight, Zap, Sparkles } from 'lucide-react';

const RewardsScreen = () => {
  const tiers = [
    { name: 'SILVER ARCHIVE', points: '0 - 5k', active: false },
    { name: 'GOLD SOVEREIGN', points: '5k - 10k', active: false },
    { name: 'ELITE PLATINUM', points: '10k - 50k', active: true },
    { name: 'BLACK LEGACY', points: '50k+', active: false },
  ];

  const rewards = [
    { id: 1, title: 'Lounge Access Archive', desc: 'Complimentary access to 1,200+ global lounges.', icon: ShieldCheck, cost: '2,500 pts' },
    { id: 2, title: 'Private Concierge', desc: '24/7 dedicated assistant for elite bookings.', icon: Zap, cost: '5,000 pts' },
    { id: 3, title: 'Yacht Charter Credit', desc: '$500 credit for Mediterranean charters.', icon: Gift, cost: '10,000 pts' },
  ];

  return (
    <div className="pb-32 pt-8 px-6 lg:px-12 max-w-4xl mx-auto w-full bg-[#050B18] animate-in fade-in duration-700">
      <header className="mb-16">
        <p className="text-[#fbbf24] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Capital Rewards</p>
        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-8">Elite Points</h1>
        
        <div className="bg-gradient-to-br from-[#0A1120] to-[#050B18] border border-[#fbbf24]/20 p-12 rounded-[56px] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbbf24]/5 blur-[100px] -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 text-[#fbbf24] mb-4">
              <Award size={32} />
              <span className="text-[10px] font-bold uppercase tracking-[0.6em]">Current Balance</span>
            </div>
            <div className="flex items-baseline gap-4">
              <h2 className="text-7xl font-black text-white tracking-tighter">12,450</h2>
              <span className="text-[#fbbf24] font-bold text-xl uppercase tracking-widest italic">PTS</span>
            </div>
            <div className="mt-8 h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-[#fbbf24] to-[#2dd4bf] w-[75%]" />
            </div>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-4">2,550 pts until Black Legacy tier</p>
          </div>
        </div>
      </header>

      {/* Tier Architecture */}
      <section className="mb-20">
        <h2 className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.5em] mb-10 ml-4">Tier Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map(tier => (
            <div key={tier.name} className={`p-8 rounded-[32px] border transition-all ${tier.active ? 'bg-[#fbbf24]/10 border-[#fbbf24]/40 shadow-[0_20px_40px_rgba(251,191,36,0.1)]' : 'bg-[#0A1120] border-white/5 opacity-40'}`}>
              <h3 className={`text-sm font-black uppercase tracking-widest mb-2 ${tier.active ? 'text-[#fbbf24]' : 'text-white'}`}>{tier.name}</h3>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{tier.points}</p>
              {tier.active && <div className="mt-4 flex items-center gap-2 text-[#fbbf24] text-[10px] font-black uppercase tracking-[0.3em]"><Star size={12} fill="currentColor" /> Active Tier</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.5em] mb-10 ml-4">Elite Redemptions</h2>
        <div className="space-y-6">
          {rewards.map(reward => {
            const Icon = reward.icon;
            return (
              <div key={reward.id} className="bg-[#0A1120] border border-white/5 p-10 rounded-[48px] flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-[#2dd4bf]/40 transition-all cursor-pointer shadow-2xl">
                <div className="flex items-center gap-8">
                  <div className="bg-[#050B18] p-6 rounded-3xl text-[#2dd4bf] group-hover:scale-110 transition-transform">
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">{reward.title}</h3>
                    <p className="text-white/40 text-lg font-medium">{reward.desc}</p>
                  </div>
                </div>
                <button className="bg-white/5 border border-white/10 text-[#fbbf24] px-10 py-5 rounded-[32px] font-black text-sm uppercase tracking-widest hover:bg-[#fbbf24] hover:text-black transition-all">
                  {reward.cost}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RewardsScreen;
