'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { BarChart3, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function MatplotlibCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-500">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Matplotlib Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Grafik ve gorsellestirme</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Grafikler</h2>

          <CodeBlock
            title="Line Plot"
            code={`import matplotlib.pyplot as plt
import numpy as np

# Temel line plot
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y)
plt.title('Sinus Grafigi')
plt.xlabel('X Ekseni')
plt.ylabel('Y Ekseni')
plt.grid(True)
plt.show()

# Birden fazla cizgi
plt.plot(x, np.sin(x), label='sin(x)')
plt.plot(x, np.cos(x), label='cos(x)')
plt.legend()
plt.show()

# Stil ozellestirme
plt.plot(x, y,
    color='red',           # Renk
    linestyle='--',        # Cizgi stili: '-', '--', ':', '-.'
    linewidth=2,           # Kalinlik
    marker='o',            # Isaretci
    markersize=5,          # Isaretci boyutu
    alpha=0.7              # Seffaflik
)

# Kisa format: 'renk isaretci cizgi'
plt.plot(x, y, 'ro-')     # Kirmizi, daire, duz cizgi
plt.plot(x, y, 'b^--')    # Mavi, ucgen, kesikli`}
          />

          <CodeBlock
            title="Scatter Plot"
            code={`# Temel scatter
x = np.random.randn(100)
y = np.random.randn(100)

plt.scatter(x, y)
plt.show()

# Ozellestirmeli scatter
colors = np.random.rand(100)
sizes = 1000 * np.random.rand(100)

plt.scatter(x, y,
    c=colors,           # Renk degerleri
    s=sizes,            # Boyutlar
    alpha=0.5,          # Seffaflik
    cmap='viridis'      # Renk haritasi
)
plt.colorbar()          # Renk cubugu
plt.show()`}
          />

          <CodeBlock
            title="Bar Chart"
            code={`# Dikey bar
kategoriler = ['A', 'B', 'C', 'D']
degerler = [25, 40, 30, 55]

plt.bar(kategoriler, degerler, color='steelblue')
plt.title('Bar Chart')
plt.show()

# Yatay bar
plt.barh(kategoriler, degerler)
plt.show()

# Gruplu bar
x = np.arange(4)
width = 0.35
degerler1 = [25, 40, 30, 55]
degerler2 = [30, 35, 40, 45]

plt.bar(x - width/2, degerler1, width, label='Grup 1')
plt.bar(x + width/2, degerler2, width, label='Grup 2')
plt.xticks(x, kategoriler)
plt.legend()
plt.show()

# Yigin bar
plt.bar(kategoriler, degerler1, label='Grup 1')
plt.bar(kategoriler, degerler2, bottom=degerler1, label='Grup 2')
plt.legend()
plt.show()`}
          />

          <CodeBlock
            title="Histogram ve Pie Chart"
            code={`# Histogram
data = np.random.randn(1000)

plt.hist(data, bins=30, edgecolor='black', alpha=0.7)
plt.xlabel('Deger')
plt.ylabel('Frekans')
plt.show()

# Ozellestirilmis histogram
plt.hist(data,
    bins=50,
    density=True,        # Normalize
    cumulative=True,     # Kumulatif
    histtype='step'      # Sadece kenar
)
plt.show()

# Pie chart
boyutlar = [25, 30, 20, 25]
etiketler = ['A', 'B', 'C', 'D']
explode = (0.1, 0, 0, 0)  # Dilimi ayir

plt.pie(boyutlar,
    labels=etiketler,
    explode=explode,
    autopct='%1.1f%%',    # Yuzde goster
    shadow=True,
    startangle=90
)
plt.axis('equal')
plt.show()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Subplot ve Layout</h2>

          <CodeBlock
            title="Subplot Olusturma"
            code={`# Temel subplot
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('Sin')

axes[0, 1].plot(x, np.cos(x))
axes[0, 1].set_title('Cos')

axes[1, 0].plot(x, np.tan(x))
axes[1, 0].set_title('Tan')

axes[1, 1].plot(x, x**2)
axes[1, 1].set_title('x^2')

plt.tight_layout()
plt.show()

# Farkli boyutlarda subplot
fig = plt.figure(figsize=(12, 6))

ax1 = fig.add_subplot(2, 2, 1)
ax2 = fig.add_subplot(2, 2, 2)
ax3 = fig.add_subplot(2, 1, 2)

ax1.plot(x, np.sin(x))
ax2.plot(x, np.cos(x))
ax3.plot(x, np.tan(x))

plt.tight_layout()
plt.show()

# GridSpec
from matplotlib.gridspec import GridSpec
fig = plt.figure(figsize=(12, 8))
gs = GridSpec(3, 3, figure=fig)

ax1 = fig.add_subplot(gs[0, :])      # Ilk satir, tum sutunlar
ax2 = fig.add_subplot(gs[1:, 0])     # 2-3 satir, ilk sutun
ax3 = fig.add_subplot(gs[1:, 1:])    # 2-3 satir, 2-3 sutun`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Ozellestirme</h2>

          <CodeBlock
            title="Stil ve Tema"
            code={`# Mevcut stilleri gor
print(plt.style.available)

# Stil uygula
plt.style.use('seaborn')
plt.style.use('ggplot')
plt.style.use('dark_background')

# Gecici stil
with plt.style.context('seaborn'):
    plt.plot(x, y)
    plt.show()

# Ozel renk paleti
colors = plt.cm.viridis(np.linspace(0, 1, 10))

# Figure ozellikleri
fig, ax = plt.subplots(figsize=(10, 6), dpi=100)
fig.suptitle('Ana Baslik', fontsize=16)

# Eksen ozellikleri
ax.set_xlim(0, 10)
ax.set_ylim(-1, 1)
ax.set_xticks([0, 2, 4, 6, 8, 10])
ax.set_xticklabels(['A', 'B', 'C', 'D', 'E', 'F'])
ax.tick_params(axis='x', rotation=45)

# Grid
ax.grid(True, linestyle='--', alpha=0.7)
ax.axhline(y=0, color='k', linestyle='-', linewidth=0.5)
ax.axvline(x=5, color='r', linestyle='--')`}
          />

          <CodeBlock
            title="Anotasyon ve Metin"
            code={`# Metin ekleme
plt.text(5, 0.5, 'Orta Nokta', fontsize=12, ha='center')

# Anotasyon (ok ile)
plt.annotate('Maksimum',
    xy=(np.pi/2, 1),           # Hedef nokta
    xytext=(np.pi/2 + 1, 0.5), # Metin konumu
    arrowprops=dict(
        facecolor='black',
        shrink=0.05,
        width=2
    ),
    fontsize=10
)

# Dikdortgen ekleme
from matplotlib.patches import Rectangle
rect = Rectangle((2, 0.2), 3, 0.5,
    fill=True,
    facecolor='yellow',
    edgecolor='black',
    alpha=0.3
)
plt.gca().add_patch(rect)

# Daire ekleme
from matplotlib.patches import Circle
circle = Circle((5, 0), 0.3, fill=False, color='red')
plt.gca().add_patch(circle)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Ileri Grafikler</h2>

          <CodeBlock
            title="Heatmap ve Contour"
            code={`# Heatmap
data = np.random.rand(10, 10)
plt.imshow(data, cmap='hot', interpolation='nearest')
plt.colorbar()
plt.show()

# Seaborn ile heatmap
import seaborn as sns
sns.heatmap(data, annot=True, fmt='.2f', cmap='YlOrRd')
plt.show()

# Contour plot
x = np.linspace(-3, 3, 100)
y = np.linspace(-3, 3, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(X) * np.cos(Y)

plt.contour(X, Y, Z, levels=20)
plt.colorbar()
plt.show()

# Filled contour
plt.contourf(X, Y, Z, levels=20, cmap='RdBu')
plt.colorbar()
plt.show()`}
          />

          <CodeBlock
            title="3D Grafikler"
            code={`from mpl_toolkits.mplot3d import Axes3D

# 3D scatter
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

x = np.random.rand(100)
y = np.random.rand(100)
z = np.random.rand(100)

ax.scatter(x, y, z)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
plt.show()

# 3D surface
x = np.linspace(-5, 5, 50)
y = np.linspace(-5, 5, 50)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(X, Y, Z, cmap='viridis')
plt.show()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kaydetme</h2>

          <CodeBlock
            title="Grafik Kaydetme"
            code={`# PNG olarak kaydet
plt.savefig('grafik.png', dpi=300, bbox_inches='tight')

# Farkli formatlar
plt.savefig('grafik.pdf')
plt.savefig('grafik.svg')
plt.savefig('grafik.jpg', quality=95)

# Seffaf arka plan
plt.savefig('grafik.png', transparent=True)

# Figure object ile
fig.savefig('grafik.png',
    dpi=300,
    bbox_inches='tight',
    facecolor='white',
    edgecolor='none'
)`}
          />
        </section>
      </div>
    </div>
  )
}
