'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface FavoritesContextType {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cheatsheet-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cheatsheet-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (id: string) => {
    setFavorites(prev => [...prev, id])
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f !== id))
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
