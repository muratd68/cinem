# CineMAX - Sinema Bilet Satış Platformu

Modern, kullanıcı dostu bir sinema bilet satış frontend uygulaması. Next.js 14, TypeScript ve Tailwind CSS ile geliştirilmiştir.

---

## Özellikler

### Ana Özellikler
- Film listeleme ve filtreleme
- Film detay sayfası (fragman, oyuncular, özet)
- İnteraktif koltuk seçimi
- Güvenli ödeme formu
- QR kodlu bilet oluşturma
- Çoklu dil desteği (Türkçe/İngilizce)
- Favorilere film ekleme
- Canlı konum ile en yakın sinema bulma
- Admin paneli (film ekleme/düzenleme/silme)
- Responsive tasarım (mobil uyumlu)

---

## Kullanılan Teknolojiler

### Core
| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| **Next.js** | 14.2 | React framework (App Router) |
| **React** | 18 | UI kütüphanesi |
| **TypeScript** | 5 | Tip güvenliği |
| **Tailwind CSS** | 3.4 | Utility-first CSS framework |

### Kütüphaneler
| Kütüphane | Kullanım Amacı |
|-----------|----------------|
| **lucide-react** | Modern SVG ikonlar |

### Özel Geliştirmeler
| Özellik | Dosya | Açıklama |
|---------|-------|----------|
| QR Kod Generator | `src/components/QRCode.tsx` | SVG tabanlı QR kod oluşturucu |
| Form Validation | `src/utils/validation.ts` | Client-side doğrulama fonksiyonları |
| i18n Sistemi | `src/context/LanguageContext.tsx` | Çoklu dil desteği |

---

## Proje Yapısı

```
src/
├── app/                          # Next.js App Router sayfaları
│   ├── page.tsx                  # Ana sayfa
│   ├── layout.tsx                # Root layout (providers)
│   ├── globals.css               # Global stiller
│   ├── movies/
│   │   └── page.tsx              # Filmler listesi
│   ├── movie/[id]/
│   │   └── page.tsx              # Film detay
│   ├── seats/[id]/
│   │   └── page.tsx              # Koltuk seçimi
│   ├── payment/
│   │   └── page.tsx              # Ödeme sayfası
│   ├── admin/
│   │   └── page.tsx              # Admin paneli
│   ├── cinemas/
│   │   └── page.tsx              # Sinema bulucu
│   └── favorites/
│       └── page.tsx              # Favoriler
├── components/                   # Yeniden kullanılabilir bileşenler
│   ├── Navbar.tsx                # Navigasyon çubuğu
│   ├── Footer.tsx                # Alt bilgi
│   ├── MovieCard.tsx             # Film kartı
│   ├── HeroSlider.tsx            # Ana sayfa slider
│   ├── QRCode.tsx                # QR kod generator
│   └── LanguageSwitch.tsx        # Dil değiştirici
├── context/                      # React Context API
│   ├── MovieContext.tsx          # Film state yönetimi
│   ├── LanguageContext.tsx       # Dil state yönetimi
│   └── FavoritesContext.tsx      # Favoriler state yönetimi
├── data/                         # Mock veriler
│   ├── movies.ts                 # Film verileri
│   ├── translations.ts           # Çeviri metinleri
│   └── cinemas.ts                # Sinema lokasyonları
└── utils/                        # Yardımcı fonksiyonlar
    └── validation.ts             # Form doğrulama
```

---

## Detaylı Özellik Açıklamaları

### 1. Çoklu Dil Desteği (i18n)

**Dosyalar:**
- `src/data/translations.ts` - Tüm çeviri metinleri
- `src/context/LanguageContext.tsx` - Dil context provider
- `src/components/LanguageSwitch.tsx` - Dil değiştirici UI

**Nasıl Çalışır:**
```typescript
// Context'i kullan
const { t, language, setLanguage } = useLanguage();

// Metni çevir
<h1>{t('nowShowing')}</h1>

// Dil değiştir
setLanguage('en'); // veya 'tr'
```

**Özellikler:**
- LocalStorage'da dil tercihi saklanır
- Sayfa yenilense bile dil tercihi korunur
- 100+ çeviri metni (TR/EN)

---

