'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useLanguage } from '@/context/LanguageContext'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Sidebar } from 'primereact/sidebar'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { favorites } = useFavorites()
  const { locale, setLocale, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav
      className="sticky top-0 z-5"
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
      }}
    >
      <div className="flex align-items-center justify-content-between px-4" style={{ maxWidth: '1280px', margin: '0 auto', height: '64px' }}>
        {/* Logo */}
        <Link href="/" className="flex align-items-center gap-2 no-underline">
          <i className="pi pi-code" style={{ fontSize: '2rem', color: '#6366f1' }}></i>
          <span className="text-xl font-bold gradient-text">DevCheatSheet</span>
        </Link>

        {/* Search - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1" style={{ maxWidth: '400px', margin: '0 2rem' }}>
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search')}
              className="w-full"
              style={{
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                borderColor: isDark ? '#4b5563' : '#e5e7eb',
                color: isDark ? '#fff' : '#1f2937'
              }}
            />
          </span>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex align-items-center gap-2">
          <Link href="/favorites" className="p-overlay-badge">
            <Button
              icon="pi pi-heart"
              rounded
              text
              severity="secondary"
              style={{ color: isDark ? '#fff' : '#374151' }}
            />
            {favorites.length > 0 && (
              <Badge value={favorites.length} severity="danger" />
            )}
          </Link>
          <Button
            icon="pi pi-globe"
            rounded
            text
            severity="secondary"
            onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}
            tooltip={locale === 'tr' ? 'Switch to English' : 'Türkçeye Geç'}
            tooltipOptions={{ position: 'bottom' }}
            style={{ color: isDark ? '#fff' : '#374151' }}
          >
            <span className="text-xs font-medium ml-1">{locale.toUpperCase()}</span>
          </Button>
          <Button
            icon={isDark ? 'pi pi-sun' : 'pi pi-moon'}
            rounded
            text
            severity="secondary"
            onClick={toggleTheme}
            style={{ color: isDark ? '#fff' : '#374151' }}
          />
        </div>

        {/* Mobile menu button */}
        <Button
          icon={isOpen ? 'pi pi-times' : 'pi pi-bars'}
          rounded
          text
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: isDark ? '#fff' : '#374151' }}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        position="right"
        style={{
          backgroundColor: isDark ? '#1f2937' : '#fff',
          width: '280px'
        }}
      >
        <form onSubmit={handleSearch} className="mb-4">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search')}
              className="w-full"
              style={{
                backgroundColor: isDark ? '#374151' : '#f3f4f6',
                borderColor: isDark ? '#4b5563' : '#e5e7eb',
                color: isDark ? '#fff' : '#1f2937'
              }}
            />
          </span>
        </form>

        <div className="flex flex-column gap-3">
          <Link
            href="/favorites"
            className="flex align-items-center gap-2 no-underline"
            onClick={() => setIsOpen(false)}
            style={{ color: isDark ? '#fff' : '#1f2937' }}
          >
            <i className="pi pi-heart" />
            <span>{t('common.favorites')} ({favorites.length})</span>
          </Link>
          <button
            onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}
            className="flex align-items-center gap-2 border-none bg-transparent cursor-pointer"
            style={{ color: isDark ? '#fff' : '#1f2937' }}
          >
            <i className="pi pi-globe" />
            <span>{locale === 'tr' ? 'English' : 'Türkçe'}</span>
          </button>
          <button
            onClick={toggleTheme}
            className="flex align-items-center gap-2 border-none bg-transparent cursor-pointer"
            style={{ color: isDark ? '#fff' : '#1f2937' }}
          >
            <i className={isDark ? 'pi pi-sun' : 'pi pi-moon'} />
            <span>{isDark ? t('common.lightMode') : t('common.darkMode')}</span>
          </button>
        </div>
      </Sidebar>
    </nav>
  )
}
