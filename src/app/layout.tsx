import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MovieProvider } from "@/context/MovieContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

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
        <LanguageProvider>
          <FavoritesProvider>
            <MovieProvider>
              <Navbar />
              <main className="pt-16">
                {children}
              </main>
              <Footer />
            </MovieProvider>
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
