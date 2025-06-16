import React, { useState } from 'react';
import { Dumbbell, Calendar, User, Phone, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">Every Day Strive Living</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  activeSection === 'home' ? 'bg-orange-500 text-white' : 'hover:bg-gray-800'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => onNavigate('calendar')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  activeSection === 'calendar' ? 'bg-orange-500 text-white' : 'hover:bg-gray-800'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Book Session</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  activeSection === 'contact' ? 'bg-orange-500 text-white' : 'hover:bg-gray-800'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>Contact</span>
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-gray-300">
                  Welcome, {user.name}
                </span>
              )}
              <button
                onClick={handleAuthClick}
                className="flex items-center space-x-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
              >
                {user ? (
                  <>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}