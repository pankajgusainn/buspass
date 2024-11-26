{/* Previous imports remain the same */}
import React, { useState } from 'react';
import { X, CreditCard, Wallet, QrCode, Check } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
  amount: number;
  onPaymentComplete: () => void;
}

interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface WalletDetails {
  upiId: string;
}

export default function PaymentModal({ onClose, amount, onPaymentComplete }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [walletDetails, setWalletDetails] = useState<WalletDetails>({
    upiId: ''
  });

  const handlePayment = () => {
    if (!paymentMethod) return;
    
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUPIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletDetails(prev => ({
      ...prev,
      upiId: e.target.value
    }));
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">Your booking has been confirmed.</p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold">₹{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm">{Math.random().toString(36).substring(2, 12).toUpperCase()}</span>
                </div>
              </div>
              <button
                onClick={onPaymentComplete}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                name="number"
                maxLength={16}
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={handleCardDetailsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  maxLength={3}
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 'upi':
        return (
          <div className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <input
                type="text"
                placeholder="username@upi"
                value={walletDetails.upiId}
                onChange={handleUPIChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <p className="text-sm text-gray-600">Or pay using QR code</p>
            <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
              <QrCode className="h-32 w-32 text-gray-400" />
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="space-y-4 mt-6">
            {[
              { name: 'Paytm', icon: '₹' },
              { name: 'PhonePe', icon: '₹' },
              { name: 'Google Pay', icon: '₹' }
            ].map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handlePayment()}
                className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 flex items-center justify-between"
              >
                <span className="font-medium">{wallet.name}</span>
                <span className="text-red-600 font-semibold">{wallet.icon}</span>
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-800">
                Total Amount: <span className="text-red-600">₹{amount}</span>
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-lg border-2 flex items-center space-x-3
                  ${paymentMethod === 'card' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
                  }`}
              >
                <CreditCard className={`h-6 w-6 ${paymentMethod === 'card' ? 'text-red-500' : 'text-gray-500'}`} />
                <span className="font-medium">Credit/Debit Card</span>
              </button>

              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 rounded-lg border-2 flex items-center space-x-3
                  ${paymentMethod === 'upi' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
                  }`}
              >
                <QrCode className={`h-6 w-6 ${paymentMethod === 'upi' ? 'text-red-500' : 'text-gray-500'}`} />
                <span className="font-medium">UPI Payment</span>
              </button>

              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`w-full p-4 rounded-lg border-2 flex items-center space-x-3
                  ${paymentMethod === 'wallet' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
                  }`}
              >
                <Wallet className={`h-6 w-6 ${paymentMethod === 'wallet' ? 'text-red-500' : 'text-gray-500'}`} />
                <span className="font-medium">Mobile Wallet</span>
              </button>
            </div>

            {renderPaymentForm()}

            {paymentMethod && paymentMethod !== 'wallet' && (
              <button
                onClick={handlePayment}
                disabled={processing}
                className={`w-full bg-red-600 text-white py-4 rounded-lg font-semibold mt-6
                  ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'} 
                  transition-colors`}
              >
                {processing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Pay Now'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}