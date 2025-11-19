'use client'

import './globals.css'
import { PrimeReactProvider } from 'primereact/api'
import { ThemeProvider } from '@/context/ThemeContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ToastProvider } from '@/context/ToastContext'
import { SearchProvider } from '@/context/SearchContext'
import { QuizProvider } from '@/context/QuizContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <title>DevCheatSheet - Python, SQL, ML Kopya Kagitlari</title>
        <meta name="description" content="Data Scientists ve Developers icin hizli referans. Python, Pandas, NumPy, SQL, TensorFlow, PyTorch ve daha fazlasi." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <PrimeReactProvider>
          <ThemeProvider>
            <LanguageProvider>
              <ToastProvider>
                <SearchProvider>
                  <QuizProvider>
                    <FavoritesProvider>
                      <Navbar />
                      <main style={{ minHeight: '100vh' }}>
                        {children}
                      </main>
                      <Footer />
                    </FavoritesProvider>
                  </QuizProvider>
                </SearchProvider>
              </ToastProvider>
            </LanguageProvider>
          </ThemeProvider>
        </PrimeReactProvider>
      </body>
    </html>
  )
}
