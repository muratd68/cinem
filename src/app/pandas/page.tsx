'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Table, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PandasCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500">
            <Table className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Pandas Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>DataFrame islemleri ve veri analizi</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">DataFrame Olusturma</h2>

          <CodeBlock
            title="DataFrame Tanimlama"
            code={`import pandas as pd
import numpy as np

# Dictionary'den DataFrame
df = pd.DataFrame({
    'Ad': ['Ali', 'Veli', 'Ayse', 'Fatma'],
    'Yas': [25, 30, 28, 35],
    'Sehir': ['Istanbul', 'Ankara', 'Izmir', 'Istanbul'],
    'Maas': [5000, 6000, 5500, 7000]
})

# Liste'den DataFrame
data = [['Ali', 25], ['Veli', 30]]
df = pd.DataFrame(data, columns=['Ad', 'Yas'])

# NumPy array'den
arr = np.array([[1, 2, 3], [4, 5, 6]])
df = pd.DataFrame(arr, columns=['A', 'B', 'C'])

# CSV'den okuma
df = pd.read_csv('veri.csv')
df = pd.read_csv('veri.csv', sep=';', encoding='utf-8')
df = pd.read_csv('veri.csv', usecols=['Ad', 'Yas'])
df = pd.read_csv('veri.csv', nrows=100)  # Ilk 100 satir

# Excel'den okuma
df = pd.read_excel('veri.xlsx', sheet_name='Sheet1')

# JSON'dan okuma
df = pd.read_json('veri.json')

# SQL'den okuma
import sqlite3
conn = sqlite3.connect('database.db')
df = pd.read_sql('SELECT * FROM tablo', conn)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Islemler</h2>

          <CodeBlock
            title="DataFrame Bilgileri"
            code={`# Ilk/son satirlar
df.head()           # Ilk 5 satir
df.head(10)         # Ilk 10 satir
df.tail()           # Son 5 satir

# Genel bilgi
df.info()           # Sutun tipleri ve bellek
df.describe()       # Istatistiksel ozet
df.shape            # (satir, sutun)
df.columns          # Sutun isimleri
df.dtypes           # Veri tipleri
df.index            # Index bilgisi

# Bellek kullanimi
df.memory_usage()
df.memory_usage(deep=True)

# Benzersiz degerler
df['Sehir'].unique()
df['Sehir'].nunique()
df['Sehir'].value_counts()`}
          />

          <CodeBlock
            title="Sutun ve Satir Secimi"
            code={`# Tek sutun secimi
df['Ad']                    # Series olarak
df[['Ad']]                  # DataFrame olarak

# Coklu sutun secimi
df[['Ad', 'Yas']]

# Satir secimi (loc - label based)
df.loc[0]                   # Ilk satir
df.loc[0:2]                 # 0, 1, 2 satirlari
df.loc[0, 'Ad']             # Tek deger
df.loc[0:2, ['Ad', 'Yas']]  # Alt tablo

# Satir secimi (iloc - integer based)
df.iloc[0]                  # Ilk satir
df.iloc[0:3]                # 0, 1, 2 satirlari
df.iloc[0, 1]               # (0, 1) hucre
df.iloc[0:3, 0:2]           # Alt tablo

# Kosullu secim
df[df['Yas'] > 25]
df[df['Sehir'] == 'Istanbul']
df[(df['Yas'] > 25) & (df['Maas'] > 5000)]
df[(df['Yas'] > 25) | (df['Sehir'] == 'Ankara')]
df[df['Sehir'].isin(['Istanbul', 'Ankara'])]
df[df['Ad'].str.contains('li')]
df.query('Yas > 25 and Maas > 5000')`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Veri Manipulasyonu</h2>

          <CodeBlock
            title="Sutun Islemleri"
            code={`# Yeni sutun ekleme
df['Yeni'] = 0
df['Bonus'] = df['Maas'] * 0.1
df['Tam_Ad'] = df['Ad'] + ' ' + df['Soyad']

# Sutun silme
df.drop('Yeni', axis=1, inplace=True)
df.drop(['A', 'B'], axis=1, inplace=True)

# Sutun yeniden adlandirma
df.rename(columns={'Ad': 'Isim', 'Yas': 'Age'}, inplace=True)

# Sutun siralamasi degistirme
df = df[['Yas', 'Ad', 'Sehir', 'Maas']]
cols = df.columns.tolist()
df = df[cols[-1:] + cols[:-1]]

# Veri tipi degistirme
df['Yas'] = df['Yas'].astype(float)
df['Tarih'] = pd.to_datetime(df['Tarih'])
df['Kategori'] = df['Kategori'].astype('category')`}
          />

          <CodeBlock
            title="Satir Islemleri"
            code={`# Satir ekleme
yeni_satir = {'Ad': 'Mehmet', 'Yas': 40}
df = pd.concat([df, pd.DataFrame([yeni_satir])], ignore_index=True)

# Satir silme
df.drop(0, inplace=True)              # Index ile
df.drop([0, 1, 2], inplace=True)      # Birden fazla
df = df[df['Yas'] > 25]               # Kosul ile

# Siralama
df.sort_values('Yas', ascending=True)
df.sort_values('Yas', ascending=False)
df.sort_values(['Sehir', 'Yas'], ascending=[True, False])
df.sort_index()`}
          />

          <CodeBlock
            title="Eksik Veri Yonetimi"
            code={`# Eksik veri kontrolu
df.isnull()
df.isnull().sum()
df.isnull().any()
df.notnull()

# Eksik veri silme
df.dropna()                     # Herhangi bir NaN
df.dropna(axis=1)               # NaN olan sutunlar
df.dropna(subset=['Ad'])        # Belirli sutunda
df.dropna(how='all')            # Tumu NaN ise

# Eksik veri doldurma
df.fillna(0)
df.fillna(method='ffill')       # Forward fill
df.fillna(method='bfill')       # Backward fill
df['Yas'].fillna(df['Yas'].mean(), inplace=True)
df.fillna({'Yas': 0, 'Maas': 5000})

# Interpolation
df.interpolate()
df.interpolate(method='linear')`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Gruplama ve Aggregation</h2>

          <CodeBlock
            title="GroupBy Islemleri"
            code={`# Temel gruplama
df.groupby('Sehir').mean()
df.groupby('Sehir')['Maas'].mean()
df.groupby('Sehir')['Maas'].sum()

# Coklu gruplama
df.groupby(['Sehir', 'Cinsiyet']).mean()

# Birden fazla aggregation
df.groupby('Sehir').agg({
    'Maas': ['mean', 'sum', 'count'],
    'Yas': ['min', 'max']
})

# Ozel fonksiyon
df.groupby('Sehir').agg(
    Ort_Maas=('Maas', 'mean'),
    Max_Yas=('Yas', 'max'),
    Kisi_Sayisi=('Ad', 'count')
)

# Transform (ayni boyut)
df['Maas_Ort'] = df.groupby('Sehir')['Maas'].transform('mean')

# Filter
df.groupby('Sehir').filter(lambda x: x['Maas'].mean() > 5500)

# Apply
df.groupby('Sehir').apply(lambda x: x.nlargest(2, 'Maas'))`}
          />

          <CodeBlock
            title="Pivot ve Crosstab"
            code={`# Pivot table
pd.pivot_table(
    df,
    values='Maas',
    index='Sehir',
    columns='Cinsiyet',
    aggfunc='mean',
    fill_value=0
)

# Coklu aggregation
pd.pivot_table(
    df,
    values='Maas',
    index='Sehir',
    aggfunc=['mean', 'sum', 'count']
)

# Crosstab
pd.crosstab(df['Sehir'], df['Cinsiyet'])
pd.crosstab(df['Sehir'], df['Cinsiyet'], normalize='index')

# Melt (wide to long)
pd.melt(df, id_vars=['Ad'], value_vars=['Q1', 'Q2', 'Q3'])

# Pivot (long to wide)
df.pivot(index='Tarih', columns='Urun', values='Satis')`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Birlestirme</h2>

          <CodeBlock
            title="Merge ve Join"
            code={`# Merge (SQL-like join)
df1 = pd.DataFrame({'ID': [1, 2, 3], 'Ad': ['A', 'B', 'C']})
df2 = pd.DataFrame({'ID': [1, 2, 4], 'Sehir': ['X', 'Y', 'Z']})

# Inner join
pd.merge(df1, df2, on='ID')

# Left join
pd.merge(df1, df2, on='ID', how='left')

# Right join
pd.merge(df1, df2, on='ID', how='right')

# Outer join
pd.merge(df1, df2, on='ID', how='outer')

# Farkli sutun isimleri
pd.merge(df1, df2, left_on='ID1', right_on='ID2')

# Concat (birlestirme)
pd.concat([df1, df2])                    # Alt alta
pd.concat([df1, df2], axis=1)            # Yan yana
pd.concat([df1, df2], ignore_index=True)

# Join (index uzerinden)
df1.join(df2, how='inner')`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">String Islemleri</h2>

          <CodeBlock
            title="String Methods"
            code={`# String accessor (.str)
df['Ad'].str.lower()
df['Ad'].str.upper()
df['Ad'].str.title()
df['Ad'].str.strip()
df['Ad'].str.len()

# Arama ve degistirme
df['Ad'].str.contains('Ali')
df['Ad'].str.startswith('A')
df['Ad'].str.endswith('i')
df['Ad'].str.replace('Ali', 'Veli')

# Bolme ve birlestirme
df['Ad'].str.split(' ')
df['Ad'].str.split(' ', expand=True)
df['Ad'].str.cat(df['Soyad'], sep=' ')

# Extract (regex)
df['Sayi'] = df['Metin'].str.extract(r'(\\d+)')
df[['Il', 'Plaka']] = df['Kod'].str.extract(r'([A-Z]+)(\\d+)')

# Padding
df['Kod'].str.pad(5, fillchar='0')
df['Kod'].str.zfill(5)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Tarih Islemleri</h2>

          <CodeBlock
            title="DateTime Islemleri"
            code={`# String'den datetime'a
df['Tarih'] = pd.to_datetime(df['Tarih'])
df['Tarih'] = pd.to_datetime(df['Tarih'], format='%d/%m/%Y')

# DateTime bilesenlerine erisim
df['Yil'] = df['Tarih'].dt.year
df['Ay'] = df['Tarih'].dt.month
df['Gun'] = df['Tarih'].dt.day
df['Hafta_Gunu'] = df['Tarih'].dt.dayofweek
df['Hafta'] = df['Tarih'].dt.isocalendar().week
df['Ceyrek'] = df['Tarih'].dt.quarter

# Tarih araligi olusturma
pd.date_range('2024-01-01', periods=10)
pd.date_range('2024-01-01', '2024-12-31', freq='M')

# Resampling (zaman serisi)
df.set_index('Tarih', inplace=True)
df.resample('M').sum()      # Aylik toplam
df.resample('W').mean()     # Haftalik ortalama
df.resample('Q').count()    # Ceyreklik sayim

# Rolling (hareketli pencere)
df['MA_7'] = df['Deger'].rolling(7).mean()
df['MA_30'] = df['Deger'].rolling(30).mean()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kaydetme</h2>

          <CodeBlock
            title="Dosyaya Kaydetme"
            code={`# CSV
df.to_csv('cikti.csv', index=False)
df.to_csv('cikti.csv', sep=';', encoding='utf-8')

# Excel
df.to_excel('cikti.xlsx', index=False)
df.to_excel('cikti.xlsx', sheet_name='Veri')

# JSON
df.to_json('cikti.json', orient='records')

# SQL
df.to_sql('tablo', conn, if_exists='replace')

# Pickle (hizli kayit/yukleme)
df.to_pickle('veri.pkl')
df = pd.read_pickle('veri.pkl')

# Parquet (buyuk veri icin)
df.to_parquet('veri.parquet')
df = pd.read_parquet('veri.parquet')`}
          />
        </section>
      </div>
    </div>
  )
}
