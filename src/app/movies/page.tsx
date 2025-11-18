'use client';

import React, { useState, useMemo } from 'react';
import { useMovies } from '@/context/MovieContext';
import MovieCard from '@/components/MovieCard';
import { Search, Filter, Grid, List } from 'lucide-react';
import { genres } from '@/data/movies';

export default function MoviesPage() {
  const { movies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tümü');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== 'Tümü') {
      result = result.filter((movie) => movie.genre.includes(selectedGenre));
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'year':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price':
        result.sort((a, b) => a.price - b.price);
        break;
    }

    return result;
  }, [movies, searchQuery, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tüm Filmler</h1>
          <p className="text-gray-400">
            {filteredMovies.length} film bulundu
          </p>
        </div>

        {/* Filters */}
        <div className="bg-dark rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Film veya yönetmen ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="rating">En Yüksek Puan</option>
                <option value="year">En Yeni</option>
                <option value="title">İsme Göre</option>
                <option value="price">Fiyata Göre</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Aradığınız kriterlere uygun film bulunamadı.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-dark rounded-xl p-4 flex items-center space-x-4 hover:ring-2 hover:ring-primary transition-all"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
                  <p className="text-gray-400 text-sm">{movie.director} • {movie.year}</p>
                  <p className="text-gray-500 text-sm mt-1">{movie.genre.join(', ')}</p>
                </div>
                <div className="text-right">
                  <div className="text-accent font-bold">{movie.rating}</div>
                  <div className="text-primary font-semibold">{movie.price} TL</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
