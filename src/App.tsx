import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Calendar from './components/Calendar';
import Contact from './components/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleBookNow = () => {
    setActiveSection('calendar');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero onBookNow={handleBookNow} />
            <Services />
          </>
        );
      case 'calendar':
        return <Calendar />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero onBookNow={handleBookNow} />
            <Services />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header activeSection={activeSection} onNavigate={handleNavigate} />
        {renderContent()}
        
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2025 Every Day Strive Living. All rights reserved. | Transforming lives through fitness.
            </p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;