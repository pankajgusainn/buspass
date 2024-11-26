import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';

interface Seat {
  id: string;
  number: string;
  status: 'available' | 'booked' | 'selected';
  gender: 'male' | 'female' | null;
  price: number;
  position: 'lower' | 'upper';
}

interface SeatSelectionProps {
  onClose: () => void;
  busName: string;
  basePrice: number;
  onProceedToPayment: (selectedSeats: Seat[]) => void;
}

const generateSeats = (basePrice: number, position: 'lower' | 'upper'): Seat[] => {
  const seats: Seat[] = [];
  const rows = 4;
  const seatsPerRow = 6;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < seatsPerRow; col++) {
      // Skip middle aisle seats
      if (col === 2 || col === 3) continue;
      
      const seatNumber = `${position === 'lower' ? 'L' : 'U'}${row + 1}${col + 1}`;
      seats.push({
        id: `${position}-${row}-${col}`,
        number: seatNumber,
        status: Math.random() > 0.3 ? 'available' : 'booked',
        gender: null,
        price: basePrice + (position === 'upper' ? 50 : 0),
        position
      });
    }
  }
  return seats;
};

export default function SeatSelection({ onClose, busName, basePrice, onProceedToPayment }: SeatSelectionProps) {
  const [activeLevel, setActiveLevel] = useState<'lower' | 'upper'>('lower');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [lowerDeckSeats] = useState<Seat[]>(() => generateSeats(basePrice, 'lower'));
  const [upperDeckSeats] = useState<Seat[]>(() => generateSeats(basePrice, 'upper'));

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;

    setSelectedSeats(prev => {
      const isSelected = prev.find(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      }
      return [...prev, { ...seat, status: 'selected' }];
    });
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'booked') return 'bg-gray-300 cursor-not-allowed';
    if (selectedSeats.find(s => s.id === seat.id)) return 'bg-red-500 text-white';
    return 'bg-white hover:bg-red-100';
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{busName}</h2>
                <p className="text-gray-600">Select your seats</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveLevel('lower')}
                className={`px-6 py-2 rounded-lg font-medium ${
                  activeLevel === 'lower'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Lower Deck
              </button>
              <button
                onClick={() => setActiveLevel('upper')}
                className={`px-6 py-2 rounded-lg font-medium ${
                  activeLevel === 'upper'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Upper Deck
              </button>
            </div>

            <div className="flex space-x-8">
              <div className="flex-1">
                <div className="bg-gray-50 p-8 rounded-xl">
                  <div className="grid grid-cols-6 gap-4">
                    {(activeLevel === 'lower' ? lowerDeckSeats : upperDeckSeats).map((seat, index) => (
                      <React.Fragment key={seat.id}>
                        {/* Add aisle gap */}
                        {index % 4 === 2 && <div className="col-span-2" />}
                        <button
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.status === 'booked'}
                          className={`
                            w-12 h-12 rounded-lg border-2 border-gray-300 
                            flex items-center justify-center font-medium
                            transition-colors duration-200
                            ${getSeatColor(seat)}
                          `}
                        >
                          {seat.number}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-80">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Selected Seats</h3>
                  {selectedSeats.length === 0 ? (
                    <p className="text-gray-500">No seats selected</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6">
                        {selectedSeats.map(seat => (
                          <div key={seat.id} className="flex justify-between items-center">
                            <span>Seat {seat.number}</span>
                            <span className="font-semibold">₹{seat.price}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-300 pt-3">
                          <div className="flex justify-between items-center font-semibold">
                            <span>Total</span>
                            <span className="text-red-600">
                              ₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onProceedToPayment(selectedSeats)}
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>Proceed to Payment</span>
                        <CreditCard className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-6 bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Seat Legend</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white border-2 border-gray-300"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500 border-2 border-red-500"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-300 border-2 border-gray-300"></div>
                      <span>Booked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}