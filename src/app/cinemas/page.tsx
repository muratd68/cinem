'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Navigation, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cinemas, Cinema } from '@/data/cinemas';

interface CinemaWithDistance extends Cinema {
  distance?: number;
}

export default function CinemasPage() {
  const { t } = useLanguage();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortedCinemas, setSortedCinemas] = useState<CinemaWithDistance[]>(cinemas);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(t('locationError'));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // Calculate distances and sort
        const cinemasWithDistance = cinemas.map((cinema) => ({
          ...cinema,
          distance: calculateDistance(latitude, longitude, cinema.lat, cinema.lng),
        }));

        cinemasWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        setSortedCinemas(cinemasWithDistance);
        setLoading(false);
      },
      () => {
        setError(t('locationDenied'));
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    // Try to get location on page load
    getLocation();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('findCinema')}</h1>
          <p className="text-gray-400">{t('nearestCinemas')}</p>
        </div>

        {/* Location Button */}
        <div className="mb-8">
          <button
            onClick={getLocation}
            disabled={loading}
            className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Navigation className="w-5 h-5" />
            )}
            <span>{t('getLocation')}</span>
          </button>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          {userLocation && (
            <p className="text-green-500 mt-2 text-sm">
              {t('distance')}: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          )}
        </div>

        {/* Cinemas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCinemas.map((cinema) => (
            <div
              key={cinema.id}
              className="bg-dark rounded-xl p-6 hover:ring-2 hover:ring-primary transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{cinema.name}</h3>
                {cinema.distance !== undefined && (
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-medium">
                    {cinema.distance.toFixed(1)} km
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">{cinema.address}, {cinema.city}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{cinema.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {cinema.features.map((feature) => (
                  <span
                    key={feature}
                    className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <span className="text-gray-400 text-sm">
                  {cinema.halls} {t('halls')}
                </span>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${cinema.lat},${cinema.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent text-sm font-medium flex items-center space-x-1"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t('getDirections')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
