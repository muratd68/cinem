'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'

interface PDFDownloadProps {
  title: string
  sheetId: string
}

export default function PDFDownload({ title, sheetId }: PDFDownloadProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showAd, setShowAd] = useState(false)
  const { isDark } = useTheme()
  const { showToast } = useToast()

  const handleDownload = () => {
    setShowAd(true)
  }

  const proceedDownload = () => {
    setIsLoading(true)

    // Simulate PDF generation
    setTimeout(() => {
      setIsLoading(false)
      setShowAd(false)
      showToast(`${title} PDF indiriliyor...`, 'success')

      // In a real app, this would generate and download the PDF
      const link = document.createElement('a')
      link.href = '#'
      link.download = `${sheetId}-cheatsheet.pdf`
      // link.click()
    }, 2000)
  }

  if (showAd) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`max-w-md w-full rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-xl font-bold mb-4">PDF İndirme</h3>

          {/* Ad placeholder */}
          <div className={`h-40 rounded-lg flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Reklam Alanı
            </span>
          </div>

          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            PDF dosyanız hazırlanıyor. İndirmeye devam etmek için aşağıdaki butona tıklayın.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAd(false)}
              className={`flex-1 py-2 px-4 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              İptal
            </button>
            <button
              onClick={proceedDownload}
              disabled={isLoading}
              className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Hazırlanıyor...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  İndir
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
        isDark
          ? 'bg-gray-800 hover:bg-gray-700 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      }`}
    >
      <Download className="w-4 h-4" />
      PDF İndir
    </button>
  )
}
