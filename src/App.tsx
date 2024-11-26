import React from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import PopularRoutes from './components/PopularRoutes';
import Offers from './components/Offers';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Header />
      
      {/* Hero Section with Animated Background */}
      <div className="relative">
        <div className="h-[500px] relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Adjusted overlay opacity and gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-red-900/40 to-black/60 mix-blend-multiply" />
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80" 
              alt="Hero Background" 
              className="w-full h-full object-cover object-center brightness-110 contrast-110"
            />
          </div>

          <div className="relative h-full">
            <div className="container mx-auto px-4">
              {/* Adjusted positioning and colors */}
              <div className="max-w-2xl ml-auto text-right pt-12"> {/* Changed pt-24 to pt-12 for higher positioning */}
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-yellow-300 via-red-300 to-pink-400 text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    Your Journey,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-pink-300 to-purple-400 text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    Your Comfort
                  </span>
                </h1>
                <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-red-200 to-pink-200 font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Book bus tickets for 10,000+ routes across India <br />
                  with India's most trusted bus booking platform
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form Section - Now positioned below the hero image */}
        <div className="container mx-auto px-4 -mt-24 relative z-10 mb-16">
          <SearchForm />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black py-12 shadow-inner border-t border-red-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Routes' },
              { number: '2M+', label: 'Happy Customers' },
              { number: '500+', label: 'Bus Partners' },
              { number: '24/7', label: 'Customer Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PopularRoutes />
      <Offers />
    </div>
  );
}

export default App;