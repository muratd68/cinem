'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Calculator, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NumPyCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">NumPy Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Array islemleri ve matematiksel fonksiyonlar</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Array Olusturma</h2>

          <CodeBlock
            title="Temel Array Olusturma"
            code={`import numpy as np

# Liste'den array
arr = np.array([1, 2, 3, 4, 5])
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])

# Ozel arraylar
np.zeros(5)              # [0, 0, 0, 0, 0]
np.zeros((3, 4))         # 3x4 sifir matrisi
np.ones(5)               # [1, 1, 1, 1, 1]
np.ones((2, 3))          # 2x3 bir matrisi
np.full((3, 3), 7)       # 3x3 yedi dolu
np.empty((2, 2))         # Bos (rastgele)
np.eye(4)                # 4x4 birim matris
np.identity(3)           # 3x3 birim matris

# Aralik olusturma
np.arange(10)            # [0, 1, 2, ..., 9]
np.arange(2, 10, 2)      # [2, 4, 6, 8]
np.linspace(0, 1, 5)     # [0, 0.25, 0.5, 0.75, 1]
np.logspace(0, 2, 5)     # Log olcekte 5 nokta

# Rastgele arraylar
np.random.rand(5)        # 0-1 arasi uniform
np.random.rand(3, 3)     # 3x3 uniform
np.random.randn(5)       # Normal dagilim
np.random.randint(0, 10, 5)  # 0-10 arasi tamsayi
np.random.choice([1, 2, 3], 5)  # Secimli
np.random.shuffle(arr)   # Karistir
np.random.seed(42)       # Seed ayarla`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Array Ozellikleri</h2>

          <CodeBlock
            title="Array Bilgileri"
            code={`arr = np.array([[1, 2, 3], [4, 5, 6]])

# Ozellikler
arr.ndim            # Boyut sayisi: 2
arr.shape           # Sekil: (2, 3)
arr.size            # Eleman sayisi: 6
arr.dtype           # Veri tipi: int64
arr.itemsize        # Eleman boyutu (byte)
arr.nbytes          # Toplam boyut (byte)

# Tip donusumu
arr.astype(float)   # float'a cevir
arr.astype('int32') # int32'ye cevir

# Yeniden sekillendirme
arr.reshape(3, 2)   # 3x2 matris
arr.reshape(-1)     # Duzlestir (1D)
arr.flatten()       # Duzlestir (kopya)
arr.ravel()         # Duzlestir (view)
arr.T               # Transpose
arr.transpose()     # Transpose`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Indexleme ve Dilimleme</h2>

          <CodeBlock
            title="Array Erisimi"
            code={`arr = np.array([1, 2, 3, 4, 5])

# Temel indexleme
arr[0]              # Ilk eleman: 1
arr[-1]             # Son eleman: 5
arr[1:4]            # [2, 3, 4]
arr[::2]            # [1, 3, 5]
arr[::-1]           # [5, 4, 3, 2, 1]

# 2D indexleme
arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
arr_2d[0, 0]        # 1
arr_2d[1, 2]        # 6
arr_2d[0]           # [1, 2, 3]
arr_2d[:, 0]        # [1, 4, 7] (ilk sutun)
arr_2d[0:2, 1:3]    # [[2, 3], [5, 6]]

# Boolean indexleme
arr = np.array([1, 2, 3, 4, 5])
arr[arr > 3]        # [4, 5]
arr[arr % 2 == 0]   # [2, 4]

# Fancy indexleme
indices = [0, 2, 4]
arr[indices]        # [1, 3, 5]

# np.where
np.where(arr > 3)              # Index'ler
np.where(arr > 3, arr, 0)      # Kosullu deger`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Matematiksel Islemler</h2>

          <CodeBlock
            title="Aritmetik Islemler"
            code={`a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Temel islemler (element-wise)
a + b           # [5, 7, 9]
a - b           # [-3, -3, -3]
a * b           # [4, 10, 18]
a / b           # [0.25, 0.4, 0.5]
a ** 2          # [1, 4, 9]
a % 2           # [1, 0, 1]
a // 2          # [0, 1, 1]

# Skaler islemler
a + 10          # [11, 12, 13]
a * 2           # [2, 4, 6]

# Universal functions (ufuncs)
np.add(a, b)
np.subtract(a, b)
np.multiply(a, b)
np.divide(a, b)
np.power(a, 2)
np.sqrt(a)
np.exp(a)
np.log(a)
np.log10(a)
np.sin(a)
np.cos(a)
np.tan(a)

# Yakin sayiya yuvarlama
np.round(arr, 2)    # 2 ondalik
np.floor(arr)       # Asagi yuvarla
np.ceil(arr)        # Yukari yuvarla
np.trunc(arr)       # Kesirli kismi at`}
          />

          <CodeBlock
            title="Istatistiksel Islemler"
            code={`arr = np.array([1, 2, 3, 4, 5])

# Temel istatistikler
np.sum(arr)         # 15
np.prod(arr)        # 120
np.mean(arr)        # 3.0
np.median(arr)      # 3.0
np.std(arr)         # Standart sapma
np.var(arr)         # Varyans
np.min(arr)         # 1
np.max(arr)         # 5
np.argmin(arr)      # Min index: 0
np.argmax(arr)      # Max index: 4
np.percentile(arr, 50)  # Percentile

# Eksen boyunca
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
np.sum(arr_2d, axis=0)    # [5, 7, 9] (sutun toplami)
np.sum(arr_2d, axis=1)    # [6, 15] (satir toplami)
np.mean(arr_2d, axis=0)   # Sutun ortalamasi
np.mean(arr_2d, axis=1)   # Satir ortalamasi

# Kumulatif
np.cumsum(arr)      # [1, 3, 6, 10, 15]
np.cumprod(arr)     # [1, 2, 6, 24, 120]

# Korelasyon ve kovaryans
np.corrcoef(a, b)
np.cov(a, b)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Lineer Cebir</h2>

          <CodeBlock
            title="Matris Islemleri"
            code={`A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Matris carpimi
np.dot(A, B)            # Dot product
A @ B                   # Matris carpimi
np.matmul(A, B)         # Matris carpimi

# Vektor islemleri
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
np.dot(a, b)            # Skaler carpim: 32
np.cross(a, b)          # Capraz carpim
np.inner(a, b)          # Ic carpim
np.outer(a, b)          # Dis carpim

# Matris ozellikleri
np.linalg.det(A)        # Determinant
np.linalg.inv(A)        # Ters matris
np.trace(A)             # Iz (kosegen toplami)
np.linalg.matrix_rank(A)  # Rank

# Eigenvalue ve eigenvector
eigenvalues, eigenvectors = np.linalg.eig(A)

# Singular Value Decomposition
U, S, V = np.linalg.svd(A)

# Lineer denklem sistemi cozumu
# Ax = b
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
x = np.linalg.solve(A, b)

# Norm
np.linalg.norm(a)           # L2 norm
np.linalg.norm(a, ord=1)    # L1 norm
np.linalg.norm(A, 'fro')    # Frobenius norm`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Array Manipulasyonu</h2>

          <CodeBlock
            title="Birlestirme ve Bolme"
            code={`a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Birlestirme
np.concatenate([a, b])      # [1, 2, 3, 4, 5, 6]
np.stack([a, b])            # [[1,2,3], [4,5,6]]
np.vstack([a, b])           # Dikey birlestir
np.hstack([a, b])           # Yatay birlestir
np.dstack([a, b])           # Derinlik birlestir

# Bolme
arr = np.array([1, 2, 3, 4, 5, 6])
np.split(arr, 3)            # 3 esit parca
np.split(arr, [2, 4])       # Belirli index'lerden

arr_2d = np.arange(16).reshape(4, 4)
np.vsplit(arr_2d, 2)        # Dikey bol
np.hsplit(arr_2d, 2)        # Yatay bol

# Ekleme ve silme
np.append(a, [7, 8])
np.insert(a, 1, 10)         # Index 1'e 10 ekle
np.delete(a, 1)             # Index 1'i sil

# Tekrarlama
np.repeat(a, 3)             # Her eleman 3 kez
np.tile(a, 3)               # Dizi 3 kez`}
          />

          <CodeBlock
            title="Siralama ve Arama"
            code={`arr = np.array([3, 1, 4, 1, 5, 9, 2, 6])

# Siralama
np.sort(arr)                # Kucukten buyuge
np.argsort(arr)             # Siralanmis index'ler
np.sort(arr)[::-1]          # Buyukten kucuge

# 2D siralama
arr_2d = np.array([[3, 1], [4, 2]])
np.sort(arr_2d, axis=0)     # Sutun bazli
np.sort(arr_2d, axis=1)     # Satir bazli

# Arama
np.where(arr > 3)           # Kosulu saglayan index'ler
np.argwhere(arr > 3)        # 2D index
np.searchsorted([1, 2, 4, 5], 3)  # Eklenecek index

# Benzersiz
np.unique(arr)              # Benzersiz elemanlar
np.unique(arr, return_counts=True)

# Min/Max pozisyonlar
np.argmin(arr)
np.argmax(arr)
np.unravel_index(np.argmax(arr_2d), arr_2d.shape)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Broadcasting</h2>

          <CodeBlock
            title="Broadcasting Kurallari"
            code={`# Broadcasting: Farkli sekilli array'lerin islem yapabilmesi

# Skaler broadcasting
arr = np.array([1, 2, 3])
arr + 10  # [11, 12, 13]

# 1D + 2D
a = np.array([1, 2, 3])           # (3,)
b = np.array([[1], [2], [3]])     # (3, 1)
a + b     # (3, 3) sonuc

# Satir + Sutun
satir = np.array([1, 2, 3])       # (3,)
sutun = np.array([[1], [2]])      # (2, 1)
satir + sutun  # (2, 3) sonuc

# Mesh grid olusturma
x = np.array([1, 2, 3])
y = np.array([4, 5])
xx, yy = np.meshgrid(x, y)

# Broadcasting ile islem
# (3,) + (2, 1) -> (2, 3)
# Kurallar:
# 1. Boyutlar esitlenir (soldan 1 eklenir)
# 2. Boyut 1 olan genisletilir`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Dosya Islemleri</h2>

          <CodeBlock
            title="Kaydetme ve Yukleme"
            code={`arr = np.array([1, 2, 3, 4, 5])

# Binary format (.npy)
np.save('array.npy', arr)
loaded = np.load('array.npy')

# Birden fazla array (.npz)
np.savez('arrays.npz', a=arr, b=arr*2)
data = np.load('arrays.npz')
data['a']
data['b']

# Sikistirilmis (.npz)
np.savez_compressed('arrays.npz', a=arr)

# Text format
np.savetxt('array.txt', arr)
np.savetxt('array.csv', arr, delimiter=',')
loaded = np.loadtxt('array.txt')
loaded = np.genfromtxt('data.csv', delimiter=',')`}
          />
        </section>
      </div>
    </div>
  )
}
