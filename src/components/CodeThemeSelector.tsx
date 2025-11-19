'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel'

const themes = [
  { id: 'default', name: 'Default', bg: '#1f2937' },
  { id: 'monokai', name: 'Monokai', bg: '#272822' },
  { id: 'dracula', name: 'Dracula', bg: '#282a36' },
  { id: 'onedark', name: 'One Dark', bg: '#282c34' },
  { id: 'github', name: 'GitHub', bg: '#f6f8fa' },
]

export default function CodeThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState('default')
  const { isDark } = useTheme()
  const op = useRef<OverlayPanel>(null)

  useEffect(() => {
    const saved = localStorage.getItem('code-theme')
    if (saved) setSelectedTheme(saved)
  }, [])

  const handleSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    localStorage.setItem('code-theme', themeId)
    op.current?.hide()

    // Apply theme class to document
    document.documentElement.setAttribute('data-code-theme', themeId)
  }

  return (
    <>
      <Button
        icon="pi pi-palette"
        rounded
        text
        severity="secondary"
        onClick={(e) => op.current?.toggle(e)}
        tooltip="Kod Teması"
        tooltipOptions={{ position: 'bottom' }}
        style={{ color: isDark ? '#fff' : '#374151' }}
      />

      <OverlayPanel
        ref={op}
        style={{
          backgroundColor: isDark ? '#374151' : '#fff',
          border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`
        }}
      >
        <div style={{ width: '180px' }}>
          <p
            className="text-xs font-medium mb-2 px-2 m-0"
            style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
          >
            Kod Teması
          </p>
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              className="w-full flex align-items-center gap-2 px-2 py-2 border-none cursor-pointer border-round"
              style={{
                backgroundColor: selectedTheme === theme.id
                  ? 'rgba(99, 102, 241, 0.2)'
                  : 'transparent',
                color: selectedTheme === theme.id
                  ? '#6366f1'
                  : (isDark ? '#fff' : '#1f2937'),
                fontSize: '0.875rem'
              }}
            >
              <span
                className="border-round"
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: theme.bg
                }}
              ></span>
              {theme.name}
            </button>
          ))}
        </div>
      </OverlayPanel>
    </>
  )
}
