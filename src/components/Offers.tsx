import React from 'react';
import { Tag, Percent } from 'lucide-react';
import { offers } from '../data/offers';

export default function Offers() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center space-x-2 mb-8">
        <Tag className="h-6 w-6 text-red-600" />
        <h2 className="text-2xl font-bold text-gray-800">Special Offers</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer, index) => (
          <div key={index} className="bg-gradient-to-r from-red-600 to-red-500 rounded-xl p-6 text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="text-red-100 mb-4">{offer.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="font-mono bg-white/20 px-3 py-1.5 rounded-lg">{offer.code}</span>
                  <button className="bg-white text-red-600 px-4 py-1.5 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
              <Percent className="h-12 w-12 opacity-80" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}