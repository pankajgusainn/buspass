import React, { useState } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { popularCities } from '../data/cities';
import { buses } from '../data/buses';
import SearchResults from './SearchResults';

export default function SearchForm() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const filteredFromCities = popularCities.filter(city =>
    city.toLowerCase().includes(fromCity.toLowerCase())
  );

  const filteredToCities = popularCities.filter(city =>
    city.toLowerCase().includes(toCity.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-black/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300 border border-red-900">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 transition-all duration-300 group-hover:scale-110" />
              <input
                type="text"
                placeholder="From City"
                value={fromCity}
                onChange={(e) => {
                  setFromCity(e.target.value);
                  setShowFromSuggestions(true);
                }}
                onFocus={() => setShowFromSuggestions(true)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900 text-gray-100 border border-red-900 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:bg-gray-800 placeholder-gray-500"
                required
              />
              {showFromSuggestions && fromCity && (
                <div className="absolute z-10 w-full mt-2 bg-gray-900 rounded-xl shadow-2xl border border-red-900">
                  {filteredFromCities.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-red-900/30 cursor-pointer first:rounded-t-xl last:rounded-b-xl transition-colors text-gray-100"
                      onClick={() => {
                        setFromCity(city);
                        setShowFromSuggestions(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 transition-all duration-300 group-hover:scale-110" />
              <input
                type="text"
                placeholder="To City"
                value={toCity}
                onChange={(e) => {
                  setToCity(e.target.value);
                  setShowToSuggestions(true);
                }}
                onFocus={() => setShowToSuggestions(true)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900 text-gray-100 border border-red-900 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:bg-gray-800 placeholder-gray-500"
                required
              />
              {showToSuggestions && toCity && (
                <div className="absolute z-10 w-full mt-2 bg-gray-900 rounded-xl shadow-2xl border border-red-900">
                  {filteredToCities.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-red-900/30 cursor-pointer first:rounded-t-xl last:rounded-b-xl transition-colors text-gray-100"
                      onClick={() => {
                        setToCity(city);
                        setShowToSuggestions(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 transition-all duration-300 group-hover:scale-110" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-12 pr-4 py-4 bg-gray-900 text-gray-100 border border-red-900 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:bg-gray-800"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="w-full md:w-auto md:px-16 bg-gradient-to-r from-red-700 to-red-600 text-gray-100 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:from-red-800 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl mx-auto group">
            <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Search Buses</span>
          </button>
        </form>
      </div>

      {showResults && (
        <SearchResults
          buses={buses}
          fromCity={fromCity}
          toCity={toCity}
          date={date}
          onClose={() => setShowResults(false)}
        />
      )}
    </>
  );
}