import React, { useState } from 'react';
import { MapPin, Calendar, Users, Compass, CheckCircle2 } from 'lucide-react';

const CreateTrip = ({ navigateTo }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    tripStyle: ''
  });

  const tripStyles = ['Relaxing', 'Adventure', 'Cultural', 'Foodie', 'Nightlife', 'Nature'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStyleSelect = (style) => {
    setFormData({ ...formData, tripStyle: style });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3); // Show success state
    setTimeout(() => {
      navigateTo('dashboard');
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#14b8a6]/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-[#14b8a6]" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Trip Created!</h2>
        <p className="text-gray-400 max-w-md">Your itinerary to {formData.destination || 'your dream destination'} is being prepared. We'll take you back to the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="pb-24 lg:pb-8 pt-8 px-6 lg:px-12 max-w-3xl mx-auto w-full">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Plan New Trip</h1>
          <p className="text-gray-400">Tell us about your next adventure.</p>
        </div>
        <div className="text-[#14b8a6] font-medium bg-[#14b8a6]/10 px-4 py-2 rounded-lg">
          Step {step} of 2
        </div>
      </header>

      <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="space-y-6">
        {step === 1 ? (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Where are you going?</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="text-gray-500" size={20} />
                </div>
                <input
                  type="text"
                  name="destination"
                  required
                  placeholder="e.g. Tokyo, Japan"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Start Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="text-gray-500" size={20} />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">End Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="text-gray-500" size={20} />
                  </div>
                  <input
                    type="date"
                    name="endDate"
                    required
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Number of Travelers</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Users className="text-gray-500" size={20} />
                </div>
                <input
                  type="number"
                  name="travelers"
                  min="1"
                  required
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-4 mt-8 bg-[#fbbf24] hover:bg-[#fcd34d] text-gray-900 rounded-xl font-bold shadow-lg shadow-[#fbbf24]/20 transition-all transform hover:-translate-y-0.5"
            >
              Next Step
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            {/* Trip Style */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300 ml-1 flex items-center gap-2">
                <Compass className="text-[#14b8a6]" size={18} />
                What's your travel style?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tripStyles.map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleStyleSelect(style)}
                    className={`py-4 px-2 rounded-xl border text-sm font-medium transition-all ${formData.tripStyle === style ? 'bg-[#14b8a6]/20 border-[#14b8a6] text-[#14b8a6] scale-105 shadow-lg shadow-[#14b8a6]/10' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!formData.tripStyle}
                className={`flex-[2] py-4 rounded-xl font-bold shadow-lg transition-all transform ${formData.tripStyle ? 'bg-gradient-to-r from-[#14b8a6] to-[#0d9488] hover:from-[#0d9488] hover:to-[#0f766e] text-white shadow-[#14b8a6]/25 hover:-translate-y-0.5' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
              >
                Generate Itinerary
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTrip;
