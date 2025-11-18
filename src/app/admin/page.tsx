'use client';

import React, { useState } from 'react';
import { useMovies } from '@/context/MovieContext';
import { Plus, Trash2, Edit, X, Save, Film } from 'lucide-react';
import { Movie, genres } from '@/data/movies';

export default function AdminPage() {
  const { movies, addMovie, deleteMovie, updateMovie } = useMovies();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    poster: '',
    backdrop: '',
    genre: [] as string[],
    duration: '',
    rating: 0,
    year: new Date().getFullYear(),
    director: '',
    cast: '',
    synopsis: '',
    trailer: '',
    showtimes: '',
    price: 100,
    isNowShowing: true,
    isComingSoon: false,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      poster: '',
      backdrop: '',
      genre: [],
      duration: '',
      rating: 0,
      year: new Date().getFullYear(),
      director: '',
      cast: '',
      synopsis: '',
      trailer: '',
      showtimes: '',
      price: 100,
      isNowShowing: true,
      isComingSoon: false,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGenreChange = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  };

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();

    const newMovie: Omit<Movie, 'id'> = {
      ...formData,
      cast: formData.cast.split(',').map((s) => s.trim()),
      showtimes: formData.showtimes.split(',').map((s) => s.trim()),
    };

    addMovie(newMovie);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditClick = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      poster: movie.poster,
      backdrop: movie.backdrop,
      genre: movie.genre,
      duration: movie.duration,
      rating: movie.rating,
      year: movie.year,
      director: movie.director,
      cast: movie.cast.join(', '),
      synopsis: movie.synopsis,
      trailer: movie.trailer,
      showtimes: movie.showtimes.join(', '),
      price: movie.price,
      isNowShowing: movie.isNowShowing,
      isComingSoon: movie.isComingSoon,
    });
  };

  const handleUpdateMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMovie) return;

    const updatedMovie: Partial<Movie> = {
      ...formData,
      cast: formData.cast.split(',').map((s) => s.trim()),
      showtimes: formData.showtimes.split(',').map((s) => s.trim()),
    };

    updateMovie(editingMovie.id, updatedMovie);
    setEditingMovie(null);
    resetForm();
  };

  const handleDeleteMovie = (id: string) => {
    if (confirm('Bu filmi silmek istediğinizden emin misiniz?')) {
      deleteMovie(id);
    }
  };

  const MovieForm = ({ onSubmit, buttonText }: { onSubmit: (e: React.FormEvent) => void; buttonText: string }) => (
    <form onSubmit={onSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div>
        <label className="block text-gray-400 text-sm mb-2">Film Adı *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Poster URL *</label>
          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Backdrop URL *</label>
          <input
            type="url"
            name="backdrop"
            value={formData.backdrop}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">Türler *</label>
        <div className="flex flex-wrap gap-2">
          {genres.filter(g => g !== 'Tümü').map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => handleGenreChange(genre)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                formData.genre.includes(genre)
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Süre *</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="2s 30dk"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Puan *</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            step="0.1"
            min="0"
            max="10"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Yıl *</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">Yönetmen *</label>
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleInputChange}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">Oyuncular (virgülle ayırın) *</label>
        <input
          type="text"
          name="cast"
          value={formData.cast}
          onChange={handleInputChange}
          placeholder="Oyuncu 1, Oyuncu 2, Oyuncu 3"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">Özet *</label>
        <textarea
          name="synopsis"
          value={formData.synopsis}
          onChange={handleInputChange}
          rows={3}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">Fragman URL (YouTube Embed)</label>
        <input
          type="url"
          name="trailer"
          value={formData.trailer}
          onChange={handleInputChange}
          placeholder="https://www.youtube.com/embed/..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Seanslar (virgülle ayırın) *</label>
          <input
            type="text"
            name="showtimes"
            value={formData.showtimes}
            onChange={handleInputChange}
            placeholder="10:00, 14:00, 18:00"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Fiyat (TL) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="isNowShowing"
            checked={formData.isNowShowing}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary rounded focus:ring-primary"
          />
          <span className="text-gray-300 text-sm">Vizyonda</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="isComingSoon"
            checked={formData.isComingSoon}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary rounded focus:ring-primary"
          />
          <span className="text-gray-300 text-sm">Yakında</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
      >
        <Save className="w-5 h-5" />
        <span>{buttonText}</span>
      </button>
    </form>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Film Yönetimi</h1>
            <p className="text-gray-400 mt-1">Toplam {movies.length} film</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Film Ekle</span>
          </button>
        </div>

        {/* Movies Table */}
        <div className="bg-dark rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Film</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Tür</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Yıl</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Puan</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Fiyat</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Durum</th>
                  <th className="text-right text-gray-400 font-medium px-6 py-4">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div>
                          <p className="text-white font-medium">{movie.title}</p>
                          <p className="text-gray-400 text-sm">{movie.director}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">{movie.genre.slice(0, 2).join(', ')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{movie.year}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-accent font-medium">{movie.rating}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{movie.price} TL</span>
                    </td>
                    <td className="px-6 py-4">
                      {movie.isNowShowing ? (
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">Vizyonda</span>
                      ) : movie.isComingSoon ? (
                        <span className="bg-accent/20 text-accent px-2 py-1 rounded text-sm">Yakında</span>
                      ) : (
                        <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded text-sm">Pasif</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(movie)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMovie(movie.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-dark rounded-xl p-6 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Film className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-white">Yeni Film Ekle</h2>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <MovieForm onSubmit={handleAddMovie} buttonText="Film Ekle" />
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingMovie && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-dark rounded-xl p-6 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Edit className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold text-white">Film Düzenle</h2>
                </div>
                <button
                  onClick={() => {
                    setEditingMovie(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <MovieForm onSubmit={handleUpdateMovie} buttonText="Güncelle" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
