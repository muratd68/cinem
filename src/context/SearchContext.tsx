'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SearchContextType {
  searchHistory: string[]
  addToHistory: (query: string) => void
  clearHistory: () => void
  suggestions: string[]
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

const defaultSuggestions = [
  'python list',
  'pandas groupby',
  'numpy array',
  'sql join',
  'git merge',
  'regex email',
  'tensorflow model',
  'pytorch tensor',
  'sklearn train',
  'matplotlib plot'
]

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [suggestions] = useState<string[]>(defaultSuggestions)

  useEffect(() => {
    const saved = localStorage.getItem('search-history')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    }
  }, [])

  const addToHistory = (query: string) => {
    if (!query.trim()) return
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem('search-history', JSON.stringify(newHistory))
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('search-history')
  }

  return (
    <SearchContext.Provider value={{ searchHistory, addToHistory, clearHistory, suggestions }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