### 2. Canlı Konum ile Sinema Bulucu

**Dosyalar:**
- `src/app/cinemas/page.tsx` - Sinema bulucu sayfası
- `src/data/cinemas.ts` - Sinema verileri (koordinatlar dahil)

**Kullanılan API:**
```typescript
// Browser Geolocation API
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    // Mesafe hesapla ve sırala
  },
  (error) => {
    // Hata yönetimi
  }
);
```

**Haversine Formülü (Mesafe Hesaplama):**
```typescript
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Dünya yarıçapı (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Kilometre cinsinden mesafe
};
```

**Özellikler:**
- Sayfa açıldığında otomatik konum alma
- Sinemalar mesafeye göre sıralanır
- Google Maps yol tarifi entegrasyonu
- Konum izni reddedilirse hata mesajı

---

### 3. QR Kod Bilet Sistemi

**Dosyalar:**
- `src/components/QRCode.tsx` - QR kod generator
- `src/app/payment/page.tsx` - Ödeme ve bilet sayfası

**Nasıl Çalışır:**
```typescript
// QR kod için veri oluştur
const qrData = JSON.stringify({
  ticketId: 'CM12ABC456',
  movie: 'Oppenheimer',
  showtime: '20:30',
  seats: 'A1, A2',
  total: 240,
  date: '2024-01-15'
});

// QR kod render et
<QRCode data={qrData} size={180} />
```

**QR Kod Generator Özellikleri:**
- SVG tabanlı (harici kütüphane yok)
- Deterministik pattern oluşturma
- Finder patterns (köşe kareleri)
- Özelleştirilebilir boyut

---

### 4. Favoriler Sistemi

**Dosyalar:**
- `src/context/FavoritesContext.tsx` - Favoriler context
- `src/app/favorites/page.tsx` - Favoriler sayfası

**Nasıl Çalışır:**
```typescript
const { favorites, toggleFavorite, isFavorite } = useFavorites();

// Favorilere ekle/çıkar
toggleFavorite(movie.id);

// Favori mi kontrol et
if (isFavorite(movie.id)) {
  // Kalp ikonu dolu göster
}
```

**Özellikler:**
- LocalStorage'da kalıcı depolama
- Navbar'da favori sayısı badge
- Film kartlarında favori butonu

---

### 5. Form Validation (Güvenlik)

**Dosya:** `src/utils/validation.ts`

**Doğrulama Fonksiyonları:**

| Fonksiyon | Açıklama | Regex/Logic |
|-----------|----------|-------------|
| `validateEmail` | E-posta doğrulama | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| `validatePhone` | Telefon doğrulama | `/^(\+90|0)?[0-9]{10}$/` |
| `validateCardNumber` | Kart numarası | 16 haneli sayı kontrolü |
| `validateCVV` | CVV doğrulama | 3-4 haneli sayı |
| `validateExpiry` | Son kullanma tarihi | MM/YY format + tarih kontrolü |
| `sanitizeInput` | XSS koruması | HTML karakterlerini escape et |

**Format Fonksiyonları:**
```typescript
formatCardNumber('1234567890123456') // '1234 5678 9012 3456'
formatExpiry('1225')                 // '12/25'
formatPhone('5551234567')            // '555 123 45 67'
```

---

### 6. Koltuk Seçim Sistemi

**Dosya:** `src/app/seats/[id]/page.tsx`

**Koltuk Durumları:**
- `available` - Boş (gri)
- `selected` - Seçili (kırmızı)
- `occupied` - Dolu (koyu gri)
- `vip` - VIP koltuk (altın) - %50 fazla fiyat

**Salon Düzeni:**
- 8 sıra (A-H)
- Her sırada 12 koltuk
- G ve H sıraları VIP

---

### 7. Admin Paneli

**Dosya:** `src/app/admin/page.tsx`

**Özellikler:**
- Film listesi tablosu
- Yeni film ekleme modal
- Film düzenleme modal
- Film silme (onay ile)
- Tür seçimi (çoklu)
- Seans ekleme
- Vizyonda/Yakında durumu

---

## State Yönetimi

### Context Providers Hiyerarşisi
```tsx
<LanguageProvider>
  <FavoritesProvider>
    <MovieProvider>
      <App />
    </MovieProvider>
  </FavoritesProvider>
</LanguageProvider>
```

