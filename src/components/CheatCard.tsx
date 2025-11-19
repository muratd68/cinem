'use client'

import Link from 'next/link'
import { memo } from 'react'
import { Heart } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useLanguage } from '@/context/LanguageContext'
import { LucideIcon } from 'lucide-react'

interface CheatCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
}

function CheatCard({ id, title, description, icon: Icon, href, color }: CheatCardProps) {
  const { isDark } = useTheme()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { showToast } = useToast()
  const { t } = useLanguage()

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isFavorite(id)) {
      removeFavorite(id)
      showToast(t('favorites.removed'), 'info')
    } else {
      addFavorite(id)
      showToast(t('favorites.added'), 'success')
    }
  }

  return (
    <Link href={href}>
      <div className={`cheat-card relative p-6 rounded-xl ${
        isDark ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white hover:bg-gray-50 border border-gray-200'
      }`}>
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 p-1"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite(id)
                ? 'fill-red-500 text-red-500'
                : isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          />
        </button>

        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
    </Link>
  )
}

export default memo(CheatCard)
