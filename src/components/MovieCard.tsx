'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '@/data/movies';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group relative bg-dark rounded-xl overflow-hidden hover:ring-2 hover:ring-primary transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Info on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm text-gray-300 line-clamp-3">{movie.synopsis}</p>
            <button className="mt-3 w-full bg-primary hover:bg-secondary text-white py-2 rounded-lg font-medium transition-colors">
              Bilet Al
            </button>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-white text-sm font-medium">{movie.rating}</span>
          </div>

          {/* Status Badge */}
          {movie.isComingSoon && (
            <div className="absolute top-3 left-3 bg-accent text-black px-3 py-1 rounded-full text-xs font-bold">
              Yakında
            </div>
          )}
          {movie.isNowShowing && (
            <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
              Vizyonda
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg truncate group-hover:text-primary transition-colors">
            {movie.title}
          </h3>

          <div className="flex items-center space-x-3 mt-2 text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{movie.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{movie.year}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {movie.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
