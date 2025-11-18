import React from 'react';
import Link from 'next/link';
import { Film, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-darker border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Film className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">
                <span className="text-primary">Cine</span>
                <span className="text-white">MAX</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              En yeni filmler, en iyi deneyim. CineMAX ile sinema keyfini yaşayın.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Vizyondakiler
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Yakında
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Kampanyalar
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Sinemalarımız
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Kariyer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+90 212 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@cinemax.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 CineMAX. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Kullanım Şartları
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
              KVKK
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
