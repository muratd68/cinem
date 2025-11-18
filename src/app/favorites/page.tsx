'use client'

import { useTheme } from '@/context/ThemeContext'
import { useFavorites } from '@/context/FavoritesContext'
import CheatCard from '@/components/CheatCard'
import { cheatsheets } from '@/data/cheatsheets'
import { Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function FavoritesPage() {
  const { isDark } = useTheme()
  const { favorites } = useFavorites()

  const favoriteSheets = cheatsheets.filter(sheet => favorites.includes(sheet.id))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-500">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Favorilerim</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {favorites.length} cheat sheet favorilere eklendi
            </p>
          </div>
        </div>
      </div>

      {favoriteSheets.length === 0 ? (
        <div className={`text-center py-16 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
          <Heart className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <h2 className="text-xl font-semibold mb-2">Henuz favori yok</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Cheat sheet kartlarindaki kalp ikonuna tiklayarak favorilerinize ekleyebilirsiniz.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Cheat Sheet'lere Goz At
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteSheets.map(sheet => (
            <CheatCard
              key={sheet.id}
              id={sheet.id}
              title={sheet.title}
              description={sheet.description}
              icon={sheet.icon}
              href={sheet.href}
              color={sheet.color}
            />
          ))}
        </div>
      )}
    </div>
  )
}
