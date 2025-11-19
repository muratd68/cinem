'use client'

import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from 'primereact/button'

export default function Footer() {
  const { isDark } = useTheme()
  const { t } = useLanguage()

  return (
    <footer
      className="mt-6"
      style={{
        backgroundColor: isDark ? '#020617' : '#f3f4f6',
        borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
      }}
    >
      <div className="px-4 py-5" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="flex flex-column md:flex-row justify-content-between align-items-center gap-4">
          <div className="flex align-items-center gap-2">
            <i className="pi pi-code" style={{ fontSize: '1.5rem', color: '#6366f1' }}></i>
            <span className="font-bold">DevCheatSheet</span>
          </div>

          <p
            className="text-sm m-0"
            style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
          >
            {t('footer.tagline')}
          </p>

          <div className="flex align-items-center gap-2">
            <Button
              icon="pi pi-github"
              rounded
              text
              severity="secondary"
              aria-label="GitHub"
              style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
            />
            <Button
              icon="pi pi-twitter"
              rounded
              text
              severity="secondary"
              aria-label="Twitter"
              style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
            />
          </div>
        </div>

        <div
          className="mt-4 pt-4 text-center text-sm"
          style={{
            borderTop: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            color: isDark ? '#6b7280' : '#6b7280'
          }}
        >
          &copy; {new Date().getFullYear()} DevCheatSheet. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
