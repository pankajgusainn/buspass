import React from 'react';
import { Bus, Menu } from 'lucide-react';
import BusAnimation from './BusAnimation';

export default function Header() {
  return (
    <header className="bg-black text-gray-100 py-4 sticky top-0 z-50 shadow-lg border-b border-red-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold text-red-500">BusPass</span>
            </div>
            {/* Bus Animation Container */}
            <div className="hidden md:block w-48 h-16 overflow-hidden">
              <BusAnimation />
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-red-400 transition-colors">Help</a>
            <a href="#" className="hover:text-red-400 transition-colors">My Bookings</a>
            <button className="bg-red-600 text-gray-100 px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors shadow-md">
              Sign In
            </button>
          </nav>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}