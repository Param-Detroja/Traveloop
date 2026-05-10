"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Clock, StickyNote, Sparkles, ChevronLeft, X, Save } from 'lucide-react';

export default function TripNotesPage() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Hidden Bistro in Paris',
      content: 'Found a tiny bistro near Canal Saint-Martin. Their Duck Confit is the best I have ever had. Need to book a week in advance for dinner.',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      title: 'Vatican Early Entry',
      content: 'The 7:30 AM entry is worth every penny. We had the Gallery of Maps almost to ourselves for about 20 minutes.',
      timestamp: 'Yesterday',
    },
    {
      id: 3,
      title: 'Flight Upgrade Strategy',
      content: 'Checking in exactly 24h before flight usually opens up the bulkhead seats. Keep an eye on the seat map.',
      timestamp: '3 days ago',
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (!newNote.title || !newNote.content) return;
    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      timestamp: 'Just now'
    };
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '' });
    setIsModalOpen(false);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="bg-[#050B18] min-h-screen text-white font-sans pb-32">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest mb-12">
          <ChevronLeft size={16} /> Back to Dashboard
        </Link>

        <header className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[#2dd4bf] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Expedition Log</p>
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase">Trip Notes</h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#fbbf24] text-black px-8 py-4 rounded-[28px] font-black text-[10px] uppercase tracking-widest shadow-[0_15px_30px_rgba(251,191,36,0.2)] hover:scale-105 transition-all flex items-center gap-3"
          >
            <Plus size={18} strokeWidth={3} />
            Add Note
          </button>
        </header>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-[#0A1120] border border-white/10 w-full max-w-lg rounded-[48px] p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbbf24]/5 blur-3xl -mr-16 -mt-16"></div>
               <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-white/20 hover:text-white">
                  <X size={24} />
               </button>
               <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">Initialize Memory</h2>
               <div className="space-y-6">
                  <input 
                    type="text" 
                    placeholder="Note Title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg font-bold outline-none focus:border-[#fbbf24] transition-all"
                  />
                  <textarea 
                    placeholder="Note content..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg font-medium outline-none focus:border-[#fbbf24] transition-all h-40 resize-none"
                  ></textarea>
                  <button 
                    onClick={addNote}
                    className="w-full bg-[#2dd4bf] text-black py-6 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
                  >
                    <Save size={18} />
                    Archive Memory
                  </button>
               </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {notes.map(note => (
            <div key={note.id} className="bg-[#0A1120] border border-white/5 p-10 rounded-[48px] hover:border-[#2dd4bf]/40 transition-all group flex flex-col shadow-2xl h-fit">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#2dd4bf]/10 p-4 rounded-2xl text-[#2dd4bf]">
                  <StickyNote size={24} />
                </div>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-red-500 hover:bg-red-500/10">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-[#2dd4bf] transition-colors">{note.title}</h3>
              <p className="text-white/40 text-lg font-medium leading-relaxed mb-8 flex-grow italic">
                "{note.content}"
              </p>
              <div className="flex items-center gap-3 text-white/20 text-[10px] font-bold uppercase tracking-widest pt-6 border-t border-white/5">
                <Clock size={14} />
                {note.timestamp}
              </div>
            </div>
          ))}

          {/* Empty State Card */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="bg-transparent border-2 border-dashed border-white/5 p-10 rounded-[48px] flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#fbbf24]/20 transition-all min-h-[350px]"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/10 group-hover:text-[#fbbf24]/40 transition-all mb-6">
              <Sparkles size={40} />
            </div>
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Initialize New Memory</p>
          </div>
        </div>
      </div>
    </div>
  );
}
