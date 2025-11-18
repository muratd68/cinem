'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Code, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PythonCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500">
            <Code className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Python Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Temel Python syntax ve kullanim ornekleri</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Veri Tipleri */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Veri Tipleri</h2>

          <h3 className="text-lg font-semibold mb-2">String (Metin)</h3>
          <CodeBlock
            title="String Islemleri"
            code={`# String tanimlama
isim = "Python"
mesaj = 'Merhaba Dunya'
cok_satirli = """Bu cok
satirli bir stringdir"""

# String metodlari
metin = "merhaba dunya"
print(metin.upper())        # MERHABA DUNYA
print(metin.lower())        # merhaba dunya
print(metin.title())        # Merhaba Dunya
print(metin.capitalize())   # Merhaba dunya
print(metin.strip())        # Bosluklari sil
print(metin.replace("a", "e"))  # merhebe dunye
print(metin.split(" "))     # ['merhaba', 'dunya']
print(len(metin))           # 13

# String formatlama
ad = "Ali"
yas = 25
print(f"Benim adim {ad}, yasim {yas}")  # f-string
print("Adim: {}, Yasim: {}".format(ad, yas))
print("Adim: %s, Yasim: %d" % (ad, yas))

# String dilimleme
s = "Python"
print(s[0])      # P
print(s[-1])     # n
print(s[0:3])    # Pyt
print(s[::2])    # Pto
print(s[::-1])   # nohtyP`}
          />

          <h3 className="text-lg font-semibold mb-2 mt-6">Sayilar</h3>
          <CodeBlock
            title="Sayi Islemleri"
            code={`# Sayi tipleri
tam_sayi = 42          # int
ondalik = 3.14         # float
karmasik = 2 + 3j      # complex

# Matematiksel islemler
a, b = 10, 3
print(a + b)    # 13 (toplama)
print(a - b)    # 7 (cikarma)
print(a * b)    # 30 (carpma)
print(a / b)    # 3.333... (bolme)
print(a // b)   # 3 (tam bolme)
print(a % b)    # 1 (mod)
print(a ** b)   # 1000 (us alma)

# Math modulu
import math
print(math.sqrt(16))    # 4.0
print(math.ceil(4.2))   # 5
print(math.floor(4.8))  # 4
print(math.pi)          # 3.14159...
print(math.e)           # 2.71828...
print(math.log(10))     # 2.302...
print(math.sin(0))      # 0.0

# Tip donusumu
x = "42"
print(int(x))      # 42
print(float(x))    # 42.0
print(str(42))     # "42"
print(bool(1))     # True
print(bool(0))     # False`}
          />

          <h3 className="text-lg font-semibold mb-2 mt-6">Liste (List)</h3>
          <CodeBlock
            title="Liste Islemleri"
            code={`# Liste tanimlama
liste = [1, 2, 3, 4, 5]
karisik = [1, "iki", 3.0, True]
bos_liste = []

# Eleman ekleme
liste.append(6)         # Sona ekle [1,2,3,4,5,6]
liste.insert(0, 0)      # Indekse ekle [0,1,2,3,4,5,6]
liste.extend([7, 8])    # Liste ekle [0,1,2,3,4,5,6,7,8]

# Eleman silme
liste.remove(0)         # Degere gore sil
liste.pop()             # Sondan sil ve dondur
liste.pop(0)            # Indeksten sil
del liste[0]            # del ile sil
liste.clear()           # Tumunu sil

# Liste metodlari
sayilar = [3, 1, 4, 1, 5, 9, 2, 6]
print(len(sayilar))           # 8
print(min(sayilar))           # 1
print(max(sayilar))           # 9
print(sum(sayilar))           # 31
print(sayilar.count(1))       # 2
print(sayilar.index(4))       # 2

# Siralama
sayilar.sort()                # Kucukten buyuge
sayilar.sort(reverse=True)    # Buyukten kucuge
sayilar.reverse()             # Ters cevir
yeni = sorted(sayilar)        # Yeni liste dondur

# Liste dilimleme
lst = [0, 1, 2, 3, 4, 5]
print(lst[2:4])     # [2, 3]
print(lst[:3])      # [0, 1, 2]
print(lst[3:])      # [3, 4, 5]
print(lst[::2])     # [0, 2, 4]
print(lst[::-1])    # [5, 4, 3, 2, 1, 0]

# List Comprehension
kareler = [x**2 for x in range(10)]
ciftler = [x for x in range(20) if x % 2 == 0]
matris = [[i*j for j in range(3)] for i in range(3)]`}
          />

          <h3 className="text-lg font-semibold mb-2 mt-6">Sozluk (Dictionary)</h3>
          <CodeBlock
            title="Dictionary Islemleri"
            code={`# Dictionary tanimlama
kisi = {
    "ad": "Ali",
    "yas": 25,
    "sehir": "Istanbul"
}

# Erisim
print(kisi["ad"])           # Ali
print(kisi.get("yas"))      # 25
print(kisi.get("meslek", "Yok"))  # Varsayilan deger

# Ekleme ve guncelleme
kisi["meslek"] = "Muhendis"
kisi.update({"email": "ali@mail.com", "yas": 26})

# Silme
del kisi["sehir"]
kisi.pop("email")
kisi.popitem()              # Son elemani sil

# Dictionary metodlari
print(kisi.keys())          # dict_keys(['ad', 'yas'])
print(kisi.values())        # dict_values(['Ali', 26])
print(kisi.items())         # dict_items([('ad', 'Ali'), ('yas', 26)])

# Iterasyon
for key in kisi:
    print(key, kisi[key])

for key, value in kisi.items():
    print(f"{key}: {value}")

# Dictionary Comprehension
kareler = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Nested Dictionary
ogrenciler = {
    "ali": {"not": 85, "sinif": "A"},
    "veli": {"not": 90, "sinif": "B"}
}
print(ogrenciler["ali"]["not"])  # 85`}
          />

          <h3 className="text-lg font-semibold mb-2 mt-6">Tuple ve Set</h3>
          <CodeBlock
            title="Tuple ve Set Islemleri"
            code={`# Tuple (Degistirilemez liste)
tuple1 = (1, 2, 3)
tuple2 = 1, 2, 3        # Parantez olmadan
tek_eleman = (1,)       # Tek elemanli tuple

# Tuple unpacking
a, b, c = tuple1
x, *rest = (1, 2, 3, 4, 5)  # x=1, rest=[2,3,4,5]

# Set (Benzersiz elemanlar)
set1 = {1, 2, 3, 3, 4}  # {1, 2, 3, 4}
set2 = set([1, 2, 2, 3])

# Set islemleri
set1.add(5)             # Eleman ekle
set1.remove(5)          # Sil (hata verebilir)
set1.discard(5)         # Sil (hata vermez)
set1.pop()              # Rastgele sil

# Kume islemleri
a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)    # Birlesim: {1, 2, 3, 4, 5}
print(a & b)    # Kesisim: {3}
print(a - b)    # Fark: {1, 2}
print(a ^ b)    # Simetrik fark: {1, 2, 4, 5}

# Kontroller
print(3 in a)           # True
print(a.issubset(b))    # False
print(a.isdisjoint(b))  # False`}
          />
        </section>

        {/* Kontrol Yapilari */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kontrol Yapilari</h2>

          <h3 className="text-lg font-semibold mb-2">If-Elif-Else</h3>
          <CodeBlock
            title="Kosul Ifadeleri"
            code={`# Temel if-else
yas = 18
if yas >= 18:
    print("Yetiskin")
elif yas >= 13:
    print("Genc")
else:
    print("Cocuk")

# Tek satirda (Ternary)
sonuc = "Pozitif" if x > 0 else "Negatif"

# Coklu kosul
a, b, c = 5, 10, 15
if a < b < c:
    print("Sirali")

# Mantiksal operatorler
if x > 0 and y > 0:
    print("Ikisi de pozitif")

if x > 0 or y > 0:
    print("En az biri pozitif")

if not (x < 0):
    print("Negatif degil")

# in operatoru
if "a" in "merhaba":
    print("Iceriyor")

if 3 in [1, 2, 3]:
    print("Listede var")`}
          />

          <h3 className="text-lg font-semibold mb-2 mt-6">Donguler</h3>
          <CodeBlock
            title="For ve While Donguleri"
            code={`# For dongusu
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in range(2, 10, 2):
    print(i)  # 2, 4, 6, 8

# Liste uzerinde
meyveler = ["elma", "armut", "muz"]
for meyve in meyveler:
    print(meyve)

# Enumerate ile indeks
for i, meyve in enumerate(meyveler):
    print(f"{i}: {meyve}")

# Zip ile paralel
isimler = ["Ali", "Veli"]
yaslar = [25, 30]
for isim, yas in zip(isimler, yaslar):
    print(f"{isim}: {yas}")

# While dongusu
sayac = 0
while sayac < 5:
    print(sayac)
    sayac += 1

# Break ve Continue
for i in range(10):
    if i == 3:
        continue  # 3'u atla
    if i == 7:
        break     # 7'de dur
    print(i)

# For-else
for i in range(5):
    if i == 10:
        break
else:
    print("Break olmadan bitti")`}
          />
        </section>

        {/* Fonksiyonlar */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Fonksiyonlar</h2>

          <CodeBlock
            title="Fonksiyon Tanimlama"
            code={`# Temel fonksiyon
def selamla(isim):
    return f"Merhaba, {isim}!"

print(selamla("Ali"))  # Merhaba, Ali!

# Varsayilan parametre
def selamla(isim="Dunya"):
    return f"Merhaba, {isim}!"

# Birden fazla parametre
def topla(a, b, c=0):
    return a + b + c

print(topla(1, 2))      # 3
print(topla(1, 2, 3))   # 6

# *args (degisken sayida arguman)
def topla_hepsi(*args):
    return sum(args)

print(topla_hepsi(1, 2, 3, 4))  # 10

# **kwargs (keyword argumanlari)
def bilgi(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

bilgi(ad="Ali", yas=25)

# Lambda fonksiyonlar
kare = lambda x: x ** 2
topla = lambda a, b: a + b

# Map, Filter, Reduce
sayilar = [1, 2, 3, 4, 5]
kareler = list(map(lambda x: x**2, sayilar))
ciftler = list(filter(lambda x: x%2==0, sayilar))

from functools import reduce
toplam = reduce(lambda a, b: a+b, sayilar)

# Decorator
def log_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Cagiriliyor: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Sonuc: {result}")
        return result
    return wrapper

@log_decorator
def topla(a, b):
    return a + b`}
          />

          <h3 className="text-lg font-semibold mb-2 mt-6">Generator ve Iterator</h3>
          <CodeBlock
            title="Generator Fonksiyonlar"
            code={`# Generator fonksiyon
def sayac(n):
    i = 0
    while i < n:
        yield i
        i += 1

for num in sayac(5):
    print(num)

# Generator expression
kareler = (x**2 for x in range(10))

# Iterator protokolu
class Sayac:
    def __init__(self, max):
        self.max = max
        self.n = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.n < self.max:
            sonuc = self.n
            self.n += 1
            return sonuc
        raise StopIteration`}
          />
        </section>

        {/* OOP */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Nesne Yonelimli Programlama</h2>

          <CodeBlock
            title="Class Tanimlama"
            code={`# Temel class
class Araba:
    # Class degiskeni
    tekerlek_sayisi = 4

    # Constructor
    def __init__(self, marka, model, yil):
        # Instance degiskenleri
        self.marka = marka
        self.model = model
        self.yil = yil
        self._hiz = 0  # Protected
        self.__kilometre = 0  # Private

    # Instance metodu
    def bilgi(self):
        return f"{self.yil} {self.marka} {self.model}"

    # Property
    @property
    def hiz(self):
        return self._hiz

    @hiz.setter
    def hiz(self, deger):
        if deger >= 0:
            self._hiz = deger

    # Static method
    @staticmethod
    def klakson():
        return "Dut dut!"

    # Class method
    @classmethod
    def varsayilan(cls):
        return cls("Toyota", "Corolla", 2020)

    # String gosterimi
    def __str__(self):
        return self.bilgi()

    def __repr__(self):
        return f"Araba('{self.marka}', '{self.model}', {self.yil})"

# Kullanim
araba = Araba("BMW", "320i", 2022)
print(araba.bilgi())
araba.hiz = 100
print(Araba.klakson())`}
          />

          <h3 className="text-lg font-semibold mb-2 mt-6">Kalitim</h3>
          <CodeBlock
            title="Inheritance"
            code={`# Kalitim
class Hayvan:
    def __init__(self, isim):
        self.isim = isim

    def ses_cikar(self):
        pass

class Kopek(Hayvan):
    def __init__(self, isim, cins):
        super().__init__(isim)
        self.cins = cins

    def ses_cikar(self):
        return "Hav hav!"

class Kedi(Hayvan):
    def ses_cikar(self):
        return "Miyav!"

# Coklu kalitim
class A:
    def metod(self):
        return "A"

class B(A):
    def metod(self):
        return "B"

class C(A):
    def metod(self):
        return "C"

class D(B, C):
    pass

# Abstract class
from abc import ABC, abstractmethod

class Sekil(ABC):
    @abstractmethod
    def alan(self):
        pass

    @abstractmethod
    def cevre(self):
        pass

class Dikdortgen(Sekil):
    def __init__(self, en, boy):
        self.en = en
        self.boy = boy

    def alan(self):
        return self.en * self.boy

    def cevre(self):
        return 2 * (self.en + self.boy)`}
          />
        </section>

        {/* Dosya Islemleri */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Dosya Islemleri</h2>

          <CodeBlock
            title="Dosya Okuma/Yazma"
            code={`# Dosya okuma
with open("dosya.txt", "r", encoding="utf-8") as f:
    icerik = f.read()           # Tamamini oku
    # veya
    satirlar = f.readlines()    # Liste olarak
    # veya
    for satir in f:
        print(satir.strip())

# Dosya yazma
with open("dosya.txt", "w", encoding="utf-8") as f:
    f.write("Merhaba\\n")
    f.writelines(["satir1\\n", "satir2\\n"])

# Dosyaya ekleme
with open("dosya.txt", "a") as f:
    f.write("Yeni satir\\n")

# JSON islemleri
import json

# JSON yazma
veri = {"ad": "Ali", "yas": 25}
with open("veri.json", "w") as f:
    json.dump(veri, f, indent=2)

# JSON okuma
with open("veri.json", "r") as f:
    veri = json.load(f)

# CSV islemleri
import csv

# CSV yazma
with open("veri.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Ad", "Yas"])
    writer.writerow(["Ali", 25])

# CSV okuma
with open("veri.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)`}
          />
        </section>

        {/* Hata Yonetimi */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Hata Yonetimi</h2>

          <CodeBlock
            title="Try-Except"
            code={`# Temel hata yakalama
try:
    sonuc = 10 / 0
except ZeroDivisionError:
    print("Sifira bolme hatasi!")

# Birden fazla hata
try:
    x = int("abc")
except ValueError:
    print("Gecersiz deger")
except TypeError:
    print("Tip hatasi")
except Exception as e:
    print(f"Hata: {e}")

# else ve finally
try:
    dosya = open("test.txt")
except FileNotFoundError:
    print("Dosya bulunamadi")
else:
    print("Dosya acildi")
    dosya.close()
finally:
    print("Islem tamamlandi")

# Hata firlatma
def yas_kontrol(yas):
    if yas < 0:
        raise ValueError("Yas negatif olamaz")
    return yas

# Ozel exception
class OzelHata(Exception):
    def __init__(self, mesaj):
        self.mesaj = mesaj
        super().__init__(self.mesaj)

try:
    raise OzelHata("Bir hata olustu!")
except OzelHata as e:
    print(e.mesaj)`}
          />
        </section>

        {/* Moduller */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Moduller ve Paketler</h2>

          <CodeBlock
            title="Import Islemleri"
            code={`# Modul import
import math
print(math.sqrt(16))

# Belirli fonksiyon import
from math import sqrt, pi
print(sqrt(16))

# Alias ile import
import numpy as np
import pandas as pd

# Tum fonksiyonlari import (onerilmez)
from math import *

# Kendi modulun
# mymodule.py
def selamla(isim):
    return f"Merhaba {isim}"

# Baska dosyada
from mymodule import selamla

# __name__ kontrolu
if __name__ == "__main__":
    # Sadece direkt calistirildiginda
    print("Ana program")

# Yararli moduller
import os
import sys
import datetime
import random
import re
import collections
import itertools`}
          />
        </section>
      </div>
    </div>
  )
}
