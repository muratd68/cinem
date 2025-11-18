'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMovies } from '@/context/MovieContext';
import { ArrowLeft, Monitor, Info } from 'lucide-react';
import Link from 'next/link';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const seatsPerRow = 12;

// Simulated occupied seats
const occupiedSeats = ['A3', 'A4', 'B7', 'B8', 'C5', 'D10', 'E2', 'E3', 'F6', 'G8', 'G9', 'H1'];
const vipRows = ['G', 'H'];

export default function SeatsPage() {
  const router = useRouter();
  const { selectedMovie, selectedShowtime, selectedSeats, setSelectedSeats } = useMovies();
  const [localSelectedSeats, setLocalSelectedSeats] = useState<string[]>(selectedSeats);

  if (!selectedMovie || !selectedShowtime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lütfen önce bir film ve seans seçin</h1>
          <Link href="/movies" className="text-primary hover:underline">
            Filmlere dön
          </Link>
        </div>
      </div>
    );
  }

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;

    setLocalSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatStatus = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (localSelectedSeats.includes(seatId)) return 'selected';
    if (vipRows.includes(seatId[0])) return 'vip';
    return 'available';
  };

  const calculateTotal = () => {
    let total = 0;
    localSelectedSeats.forEach((seat) => {
      if (vipRows.includes(seat[0])) {
        total += selectedMovie.price * 1.5;
      } else {
        total += selectedMovie.price;
      }
    });
    return total;
  };

  const handleContinue = () => {
    if (localSelectedSeats.length === 0) {
      alert('Lütfen en az bir koltuk seçin');
      return;
    }
    setSelectedSeats(localSelectedSeats);
    router.push('/payment');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href={`/movie/${selectedMovie.id}`}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{selectedMovie.title}</h1>
            <p className="text-gray-400">Seans: {selectedShowtime}</p>
          </div>
        </div>

        {/* Screen */}
        <div className="mb-12">
          <div className="relative">
            <div className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2" />
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Monitor className="w-5 h-5" />
              <span className="text-sm">PERDE</span>
            </div>
          </div>
        </div>

        {/* Seats Grid */}
        <div className="bg-dark rounded-xl p-6 mb-8">
          <div className="flex flex-col items-center space-y-3">
            {rows.map((row) => (
              <div key={row} className="flex items-center space-x-2">
                <span className="w-6 text-gray-400 text-sm font-medium">{row}</span>
                <div className="flex space-x-2">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const status = getSeatStatus(seatId);

                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        disabled={status === 'occupied'}
                        className={`seat ${
                          status === 'occupied'
                            ? 'seat-occupied'
                            : status === 'selected'
                            ? 'seat-selected'
                            : status === 'vip'
                            ? 'seat-vip'
                            : 'seat-available'
                        }`}
                        title={seatId}
                      />
                    );
                  })}
                </div>
                <span className="w-6 text-gray-400 text-sm font-medium">{row}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-t-lg bg-gray-600" />
              <span className="text-gray-400 text-sm">Boş</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-t-lg bg-primary" />
              <span className="text-gray-400 text-sm">Seçili</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-t-lg bg-gray-800" />
              <span className="text-gray-400 text-sm">Dolu</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-t-lg bg-accent" />
              <span className="text-gray-400 text-sm">VIP (+50%)</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-dark rounded-xl p-6">
          <div className="flex items-start space-x-3 mb-4 p-3 bg-gray-800 rounded-lg">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-gray-400 text-sm">
              Seçtiğiniz koltuklar için biletler sadece bugün için geçerlidir. İptal ve değişiklik için en az 2 saat önce işlem yapılmalıdır.
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Seçilen Koltuklar</p>
              <p className="text-white font-medium">
                {localSelectedSeats.length > 0
                  ? localSelectedSeats.sort().join(', ')
                  : 'Henüz koltuk seçilmedi'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Toplam</p>
              <p className="text-2xl font-bold text-primary">{calculateTotal()} TL</p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={localSelectedSeats.length === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              localSelectedSeats.length > 0
                ? 'bg-primary hover:bg-secondary text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Ödemeye Geç ({localSelectedSeats.length} bilet)
          </button>
        </div>
      </div>
    </div>
  );
}
