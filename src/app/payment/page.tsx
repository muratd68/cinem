'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMovies } from '@/context/MovieContext';
import { ArrowLeft, CreditCard, Lock, Check, Ticket } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const { selectedMovie, selectedShowtime, selectedSeats, setSelectedSeats } = useMovies();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
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
          <h1 className="text-2xl font-bold text-white mb-4">Ödeme bilgisi bulunamadı</h1>
          <Link href="/movies" className="text-primary hover:underline">
            Filmlere dön
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleFinish = () => {
    setSelectedSeats([]);
    router.push('/');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-dark rounded-xl p-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Ödeme Başarılı!</h1>
            <p className="text-gray-400 mb-6">
              Biletiniz başarıyla oluşturuldu. E-posta adresinize bilet detayları gönderildi.
            </p>

            <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center space-x-3 mb-4">
                <Ticket className="w-6 h-6 text-primary" />
                <span className="font-semibold text-white">Bilet Detayları</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Film</span>
                  <span className="text-white">{selectedMovie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seans</span>
                  <span className="text-white">{selectedShowtime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Koltuklar</span>
                  <span className="text-white">{selectedSeats.sort().join(', ')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <span className="text-gray-400">Toplam</span>
                  <span className="text-primary font-bold">{calculateTotal()} TL</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Ana Sayfaya Dön
            </button>
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
            <h1 className="text-2xl font-bold text-white">Ödeme</h1>
            <p className="text-gray-400">Güvenli ödeme sayfası</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-dark rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-white">Kart Bilgileri</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Kart Numarası</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Kart Üzerindeki İsim</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="AD SOYAD"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Son Kullanma</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-white font-medium mb-4">İletişim Bilgileri</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">E-posta</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ornek@email.com"
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="05XX XXX XX XX"
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-6 text-gray-400 text-sm">
                <Lock className="w-4 h-4" />
                <span>256-bit SSL ile güvenli ödeme</span>
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
                {isProcessing ? 'İşleniyor...' : `${calculateTotal()} TL Öde`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-dark rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-4">Sipariş Özeti</h2>

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
                  <span className="text-gray-400">Tarih</span>
                  <span className="text-white">Bugün</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seans</span>
                  <span className="text-white">{selectedShowtime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Koltuklar</span>
                  <span className="text-white">{selectedSeats.sort().join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bilet Adedi</span>
                  <span className="text-white">{selectedSeats.length}</span>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Toplam</span>
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
