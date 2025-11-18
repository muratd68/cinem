import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MovieProvider } from "@/context/MovieContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { TicketHistoryProvider } from "@/context/TicketHistoryContext";
import { CouponProvider } from "@/context/CouponContext";

export const metadata: Metadata = {
  title: "CineMAX - Sinema Bilet Satış",
  description: "En yeni filmler, en iyi deneyim. CineMAX ile sinema keyfini yaşayın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased bg-darker min-h-screen">
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <FavoritesProvider>
                <TicketHistoryProvider>
                  <CouponProvider>
                    <MovieProvider>
                      <Navbar />
                      <main className="pt-16">
                        {children}
                      </main>
                      <Footer />
                    </MovieProvider>
                  </CouponProvider>
                </TicketHistoryProvider>
              </FavoritesProvider>
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
