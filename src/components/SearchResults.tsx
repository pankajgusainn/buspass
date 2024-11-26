import React, { useState } from 'react';
import { Clock, Wifi, Coffee, ChevronRight } from 'lucide-react';
import SeatSelection from './SeatSelection';
import PaymentModal from './PaymentModal';

interface Bus {
  id: string;
  name: string;
  type: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  amenities: string[];
  rating: number;
}

interface SearchResultsProps {
  buses: Bus[];
  fromCity: string;
  toCity: string;
  date: string;
  onClose: () => void;
}

export default function SearchResults({ buses, fromCity, toCity, date, onClose }: SearchResultsProps) {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSeatSelection = (bus: Bus) => {
    setSelectedBus(bus);
  };

  const handleProceedToPayment = (selectedSeats: any[]) => {
    const total = selectedSeats.reduce((sum: number, seat: any) => sum + seat.price, 0);
    setTotalAmount(total);
    setSelectedBus(null);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    onClose();
    // You could show a success message or redirect to a booking confirmation page here
    alert('Booking confirmed! Thank you for choosing BusPass.');
  };

  if (!buses.length) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {fromCity} → {toCity}
                  </h2>
                  <p className="text-gray-600">{new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {buses.map((bus) => (
                <div key={bus.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{bus.name}</h3>
                      <p className="text-sm text-gray-600">{bus.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">₹{bus.price}</p>
                      <p className="text-sm text-gray-600">{bus.seatsAvailable} seats left</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <div>
                        <p className="text-lg font-semibold">{bus.departure}</p>
                        <p className="text-sm text-gray-600">{fromCity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-0.5 w-12 bg-gray-300"></div>
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{bus.duration}</span>
                        <div className="h-0.5 w-12 bg-gray-300"></div>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{bus.arrival}</p>
                        <p className="text-sm text-gray-600">{toCity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {bus.amenities.includes('wifi') && (
                        <Wifi className="h-4 w-4 text-gray-600" />
                      )}
                      {bus.amenities.includes('refreshments') && (
                        <Coffee className="h-4 w-4 text-gray-600" />
                      )}
                      <span className="text-sm text-gray-600">
                        {bus.rating} ★ Rated
                      </span>
                    </div>
                    <button 
                      onClick={() => handleSeatSelection(bus)}
                      className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <span>Select Seats</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedBus && (
        <SeatSelection
          onClose={() => setSelectedBus(null)}
          busName={selectedBus.name}
          basePrice={selectedBus.price}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          amount={totalAmount}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </>
  );
}