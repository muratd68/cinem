'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

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
    <div
      className="border-round-xl p-4"
      style={{
        backgroundColor: isDark ? 'rgba(31, 41, 55, 0.5)' : '#f3f4f6'
      }}
    >
      <div className="flex align-items-center gap-3 mb-4">
        <div
          className="flex align-items-center justify-content-center border-round-lg"
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(99, 102, 241, 0.2)'
          }}
        >
          <i className="pi pi-envelope" style={{ color: '#6366f1' }}></i>
        </div>
        <div>
          <h3 className="font-semibold m-0">Newsletter</h3>
          <p
            className="text-sm m-0"
            style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
          >
            Yeni cheat sheet'lerden haberdar olun
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <InputText
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@ornek.com"
          className="flex-1"
          style={{
            backgroundColor: isDark ? '#374151' : '#fff',
            borderColor: isDark ? '#4b5563' : '#e5e7eb',
            color: isDark ? '#fff' : '#1f2937',
            fontSize: '0.875rem'
          }}
        />
        <Button
          type="submit"
          icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-send'}
          disabled={isLoading}
          className="btn-primary"
        />
      </form>
    </div>
  )
}
