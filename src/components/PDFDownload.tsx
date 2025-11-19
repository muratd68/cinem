'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'
import { Button } from 'primereact/button'

// Lazy load Dialog
const Dialog = dynamic(() => import('primereact/dialog').then(mod => mod.Dialog), {
  ssr: false
})

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

  const dialogFooter = (
    <div className="flex gap-3 justify-content-end">
      <Button
        label="İptal"
        icon="pi pi-times"
        onClick={() => setShowAd(false)}
        className="p-button-text"
      />
      <Button
        label={isLoading ? 'Hazırlanıyor...' : 'İndir'}
        icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-download'}
        onClick={proceedDownload}
        disabled={isLoading}
        className="btn-primary"
      />
    </div>
  )

  return (
    <>
      <Button
        label="PDF İndir"
        icon="pi pi-download"
        onClick={handleDownload}
        className="p-button-outlined"
        size="small"
        style={{
          backgroundColor: isDark ? '#374151' : '#f3f4f6',
          borderColor: isDark ? '#4b5563' : '#e5e7eb',
          color: isDark ? '#fff' : '#1f2937'
        }}
      />

      <Dialog
        header="PDF İndirme"
        visible={showAd}
        onHide={() => setShowAd(false)}
        footer={dialogFooter}
        style={{ width: '400px' }}
        className={isDark ? 'p-dialog-dark' : ''}
      >
        {/* Ad placeholder */}
        <div
          className="flex align-items-center justify-content-center mb-4 border-round-lg"
          style={{
            height: '160px',
            backgroundColor: isDark ? '#374151' : '#f3f4f6'
          }}
        >
          <span style={{ fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#6b7280' }}>
            Reklam Alanı
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#4b5563' }}>
          PDF dosyanız hazırlanıyor. İndirmeye devam etmek için aşağıdaki butona tıklayın.
        </p>
      </Dialog>
    </>
  )
}