### MovieContext
- `movies` - Film listesi
- `addMovie` - Film ekle
- `deleteMovie` - Film sil
- `updateMovie` - Film güncelle
- `selectedSeats` - Seçili koltuklar
- `selectedShowtime` - Seçili seans
- `selectedMovie` - Seçili film

### LanguageContext
- `language` - Aktif dil ('tr' | 'en')
- `setLanguage` - Dil değiştir
- `t` - Çeviri fonksiyonu

### FavoritesContext
- `favorites` - Favori film ID'leri
- `toggleFavorite` - Ekle/çıkar
- `isFavorite` - Kontrol et

---

## Stil ve Tema

### Renk Paleti
```css
primary: #e50914    /* Ana kırmızı */
secondary: #b81d24  /* Koyu kırmızı */
accent: #f5c518     /* Altın/sarı */
dark: #141414       /* Koyu arka plan */
darker: #0a0a0a     /* En koyu arka plan */
```

### Özel CSS Sınıfları
```css
.seat              /* Koltuk base stili */
.seat-available    /* Boş koltuk */
.seat-selected     /* Seçili koltuk */
.seat-occupied     /* Dolu koltuk */
.seat-vip          /* VIP koltuk */
.glass             /* Cam efekti */
.gradient-text     /* Gradient metin */
```

### Animasyonlar
- `fade-in` - Yumuşak görünme
- `slide-up` - Aşağıdan kayma
- `pulse-slow` - Yavaş nabız

---

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build

# Production server
npm start
```

### Ortam Değişkenleri
Bu proje frontend-only olduğu için .env dosyasına gerek yoktur. Tüm veriler mock olarak tutulmaktadır.

---

## Sayfa Rotaları

| Rota | Sayfa | Açıklama |
|------|-------|----------|
| `/` | Ana Sayfa | Hero slider, film bölümleri |
| `/movies` | Filmler | Tüm filmler, filtreleme |
| `/movie/[id]` | Film Detay | Bilgiler, fragman, seanslar |
| `/seats/[id]` | Koltuk Seçimi | İnteraktif salon |
| `/payment` | Ödeme | Form, QR bilet |
| `/admin` | Admin | Film yönetimi |
| `/cinemas` | Sinemalar | Konum bulucu |
| `/favorites` | Favoriler | Favori filmler |

---

## Güvenlik Özellikleri

1. **Input Validation** - Tüm formlar client-side doğrulama
2. **XSS Koruması** - sanitizeInput fonksiyonu
3. **Secure Forms** - Kart bilgileri formatlanır
4. **HTTPS Ready** - Production'da SSL zorunlu

---

## Performans Optimizasyonları

1. **Next.js Image** - Otomatik görsel optimizasyonu
2. **Code Splitting** - Sayfa bazlı bundle
3. **Static Generation** - Mümkün olan sayfalar statik
4. **Lazy Loading** - Gerektiğinde yükleme

---

## Responsive Tasarım

- **Mobile First** - Önce mobil tasarım
- **Breakpoints:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

---

## Mock Veriler

### Filmler
8 örnek film (Oppenheimer, Dune, vb.) ile birlikte gelir. Her film:
- Poster ve backdrop görselleri (TMDB)
- Türler, süre, puan
- Yönetmen ve oyuncular
- Özet ve fragman
- Seanslar ve fiyat

### Sinemalar
6 örnek sinema lokasyonu:
- İstanbul (Kadıköy, Levent)
- Ankara
- İzmir
- Antalya
- Bursa

---

## Geliştirici Notları

### Yeni Dil Ekleme
1. `src/data/translations.ts` dosyasına yeni dil ekle
2. `Language` type'ına yeni dili ekle
3. `LanguageSwitch` bileşenine buton ekle

### Yeni Sinema Ekleme
1. `src/data/cinemas.ts` dosyasına sinema ekle
2. Koordinatları (lat, lng) doğru gir

### Form Doğrulama Ekleme
1. `src/utils/validation.ts` dosyasına fonksiyon ekle
2. İlgili form bileşeninde kullan

---

## Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

---

## İletişim

Sorularınız için issue açabilirsiniz.
