import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ToastProvider } from '@/context/ToastContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'DevCheatSheet - Python, SQL, ML Kopya Kagitlari',
  description: 'Data Scientists ve Developers icin hizli referans. Python, Pandas, NumPy, SQL, TensorFlow, PyTorch ve daha fazlasi.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <ThemeProvider>
          <ToastProvider>
            <FavoritesProvider>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </FavoritesProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
