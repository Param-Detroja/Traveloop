import React, { useState } from 'react';
import { Home, Compass, Map, User, Luggage, StickyNote, Share2, Award } from 'lucide-react';
import AuthScreen from './AuthScreen';
import Dashboard from './Dashboard';
import MyTrips from './MyTrips';
import CreateTrip from './CreateTrip';
import ProfileSettings from './ProfileSettings';
import SharedItinerary from './SharedItinerary';
import PackingChecklist from './PackingChecklist';
import TripNotes from './TripNotes';
import RewardsScreen from './RewardsScreen';

function App() {
  const [currentView, setCurrentView] = useState('auth'); // auth, dashboard, trips, create, search, profile

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  if (currentView === 'auth') {
    return (
      <div className="relative">
        <AuthScreen onLogin={() => navigateTo('dashboard')} />
      </div>
    );
  }

  // Define navigation items
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'trips', icon: Map, label: 'My Trips' },
    { id: 'packing', icon: Luggage, label: 'Packing' },
    { id: 'notes', icon: StickyNote, label: 'Notes' },
    { id: 'rewards', icon: Award, label: 'Rewards' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] font-sans selection:bg-[#14b8a6] selection:text-white pb-20">
      
      {/* Main Content Area */}
      <main className="w-full">
        {currentView === 'dashboard' && <Dashboard navigateTo={navigateTo} />}
        {currentView === 'trips' && <MyTrips />}
        {currentView === 'create' && <CreateTrip navigateTo={navigateTo} />}
        {currentView === 'search' && <div className="text-white text-center pt-20 text-xl font-bold text-gray-400">Search Destinations<br/><span className="text-sm font-normal text-gray-500">(Coming Soon)</span></div>}
        {(currentView === 'profile' || currentView === 'settings') && <ProfileSettings navigateTo={navigateTo} />}
        {currentView === 'shared' && <SharedItinerary navigateTo={navigateTo} />}
        {currentView === 'packing' && <PackingChecklist />}
        {currentView === 'notes' && <TripNotes />}
        {currentView === 'rewards' && <RewardsScreen />}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0B1120]/90 backdrop-blur-md border-t border-white/10 z-50 px-6 py-3 pb-safe sm:py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'dashboard' && currentView === 'create');
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col items-center gap-1.5 transition-colors p-2 rounded-xl ${isActive ? 'text-[#14b8a6]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
              >
                <div className={`relative ${isActive ? 'scale-110 transition-transform' : ''}`}>
                  <Icon size={24} className={isActive ? 'drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]' : ''} />
                  {isActive && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#14b8a6] rounded-full"></span>}
                </div>
                <span className="text-[10px] font-medium tracking-wide mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;
