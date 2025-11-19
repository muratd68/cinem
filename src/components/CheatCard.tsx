'use client'

import Link from 'next/link'
import { memo } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
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
    <Link href={href} className="no-underline">
      <div
        className="cheat-card relative p-4 border-round-xl"
        style={{
          backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#fff',
          border: isDark ? 'none' : '1px solid #e5e7eb'
        }}
      >
        <Button
          icon={isFavorite(id) ? 'pi pi-heart-fill' : 'pi pi-heart'}
          rounded
          text
          severity={isFavorite(id) ? 'danger' : 'secondary'}
          onClick={handleFavorite}
          className="absolute"
          style={{ top: '0.5rem', right: '0.5rem' }}
          size="small"
        />

        <div
          className="flex align-items-center justify-content-center border-round-lg mb-3"
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: color
          }}
        >
          <Icon style={{ width: '24px', height: '24px', color: '#fff' }} />
        </div>

        <h3 className="text-lg font-semibold mb-2 m-0" style={{ color: isDark ? '#fff' : '#1f2937' }}>
          {title}
        </h3>
        <p
          className="text-sm m-0"
          style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
        >
          {description}
        </p>
      </div>
    </Link>
  )
}

export default memo(CheatCard)
