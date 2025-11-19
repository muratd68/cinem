'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import CheatCard from '@/components/CheatCard'
import { cheatsheets, categories } from '@/data/cheatsheets'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'

function HomeContent() {
  const { isDark } = useTheme()
  const { t, locale } = useLanguage()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('Tumu')
  const [filteredSheets, setFilteredSheets] = useState(cheatsheets)

  // Reset to "All" when language changes
  useEffect(() => {
    setSelectedCategory(locale === 'tr' ? 'Tumu' : 'All')
  }, [locale])

  useEffect(() => {
    const searchQuery = searchParams.get('search')?.toLowerCase() || ''

    let filtered = cheatsheets

    if (searchQuery) {
      filtered = filtered.filter(sheet =>
        sheet.title.toLowerCase().includes(searchQuery) ||
        sheet.description.toLowerCase().includes(searchQuery)
      )
    }

    // Check if selected category is "All" in any language
    const isAll = selectedCategory === 'Tumu' || selectedCategory === 'All' || selectedCategory === t('common.all')
    if (!isAll) {
      filtered = filtered.filter(sheet => sheet.category === selectedCategory)
    }

    setFilteredSheets(filtered)
  }, [searchParams, selectedCategory, t])

  return (
    <div className="px-4 py-5" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section className="text-center py-6">
        <div className="flex justify-content-center mb-4">
          <div
            className="flex align-items-center justify-content-center border-round-xl"
            style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
            }}
          >
            <i className="pi pi-code" style={{ fontSize: '2rem', color: '#fff' }}></i>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="gradient-text">{t('home.title')}</span>
        </h1>
        <p
          className="text-xl mx-auto"
          style={{
            color: isDark ? '#9ca3af' : '#4b5563',
            maxWidth: '672px'
          }}
        >
          {t('home.subtitle')}
          {' '}{t('home.description')}
        </p>

        {/* Stats */}
        <div className="flex justify-content-center gap-5 mt-5">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#6366f1' }}>52+</div>
            <div className="text-sm" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>{t('home.stats.sheets')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#6366f1' }}>500+</div>
            <div className="text-sm" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>{t('home.stats.examples')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#6366f1' }}>100%</div>
            <div className="text-sm" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>{t('home.stats.free')}</div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-5">
        <div className="flex flex-wrap gap-2 justify-content-center">
          {categories.map(category => (
            <Button
              key={category}
              label={category}
              size="small"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'btn-primary' : ''}
              style={selectedCategory !== category ? {
                backgroundColor: isDark ? '#374151' : '#e5e7eb',
                borderColor: isDark ? '#4b5563' : '#d1d5db',
                color: isDark ? '#d1d5db' : '#374151'
              } : {}}
            />
          ))}
        </div>
      </section>

      {/* Cheat Sheets Grid */}
      <section>
        {filteredSheets.length === 0 ? (
          <div className="text-center py-6">
            <p style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
              {t('home.noResults')}
            </p>
          </div>
        ) : (
          <div className="grid">
            {filteredSheets.map(sheet => (
              <div key={sheet.id} className="col-12 md:col-6 lg:col-4 xl:col-3">
                <CheatCard
                  id={sheet.id}
                  title={sheet.title}
                  description={sheet.description}
                  icon={sheet.icon}
                  href={sheet.href}
                  color={sheet.color}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mt-6 py-6" style={{ borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
        <h2 className="text-2xl font-bold text-center mb-5">{t('home.whyUs')}</h2>
        <div className="grid">
          <div className="col-12 md:col-4">
            <div
              className="text-center p-4 border-round-xl"
              style={{
                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#fff',
                border: isDark ? 'none' : '1px solid #e5e7eb'
              }}
            >
              <i className="pi pi-download mb-3" style={{ fontSize: '2rem', color: '#6366f1' }}></i>
              <h3 className="font-semibold mb-2">{t('home.features.quickAccess.title')}</h3>
              <p className="text-sm m-0" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
                {t('home.features.quickAccess.description')}
              </p>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div
              className="text-center p-4 border-round-xl"
              style={{
                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#fff',
                border: isDark ? 'none' : '1px solid #e5e7eb'
              }}
            >
              <i className="pi pi-star mb-3" style={{ fontSize: '2rem', color: '#6366f1' }}></i>
              <h3 className="font-semibold mb-2">{t('home.features.favorites.title')}</h3>
              <p className="text-sm m-0" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
                {t('home.features.favorites.description')}
              </p>
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div
              className="text-center p-4 border-round-xl"
              style={{
                backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#fff',
                border: isDark ? 'none' : '1px solid #e5e7eb'
              }}
            >
              <i className="pi pi-users mb-3" style={{ fontSize: '2rem', color: '#6366f1' }}></i>
              <h3 className="font-semibold mb-2">{t('home.features.community.title')}</h3>
              <p className="text-sm m-0" style={{ color: isDark ? '#9ca3af' : '#4b5563' }}>
                {t('home.features.community.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <ProgressSpinner />
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
