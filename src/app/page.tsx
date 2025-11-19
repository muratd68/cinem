'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import CheatCard from '@/components/CheatCard'
import { cheatsheets, categories } from '@/data/cheatsheets'
import { Code2, Download, Star, Users } from 'lucide-react'

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-secondary">
            <Code2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t('home.title')}</span>
        </h1>
        <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
          {t('home.subtitle')}
          {' '}{t('home.description')}
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">52+</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('home.stats.sheets')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('home.stats.examples')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('home.stats.free')}</div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Cheat Sheets Grid */}
      <section>
        {filteredSheets.length === 0 ? (
          <div className="text-center py-12">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('home.noResults')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSheets.map(sheet => (
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
      </section>

      {/* Features Section */}
      <section className="mt-16 py-12 border-t border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-8">{t('home.whyUs')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white border border-gray-200'}`}>
            <Download className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t('home.features.quickAccess.title')}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('home.features.quickAccess.description')}
            </p>
          </div>
          <div className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white border border-gray-200'}`}>
            <Star className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t('home.features.favorites.title')}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('home.features.favorites.description')}
            </p>
          </div>
          <div className={`text-center p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white border border-gray-200'}`}>
            <Users className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t('home.features.community.title')}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('home.features.community.description')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
