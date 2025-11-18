'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMovies } from '@/context/MovieContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, CreditCard, Lock, Check, Ticket, Download } from 'lucide-react';
import Link from 'next/link';
import QRCode from '@/components/QRCode';
import {
  validateEmail,
  validatePhone,
  validateCardNumber,
  validateCVV,
  validateExpiry,
  formatCardNumber,
  formatExpiry,
  formatPhone,
} from '@/utils/validation';

export default function PaymentPage() {
  const router = useRouter();
  const { selectedMovie, selectedShowtime, selectedSeats, setSelectedSeats } = useMovies();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    email: '',
    phone: '',
  });

  if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('paymentNotFound')}</h1>
          <Link href="/movies" className="text-primary hover:underline">
            {t('backToMovies')}
          </Link>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    const vipRows = ['G', 'H'];
    let total = 0;
    selectedSeats.forEach((seat) => {
      if (vipRows.includes(seat[0])) {
        total += selectedMovie.price * 1.5;
      } else {
        total += selectedMovie.price;
      }
    });
    return total;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format inputs
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = t('invalidCard');
    }
    if (!formData.cardName.trim()) {
      newErrors.cardName = t('required');
    }
    if (!validateExpiry(formData.expiry)) {
      newErrors.expiry = t('invalidExpiry');
    }
    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = t('invalidCVV');
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = t('invalidEmail');
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = t('invalidPhone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate ticket ID
    const newTicketId = `CM${Date.now().toString(36).toUpperCase()}`;
    setTicketId(newTicketId);

    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleFinish = () => {
    setSelectedSeats([]);
    router.push('/');
  };

  const generateQRData = () => {
    return JSON.stringify({
      ticketId,
      movie: selectedMovie.title,
      showtime: selectedShowtime,
      seats: selectedSeats.sort().join(','),
      total: calculateTotal(),
      date: new Date().toISOString().split('T')[0],
    });
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-dark rounded-xl p-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('paymentSuccess')}</h1>
            <p className="text-gray-400 mb-6">{t('ticketCreated')}</p>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <QRCode data={generateQRData()} size={180} />
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Bilet No: <span className="text-primary font-mono">{ticketId}</span>
            </p>

            <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center space-x-3 mb-4">
                <Ticket className="w-6 h-6 text-primary" />
                <span className="font-semibold text-white">{t('ticketDetails')}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('movie')}</span>
                  <span className="text-white">{selectedMovie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('date')}</span>
                  <span className="text-white">{t('today')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('sessions')}</span>
                  <span className="text-white">{selectedShowtime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('selectedSeats')}</span>
                  <span className="text-white">{selectedSeats.sort().join(', ')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <span className="text-gray-400">{t('total')}</span>
                  <span className="text-primary font-bold">{calculateTotal()} TL</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleFinish}
                className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {t('backToHome')}
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>{t('downloadQR')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href={`/seats/${selectedMovie.id}`}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{t('payment')}</h1>
            <p className="text-gray-400">{t('securePayment')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-dark rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-white">{t('cardInfo')}</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">{t('cardNumber')}</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.cardNumber ? 'ring-2 ring-red-500' : 'focus:ring-primary'
                    }`}
                    maxLength={19}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">{t('cardName')}</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="AD SOYAD"
                    className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.cardName ? 'ring-2 ring-red-500' : 'focus:ring-primary'
                    }`}
                  />
                  {errors.cardName && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{t('expiry')}</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                        errors.expiry ? 'ring-2 ring-red-500' : 'focus:ring-primary'
                      }`}
                      maxLength={5}
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">{t('cvv')}</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                        errors.cvv ? 'ring-2 ring-red-500' : 'focus:ring-primary'
                      }`}
                      maxLength={4}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-white font-medium mb-4">{t('contactInfo')}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">{t('email')}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ornek@email.com"
                        className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                          errors.email ? 'ring-2 ring-red-500' : 'focus:ring-primary'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">{t('phone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="05XX XXX XX XX"
                        className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                          errors.phone ? 'ring-2 ring-red-500' : 'focus:ring-primary'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-6 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>{t('secureSSL')}</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                  isProcessing
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-secondary text-white'
                }`}
              >
                {isProcessing ? t('processing') : `${calculateTotal()} TL ${t('pay')}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-dark rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-4">{t('orderSummary')}</h2>

              <div className="flex items-start space-x-4 mb-4 pb-4 border-b border-gray-800">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-16 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-white font-medium">{selectedMovie.title}</h3>
                  <p className="text-gray-400 text-sm">{selectedMovie.duration}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('date')}</span>
                  <span className="text-white">{t('today')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('sessions')}</span>
                  <span className="text-white">{selectedShowtime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('selectedSeats')}</span>
                  <span className="text-white">{selectedSeats.sort().join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t('ticketCount')}</span>
                  <span className="text-white">{selectedSeats.length}</span>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{t('total')}</span>
                  <span className="text-2xl font-bold text-primary">{calculateTotal()} TL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
