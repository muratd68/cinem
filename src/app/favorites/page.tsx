'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useMovies } from '@/context/MovieContext';
import MovieCard from '@/components/MovieCard';

export default function FavoritesPage() {
  const { t } = useLanguage();
  const { favorites } = useFavorites();
  const { movies } = useMovies();

  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center space-x-3">
            <Heart className="w-8 h-8 text-primary" />
            <span>{t('myFavorites')}</span>
          </h1>
          <p className="text-gray-400">
            {favoriteMovies.length} {t('moviesFound')}
          </p>
        </div>

        {/* Favorites Grid */}
        {favoriteMovies.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">{t('noFavorites')}</p>
            <Link
              href="/movies"
              className="inline-block bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {t('browseMovies')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
