'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useFavorites } from '@/context/FavoritesContext'
import { Sun, Moon, Heart, Menu, X, Code2, Search } from 'lucide-react'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { favorites } = useFavorites()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav className={`sticky top-0 z-50 ${isDark ? 'bg-dark/90' : 'bg-white/90'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold gradient-text">DevCheatSheet</span>
          </Link>

          {/* Search - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cheat sheet ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200'
                } border focus:outline-none focus:border-primary`}
              />
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/favorites"
              className={`relative p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cheat sheet ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                    isDark
                      ? 'bg-gray-800 text-white placeholder-gray-400'
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </form>
            <div className="flex items-center justify-between">
              <Link href="/favorites" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Heart className="w-5 h-5" />
                <span>Favoriler ({favorites.length})</span>
              </Link>
              <button onClick={toggleTheme} className="flex items-center gap-2">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
