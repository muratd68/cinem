'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie, initialMovies } from '@/data/movies';

interface MovieContextType {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  deleteMovie: (id: string) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  getMovieById: (id: string) => Movie | undefined;
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  selectedShowtime: string;
  setSelectedShowtime: (showtime: string) => void;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const addMovie = (movie: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString(),
    };
    setMovies((prev) => [...prev, newMovie]);
  };

  const deleteMovie = (id: string) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const updateMovie = (id: string, updatedMovie: Partial<Movie>) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, ...updatedMovie } : movie
      )
    );
  };

  const getMovieById = (id: string) => {
    return movies.find((movie) => movie.id === id);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        addMovie,
        deleteMovie,
        updateMovie,
        getMovieById,
        selectedSeats,
        setSelectedSeats,
        selectedShowtime,
        setSelectedShowtime,
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}
