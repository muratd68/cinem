'use client'

import { Code2, Github, Twitter } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function Footer() {
  const { isDark } = useTheme()

  return (
    <footer className={`${isDark ? 'bg-darker border-gray-800' : 'bg-gray-100 border-gray-200'} border-t mt-12`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="font-bold">DevCheatSheet</span>
          </div>

          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Data Scientists & Developers icin hizli referans
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className={`mt-6 pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          &copy; {new Date().getFullYear()} DevCheatSheet. Tum haklar saklidir.
        </div>
      </div>
    </footer>
  )
}
