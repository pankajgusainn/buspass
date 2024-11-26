import React from 'react';

export default function BusAnimation() {
  return (
    <div className="relative w-full h-full">
      {/* Road Background */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-800">
        {/* Animated Road Lines */}
        <div className="absolute inset-0 flex animate-road">
          <div className="flex-none w-[200%] flex items-center relative h-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-8 bg-yellow-400"
                style={{
                  left: `${i * 100}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animated Bus */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 animate-bus scale-75">
        {/* Bus Body */}
        <div className="relative">
          {/* Main Body */}
          <div className="w-32 h-16 bg-gradient-to-b from-red-500 to-red-600 rounded-xl shadow-xl relative">
            {/* Windows */}
            <div className="absolute top-2 left-2 right-8 h-6 flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-black/20 rounded-lg overflow-hidden"
                >
                  <div className="h-full w-full bg-gradient-to-b from-white/30 to-transparent" />
                </div>
              ))}
            </div>

            {/* Front Window */}
            <div className="absolute top-2 right-2 w-5 h-6 bg-black/20 rounded-tr-lg skew-x-[20deg]">
              <div className="h-full w-full bg-gradient-to-b from-white/30 to-transparent" />
            </div>

            {/* Door */}
            <div className="absolute bottom-1 right-10 w-4 h-8 bg-black/10 rounded">
              <div className="w-full h-full border border-white/20 rounded" />
            </div>

            {/* Lights */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full">
              <div className="absolute inset-0 bg-yellow-300/50 rounded-full animate-pulse" />
            </div>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-300 rounded-full">
              <div className="absolute inset-0 bg-red-300/50 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Wheels */}
          <div className="absolute -bottom-1 left-5">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 bg-gray-800 rounded-full animate-wheel">
                <div className="absolute inset-1 bg-gray-600 rounded-full">
                  <div className="absolute inset-[35%] bg-gray-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-1 right-5">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 bg-gray-800 rounded-full animate-wheel">
                <div className="absolute inset-1 bg-gray-600 rounded-full">
                  <div className="absolute inset-[35%] bg-gray-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}