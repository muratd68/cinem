'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Star, Clock } from 'lucide-react';
import { Movie } from '@/data/movies';

interface HeroSliderProps {
  movies: Movie[];
}

export default function HeroSlider({ movies }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const currentMovie = movies[currentIndex];

  if (!currentMovie) return null;

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdrop}
          alt={currentMovie.title}
          fill
          className="object-cover transition-all duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl animate-fade-in">
          {/* Badges */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              Vizyonda
            </span>
            <div className="flex items-center space-x-1 text-accent">
              <Star className="w-4 h-4 fill-accent" />
              <span className="font-medium">{currentMovie.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {currentMovie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-gray-300 mb-4">
            <span>{currentMovie.year}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full" />
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{currentMovie.duration}</span>
            </div>
            <span className="w-1 h-1 bg-gray-500 rounded-full" />
            <span>{currentMovie.genre.join(', ')}</span>
          </div>

          {/* Synopsis */}
          <p className="text-gray-300 text-lg mb-6 line-clamp-3">
            {currentMovie.synopsis}
          </p>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href={`/movie/${currentMovie.id}`}
              className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <span>Bilet Al</span>
            </Link>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Fragman</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-primary p-3 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-primary p-3 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
