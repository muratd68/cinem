'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isDark } = useTheme()
  const { showToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.includes('@')) {
      showToast('Geçerli bir email adresi girin', 'error')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmail('')
      showToast('Newsletter\'a başarıyla abone oldunuz!', 'success')
    }, 1000)
  }

  return (
    <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/20">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Newsletter</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Yeni cheat sheet'lerden haberdar olun
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@ornek.com"
          className={`flex-1 px-3 py-2 rounded-lg text-sm ${
            isDark
              ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
              : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'
          } border focus:outline-none focus:border-primary`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="animate-spin">...</span>
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  )
}
