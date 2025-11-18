'use client'

import { useState, useEffect } from 'react'
import { Palette } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const themes = [
  { id: 'default', name: 'Default', bg: 'bg-gray-900', text: 'text-green-400' },
  { id: 'monokai', name: 'Monokai', bg: 'bg-[#272822]', text: 'text-[#f8f8f2]' },
  { id: 'dracula', name: 'Dracula', bg: 'bg-[#282a36]', text: 'text-[#f8f8f2]' },
  { id: 'onedark', name: 'One Dark', bg: 'bg-[#282c34]', text: 'text-[#abb2bf]' },
  { id: 'github', name: 'GitHub', bg: 'bg-[#f6f8fa]', text: 'text-[#24292e]' },
]

export default function CodeThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [isOpen, setIsOpen] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    const saved = localStorage.getItem('code-theme')
    if (saved) setSelectedTheme(saved)
  }, [])

  const handleSelect = (themeId: string) => {
    setSelectedTheme(themeId)
    localStorage.setItem('code-theme', themeId)
    setIsOpen(false)

    // Apply theme class to document
    document.documentElement.setAttribute('data-code-theme', themeId)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        title="Kod Teması"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className="p-2">
            <p className={`text-xs font-medium mb-2 px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Kod Teması
            </p>
            {themes.map(theme => (
              <button
                key={theme.id}
                onClick={() => handleSelect(theme.id)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
                  selectedTheme === theme.id
                    ? 'bg-primary/20 text-primary'
                    : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <span className={`w-4 h-4 rounded ${theme.bg}`}></span>
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
