# DevCheatSheet

Data Scientists ve Developers için kapsamlı hızlı referans (cheat sheet) sitesi.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## Özellikler

### 📚 52 Detaylı Cheat Sheet

| Kategori | Cheat Sheets |
|----------|--------------|
| **Programlama** | Python, Regex |
| **Data Science** | Pandas, NumPy, İstatistik, PySpark, Airflow, Spark SQL |
| **Machine Learning** | Scikit-learn, MLflow |
| **Deep Learning** | TensorFlow, PyTorch, Keras, Hugging Face |
| **Veritabanı** | SQL, MongoDB, PostgreSQL, Redis, Elasticsearch |
| **Görselleştirme** | Matplotlib |
| **DevOps** | Git, Linux, Docker, Kubernetes, Terraform, Ansible, Nginx, GitHub Actions, Prometheus, Grafana, Helm |
| **Cloud** | AWS, Azure, GCP |
| **Web Development** | React, Django, JavaScript, CSS, Node.js, Vue.js, Next.js, TypeScript, GraphQL, Tailwind, SASS, WebSocket |
| **Security** | JWT, OAuth 2.0, OWASP Top 10 |

### 🎯 Temel Özellikler

- ✅ **Dark/Light Tema** - Göz yormayan dark mode
- ✅ **Favoriler** - Sık kullandıklarını kaydet
- ✅ **Arama** - Hızlı cheat sheet ve kod arama
- ✅ **Kod Kopyalama** - Tek tıkla kopyala
- ✅ **Toast Bildirimleri** - Anlık geri bildirim
- ✅ **Responsive Tasarım** - Mobil uyumlu

### ⭐ Gelişmiş Özellikler

- ✅ **PDF İndirme** - Cheat sheet'leri PDF olarak indir
- ✅ **Quiz Modu** - Bilgini test et, skorlarını takip et
- ✅ **Newsletter** - Yeni içeriklerden haberdar ol
- ✅ **Kod Tema Seçici** - Monokai, Dracula, One Dark
- ✅ **PWA Desteği** - Offline erişim, ana ekrana ekle
- ✅ **Arama Geçmişi** - Son aramaları kaydet

## Teknolojiler

- **Frontend:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** React Context API
- **Storage:** LocalStorage

## Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Hızlı Başlangıç

```bash
# Repoyu klonla
git clone https://github.com/muratd68/cinem.git
cd cinem

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacak.

## Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Ana sayfa
│   ├── layout.tsx         # Root layout
│   ├── favorites/         # Favoriler sayfası
│   ├── quiz/              # Quiz sayfası
│   └── [cheatsheet]/      # Cheat sheet sayfaları
├── components/            # React componentleri
│   ├── Navbar.tsx         # Navigasyon
│   ├── CheatCard.tsx      # Cheat sheet kartı
│   ├── CodeBlock.tsx      # Kod bloğu
│   └── PDFDownload.tsx    # PDF indirme
├── context/               # React Context
│   ├── ThemeContext.tsx   # Dark/Light tema
│   ├── FavoritesContext.tsx # Favoriler
│   ├── QuizContext.tsx    # Quiz skorları
│   └── SearchContext.tsx  # Arama geçmişi
└── data/                  # Veri dosyaları
    └── cheatsheets.ts     # Cheat sheet listesi
```

## Cheat Sheet İçerikleri

### Python
- Veri tipleri (string, list, dict, tuple, set)
- Kontrol yapıları (if, for, while)
- Fonksiyonlar ve decorators
- OOP (class, inheritance)
- Dosya işlemleri
- Hata yönetimi

### Pandas
- DataFrame oluşturma ve okuma
- Filtreleme ve seçim
- GroupBy ve aggregation
- Merge ve concat
- String ve tarih işlemleri

### SQL
- SELECT, WHERE, ORDER BY
- JOIN türleri
- Subqueries
- Window functions
- CTE ve Views

### Ve daha fazlası...

## Gelir Modeli

1. **Google AdSense** - Sayfa içi banner reklamlar
2. **PDF İndirme** - İndirme öncesi reklam gösterimi
3. **Carbon Ads** - Yazılımcılara özel yüksek CPC

## Deployment

### Vercel (Önerilen)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t devcheatsheet .
docker run -p 3000:3000 devcheatsheet
```

## Yeni Cheat Sheet Ekleme

1. `src/app/[sheet-name]/page.tsx` dosyası oluşturun
2. `src/data/cheatsheets.ts` dosyasına ekleyin
3. Gerekli ikonu import edin

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun
3. Commit edin
4. Pull Request açın

## Lisans

MIT License

---

**DevCheatSheet** - Hızlı öğren, hızlı kodla! 🚀
