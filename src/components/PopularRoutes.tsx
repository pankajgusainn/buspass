import React, { useState } from 'react';
import { TrendingUp, Bus, ArrowRight } from 'lucide-react';
import { popularRoutes } from '../data/routes';
import SearchResults from './SearchResults';
import { buses } from '../data/buses';

export default function PopularRoutes() {
  const [selectedRoute, setSelectedRoute] = useState<null | {
    from: string;
    to: string;
    date: string;
  }>(null);

  const handleBookNow = (from: string, to: string) => {
    // Set tomorrow as default date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];

    setSelectedRoute({
      from,
      to,
      date: formattedDate
    });
  };

  return (
    <>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">Popular Routes</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{route.from}</p>
                    <div className="flex items-center space-x-2 my-2">
                      <div className="h-0.5 flex-1 bg-red-100"></div>
                      <Bus className="h-4 w-4 text-red-600" />
                      <div className="h-0.5 flex-1 bg-red-100"></div>
                    </div>
                    <p className="font-semibold text-gray-800">{route.to}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Starting from</span>
                    <span className="text-lg font-bold text-red-600">₹{route.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Daily Trips</span>
                    <span className="font-medium">{route.dailyTrips}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{route.duration}</span>
                  </div>
                  <button
                    onClick={() => handleBookNow(route.from, route.to)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedRoute && (
        <SearchResults
          buses={buses}
          fromCity={selectedRoute.from}
          toCity={selectedRoute.to}
          date={selectedRoute.date}
          onClose={() => setSelectedRoute(null)}
        />
      )}
    </>
  );
}