'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Film, Menu, X, Search, Heart, Ticket, MapPin, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useTheme } from '@/context/ThemeContext';
import { useTicketHistory } from '@/context/TicketHistoryContext';
import LanguageSwitch from './LanguageSwitch';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();
  const { favorites } = useFavorites();
  const { isDark, toggleTheme } = useTheme();
  const { tickets } = useTicketHistory();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-darker/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Film className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-primary">Cine</span>
              <span className="text-white">MAX</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-primary transition-colors font-medium"
            >
              {t('home')}
            </Link>
            <Link
              href="/movies"
              className="text-gray-300 hover:text-primary transition-colors font-medium"
            >
              {t('movies')}
            </Link>
            <Link
              href="/cinemas"
              className="text-gray-300 hover:text-primary transition-colors font-medium"
            >
              {t('cinemas')}
            </Link>
            <Link
              href="/admin"
              className="text-gray-300 hover:text-primary transition-colors font-medium"
            >
              {t('management')}
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full w-56 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitch />
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 hover:text-primary transition-colors"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              href="/favorites"
              className="p-2 text-gray-300 hover:text-primary transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              href="/tickets"
              className="p-2 text-gray-300 hover:text-primary transition-colors relative"
            >
              <Ticket className="w-5 h-5" />
              {tickets.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {tickets.length}
                </span>
              )}
            </Link>
            <Link
              href="/cinemas"
              className="p-2 text-gray-300 hover:text-primary transition-colors"
            >
              <MapPin className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-primary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <LanguageSwitch />
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-300 hover:text-primary transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
            >
              {t('home')}
            </Link>
            <Link
              href="/movies"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
            >
              {t('movies')}
            </Link>
            <Link
              href="/cinemas"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
            >
              {t('cinemas')}
            </Link>
            <Link
              href="/favorites"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
            >
              {t('favorites')} ({favorites.length})
            </Link>
            <Link
              href="/tickets"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
            >
              Biletlerim ({tickets.length})
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
            >
              {t('management')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
