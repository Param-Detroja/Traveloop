import React, { useState } from 'react';
import { CheckSquare, Square, Plus, RotateCcw, Luggage, Umbrella, Camera, Shirt, Smartphone, FileText, Trash2 } from 'lucide-react';

const PackingChecklist = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Passport & Visas', category: 'Documents', checked: true },
    { id: 2, name: 'Linen Shirts', category: 'Clothing', checked: false },
    { id: 3, name: 'Noise Cancelling Headphones', category: 'Electronics', checked: true },
    { id: 4, name: 'Universal Adapter', category: 'Electronics', checked: false },
    { id: 5, name: 'Cash (Local Currency)', category: 'Documents', checked: false },
    { id: 6, name: 'Sunglasses', category: 'Other', checked: true },
    { id: 7, name: 'Leica Q3 Camera', category: 'Electronics', checked: false },
    { id: 8, name: 'Evening Suit', category: 'Clothing', checked: false },
    { id: 9, name: 'Health Insurance Card', category: 'Documents', checked: true },
    { id: 10, name: 'Power Bank', category: 'Electronics', checked: false },
  ]);

  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Clothing', 'Documents', 'Electronics', 'Other'];

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const resetAll = () => {
    setItems(items.map(item => ({ ...item, checked: false })));
  };

  const filteredItems = activeTab === 'All' ? items : items.filter(item => item.category === activeTab);

  const backupList = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "traveloop_packing_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    alert('SECURE ARCHIVE GENERATED: Packing list backup downloaded.');
  };

  return (
    <div className="pb-32 pt-8 px-6 lg:px-12 max-w-4xl mx-auto w-full bg-[#050B18] animate-in fade-in duration-700">
      <header className="flex justify-between items-end mb-12">
        <div>
          <p className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Inventory Sovereignty</p>
          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase">Packing Checklist</h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={backupList}
            className="bg-white/5 text-[#fbbf24] px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-[#fbbf24]/10 transition-all border border-[#fbbf24]/20"
          >
            Backup Archive
          </button>
          <button 
            onClick={resetAll}
            className="bg-white/5 text-white/40 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
          >
            <RotateCcw size={14} />
            Reset All
          </button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-4 mb-12 hide-scrollbar pb-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-[#2dd4bf] text-black border-[#2dd4bf] shadow-[0_10px_20px_rgba(45,212,191,0.2)]' 
                : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-4 mb-16">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="group flex items-center justify-between bg-[#0A1120] border border-white/5 p-8 rounded-[32px] cursor-pointer hover:border-[#fbbf24]/30 transition-all shadow-xl"
          >
            <div className="flex items-center gap-6">
              <div className={`transition-all duration-300 ${item.checked ? 'text-[#2dd4bf]' : 'text-white/10'}`}>
                {item.checked ? <CheckSquare size={28} strokeWidth={2.5} /> : <Square size={28} strokeWidth={2.5} />}
              </div>
              <div>
                <p className={`text-xl font-bold transition-all duration-500 ${item.checked ? 'text-white/20 line-through' : 'text-white'}`}>
                  {item.name}
                </p>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                  item.category === 'Clothing' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' :
                  item.category === 'Documents' ? 'text-purple-400 border-purple-400/20 bg-purple-400/5' :
                  item.category === 'Electronics' ? 'text-orange-400 border-orange-400/20 bg-orange-400/5' :
                  'text-gray-400 border-gray-400/20 bg-gray-400/5'
                }`}>
                  {item.category}
                </span>
              </div>
            </div>
            <Trash2 className="text-white/5 group-hover:text-red-500/40 transition-all" size={20} />
          </div>
        ))}
      </div>

      {/* Add Item Button */}
      <button className="w-full bg-white text-black py-8 rounded-[40px] font-black text-[10px] uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl">
        <Plus size={20} strokeWidth={3} />
        Add Item to Archive
      </button>
    </div>
  );
};

export default PackingChecklist;
