'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMovies } from '@/context/MovieContext';
import { Star, Clock, Calendar, User, Play, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getMovieById, setSelectedMovie, setSelectedShowtime } = useMovies();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showTrailer, setShowTrailer] = useState(false);

  const movie = getMovieById(params.id as string);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Film bulunamadı</h1>
          <Link href="/movies" className="text-primary hover:underline">
            Filmlere dön
          </Link>
        </div>
      </div>
    );
  }

  const handleBuyTicket = () => {
    if (!selectedTime) {
      alert('Lütfen bir seans seçin');
      return;
    }
    setSelectedMovie(movie);
    setSelectedShowtime(selectedTime);
    router.push(`/seats/${movie.id}`);
  };

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={movie.backdrop}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/50 to-transparent" />

        {/* Back Button */}
        <Link
          href="/movies"
          className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>

        {/* Play Trailer Button */}
        <button
          onClick={() => setShowTrailer(true)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary p-6 rounded-full transition-colors"
        >
          <Play className="w-10 h-10 text-white fill-white" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="hidden lg:block">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <div className="bg-dark/90 backdrop-blur-sm rounded-xl p-6 md:p-8">
              {/* Title & Rating */}
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {movie.title}
                </h1>
                <div className="flex items-center space-x-1 bg-accent/20 px-3 py-1 rounded-lg">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="text-accent font-bold">{movie.rating}</span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{movie.director}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((genre) => (
                  <span
                    key={genre}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Synopsis */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Özet</h2>
                <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
              </div>

              {/* Cast */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Oyuncular</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor) => (
                    <span
                      key={actor}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Showtimes */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-3">Seanslar</h2>
                <div className="flex flex-wrap gap-3">
                  {movie.showtimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-primary text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Buy Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div>
                  <span className="text-gray-400">Bilet Fiyatı</span>
                  <div className="text-3xl font-bold text-primary">{movie.price} TL</div>
                </div>
                <button
                  onClick={handleBuyTicket}
                  disabled={!movie.isNowShowing}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    movie.isNowShowing
                      ? 'bg-primary hover:bg-secondary text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {movie.isNowShowing ? 'Bilet Al' : 'Yakında'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={movie.trailer}
              title={`${movie.title} Trailer`}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
