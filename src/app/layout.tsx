import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ToastProvider } from '@/context/ToastContext'
import { SearchProvider } from '@/context/SearchContext'
import { QuizProvider } from '@/context/QuizContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'DevCheatSheet - Python, SQL, ML Kopya Kagitlari',
  description: 'Data Scientists ve Developers icin hizli referans. Python, Pandas, NumPy, SQL, TensorFlow, PyTorch ve daha fazlasi.',
  manifest: '/manifest.json',
  themeColor: '#6366f1',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>
            <SearchProvider>
              <QuizProvider>
                <FavoritesProvider>
                  <Navbar />
                  <main className="min-h-screen">
                    {children}
                  </main>
                  <Footer />
                </FavoritesProvider>
              </QuizProvider>
            </SearchProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
