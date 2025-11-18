'use client';

import React from 'react';
import { useMovies } from '@/context/MovieContext';
import HeroSlider from '@/components/HeroSlider';
import MovieCard from '@/components/MovieCard';
import { ArrowRight, Popcorn, Star, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { movies } = useMovies();

  const nowShowing = movies.filter((movie) => movie.isNowShowing);
  const comingSoon = movies.filter((movie) => movie.isComingSoon);
  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider movies={nowShowing.slice(0, 5)} />

      {/* Stats Section */}
      <section className="bg-dark py-12 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-3">
                <Popcorn className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-white">50+</h3>
              <p className="text-gray-400">Film</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-3">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-3xl font-bold text-white">4.8</h3>
              <p className="text-gray-400">Ortalama Puan</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-3">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-white">100K+</h3>
              <p className="text-gray-400">Mutlu Müşteri</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-3">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white">12</h3>
              <p className="text-gray-400">Sinema Salonu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Vizyondakiler</h2>
              <p className="text-gray-400 mt-1">Şu an gösterimde olan filmler</p>
            </div>
            <Link
              href="/movies"
              className="flex items-center space-x-2 text-primary hover:text-accent transition-colors"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {nowShowing.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      {comingSoon.length > 0 && (
        <section className="py-16 bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">Yakında</h2>
                <p className="text-gray-400 mt-1">Çok yakında vizyona girecek filmler</p>
              </div>
              <Link
                href="/movies"
                className="flex items-center space-x-2 text-primary hover:text-accent transition-colors"
              >
                <span>Tümünü Gör</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {comingSoon.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Rated Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">En Yüksek Puanlılar</h2>
              <p className="text-gray-400 mt-1">Seyircilerin en beğendiği filmler</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {topRated.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sinema Deneyimini Yükselt
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Premium koltuklarımız, IMAX salonlarımız ve özel menümüzle unutulmaz bir deneyim yaşayın.
          </p>
          <Link
            href="/movies"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Hemen Bilet Al
          </Link>
        </div>
      </section>
    </div>
  );
}
