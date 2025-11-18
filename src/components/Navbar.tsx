'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Film, Menu, X, Search, User, Ticket } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-primary transition-colors font-medium"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/movies"
              className="text-gray-300 hover:text-primary transition-colors font-medium"
            >
              Filmler
            </Link>
            <Link
              href="/admin"
              className="text-gray-300 hover:text-primary transition-colors font-medium"
            >
              Yönetim
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Film ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-primary transition-colors">
              <Ticket className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-300 hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </button>
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
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Film ara..."
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
              Ana Sayfa
            </Link>
            <Link
              href="/movies"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
            >
              Filmler
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors font-medium py-2"
            >
              Yönetim
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
