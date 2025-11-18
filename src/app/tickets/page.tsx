'use client';

import React from 'react';
import Link from 'next/link';
import { Ticket, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { useTicketHistory } from '@/context/TicketHistoryContext';
import QRCode from '@/components/QRCode';

export default function TicketsPage() {
  const { tickets, clearHistory } = useTicketHistory();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
              <Ticket className="w-8 h-8 text-primary" />
              <span>Biletlerim</span>
            </h1>
            <p className="text-gray-400 mt-1">
              {tickets.length} bilet
            </p>
          </div>
          {tickets.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Tüm bilet geçmişini silmek istediğinizden emin misiniz?')) {
                  clearHistory();
                }
              }}
              className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Geçmişi Temizle</span>
            </button>
          )}
        </div>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className="text-center py-16">
            <Ticket className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">Henüz biletiniz yok</p>
            <Link
              href="/movies"
              className="inline-block bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Filmlere Göz At
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-dark rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Poster */}
                  <div className="md:w-32 flex-shrink-0">
                    <img
                      src={ticket.moviePoster}
                      alt={ticket.movieTitle}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {ticket.movieTitle}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Bilet No: <span className="font-mono text-primary">{ticket.id}</span>
                        </p>
                      </div>
                      <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-medium">
                        Aktif
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="flex items-center space-x-1 text-gray-400 text-xs mb-1">
                          <Calendar className="w-3 h-3" />
                          <span>Tarih</span>
                        </div>
                        <p className="text-white text-sm">{ticket.date}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 text-gray-400 text-xs mb-1">
                          <Clock className="w-3 h-3" />
                          <span>Seans</span>
                        </div>
                        <p className="text-white text-sm">{ticket.showtime}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 text-gray-400 text-xs mb-1">
                          <MapPin className="w-3 h-3" />
                          <span>Koltuklar</span>
                        </div>
                        <p className="text-white text-sm">{ticket.seats.join(', ')}</p>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Toplam</div>
                        <p className="text-primary font-bold">{ticket.total} TL</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Satın alındı: {formatDate(ticket.purchaseDate)}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="p-4 bg-gray-800/50 flex items-center justify-center">
                    <QRCode
                      data={JSON.stringify({
                        id: ticket.id,
                        movie: ticket.movieTitle,
                        showtime: ticket.showtime,
                        seats: ticket.seats.join(','),
                      })}
                      size={100}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
