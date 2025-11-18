'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { FileCode, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function RegexCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-pink-500">
            <FileCode className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Regex Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Duzenli ifadeler ve pattern matching</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Karakterler</h2>

          <CodeBlock
            title="Meta Karakterler"
            code={`.       Herhangi bir karakter (newline haric)
^       Satir basi
$       Satir sonu
\\      Escape karakteri
|       OR (alternatif)

# Ornekler
^hello      # "hello" ile baslayan
world$      # "world" ile biten
^hello$     # Tam olarak "hello"
cat|dog     # "cat" veya "dog"`}
          />

          <CodeBlock
            title="Karakter Siniflari"
            code={`[abc]       # a, b veya c
[^abc]      # a, b, c disinda
[a-z]       # a'dan z'ye kucuk harf
[A-Z]       # A'dan Z'ye buyuk harf
[0-9]       # 0'dan 9'a rakam
[a-zA-Z]    # Tum harfler
[a-zA-Z0-9] # Harfler ve rakamlar

# Ozel karakter siniflari
\\d         # Rakam [0-9]
\\D         # Rakam olmayan [^0-9]
\\w         # Kelime karakteri [a-zA-Z0-9_]
\\W         # Kelime karakteri olmayan
\\s         # Bosluk (space, tab, newline)
\\S         # Bosluk olmayan

# Ornekler
[aeiou]     # Sesli harfler
[^0-9]      # Rakam olmayan
\\d{3}      # 3 rakam
\\w+        # Bir veya daha fazla kelime karakteri`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Niceleyiciler (Quantifiers)</h2>

          <CodeBlock
            title="Tekrar Sayisi"
            code={`*       # 0 veya daha fazla
+       # 1 veya daha fazla
?       # 0 veya 1
{n}     # Tam n kez
{n,}    # En az n kez
{n,m}   # n ile m arasi

# Ornekler
a*          # "", "a", "aa", "aaa"...
a+          # "a", "aa", "aaa"...
a?          # "" veya "a"
a{3}        # "aaa"
a{2,4}      # "aa", "aaa", "aaaa"
a{2,}       # "aa", "aaa", "aaaa"...

# Greedy vs Non-greedy
.*          # Greedy (en uzun eslesme)
.*?         # Non-greedy (en kisa eslesme)
.+?         # Non-greedy
.??         # Non-greedy

# Ornek: <b>bold</b>
<.*>        # "<b>bold</b>" (tum)
<.*?>       # "<b>" (ilk tag)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Gruplar ve Referanslar</h2>

          <CodeBlock
            title="Gruplama"
            code={`(abc)       # Yakalama grubu
(?:abc)     # Yakalamayan grup
(?P<name>)  # Isimli grup (Python)
(?<name>)   # Isimli grup (JavaScript)

# Geri referans
\\1, \\2     # Grup referansi
(?P=name)   # Isimli grup referansi

# Ornekler
(ab)+           # "ab", "abab", "ababab"
(ha){2,}        # "haha", "hahaha"...
(\\d{3})-(\\d{4})  # "123-4567" -> grup1: 123, grup2: 4567

# Tekrarlanan kelime bulma
\\b(\\w+)\\s+\\1\\b   # "the the", "is is"

# Isimli grup
(?P<area>\\d{3})-(?P<number>\\d{4})
# "123-4567" -> area: 123, number: 4567`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Lookahead ve Lookbehind</h2>

          <CodeBlock
            title="Assertions"
            code={`(?=...)     # Positive lookahead
(?!...)     # Negative lookahead
(?<=...)    # Positive lookbehind
(?<!...)    # Negative lookbehind

# Positive lookahead: Sonrasinda X var
\\d+(?=px)      # "100px" -> "100"
\\w+(?=@)       # "user@email" -> "user"

# Negative lookahead: Sonrasinda X yok
\\d+(?!px)      # "100em" -> "100"

# Positive lookbehind: Oncesinde X var
(?<=\\$)\\d+    # "$100" -> "100"
(?<=@)\\w+      # "user@domain" -> "domain"

# Negative lookbehind: Oncesinde X yok
(?<!\\$)\\d+    # "100 items" -> "100"

# Kombinasyon
(?<=<b>).*?(?=</b>)  # <b>text</b> -> "text"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sinir Belirteçleri</h2>

          <CodeBlock
            title="Boundaries"
            code={`\\b      # Kelime siniri
\\B      # Kelime siniri olmayan
^       # Satir basi
$       # Satir sonu
\\A      # String basi
\\Z      # String sonu

# Ornekler
\\bcat\\b       # "cat" kelimesi (tam)
\\bcat         # "cat" ile baslayan kelime
cat\\b         # "cat" ile biten kelime
\\Bcat\\B       # Kelime icinde "cat"

# "The cat is catching" ornegi
\\bcat\\b       # "cat" (sadece)
\\bcat         # "cat", "catching"
cat            # "cat", "catching"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Python ile Regex</h2>

          <CodeBlock
            title="re Modulu"
            code={`import re

text = "Email: user@example.com, Phone: 555-1234"

# Temel fonksiyonlar
re.search(pattern, text)    # Ilk eslesen
re.match(pattern, text)     # Basindan esle
re.findall(pattern, text)   # Tum eslesenler (liste)
re.finditer(pattern, text)  # Tum eslesenler (iterator)
re.sub(pattern, repl, text) # Degistir
re.split(pattern, text)     # Bol

# search
match = re.search(r'\\d+', text)
if match:
    print(match.group())    # "555"
    print(match.start())    # Baslangic indexi
    print(match.end())      # Bitis indexi
    print(match.span())     # (start, end)

# findall
emails = re.findall(r'[\\w.-]+@[\\w.-]+', text)
print(emails)  # ['user@example.com']

# sub
result = re.sub(r'\\d', 'X', text)
# "Email: user@example.com, Phone: XXX-XXXX"

# split
parts = re.split(r'[,;]', "a,b;c,d")
# ['a', 'b', 'c', 'd']

# Flags
re.search(pattern, text, re.IGNORECASE)  # re.I
re.search(pattern, text, re.MULTILINE)   # re.M
re.search(pattern, text, re.DOTALL)      # re.S

# Compile
pattern = re.compile(r'\\d+')
matches = pattern.findall(text)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Yaygin Patternler</h2>

          <CodeBlock
            title="Sik Kullanilan Regex"
            code={`# Email
^[\\w.-]+@[\\w.-]+\\.\\w+$

# Telefon (TR)
^(0?5\\d{2})\\s?\\d{3}\\s?\\d{2}\\s?\\d{2}$

# URL
^https?://[\\w.-]+(?:\\.[\\w.-]+)+[\\w.,@?^=%&:/~+#-]*$

# IP Adresi
^(?:\\d{1,3}\\.){3}\\d{1,3}$

# Tarih (DD/MM/YYYY)
^(0[1-9]|[12]\\d|3[01])/(0[1-9]|1[012])/(\\d{4})$

# Saat (HH:MM)
^([01]\\d|2[0-3]):([0-5]\\d)$

# TC Kimlik No
^[1-9]\\d{10}$

# Plaka (TR)
^(0[1-9]|[1-7]\\d|8[01])\\s?[A-Z]{1,3}\\s?\\d{2,4}$

# Sifre (en az 8 karakter, harf ve rakam)
^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$

# Hex renk
^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$

# HTML tag
<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)

# Bosluktan kelime ayirma
\\S+

# Satirlari ayirma
[^\\r\\n]+`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">JavaScript ile Regex</h2>

          <CodeBlock
            language="javascript"
            title="JavaScript Regex"
            code={`// Regex tanimlama
const regex = /pattern/flags;
const regex = new RegExp('pattern', 'flags');

// Flags
// g - global (tum eslesenler)
// i - case insensitive
// m - multiline
// s - dotall (. newline dahil)

// test - boolean doner
/\\d+/.test('abc123');  // true

// exec - eslesen bilgisi
const match = /\\d+/.exec('abc123');
// ['123', index: 3, input: 'abc123']

// match - eslesen array
'abc123def456'.match(/\\d+/g);  // ['123', '456']

// replace
'hello world'.replace(/world/, 'there');
// 'hello there'

'aaa'.replace(/a/g, 'b');  // 'bbb'

// Gruplari kullanma
'John Smith'.replace(/(\\w+) (\\w+)/, '$2, $1');
// 'Smith, John'

// split
'a,b;c'.split(/[,;]/);  // ['a', 'b', 'c']

// Named groups
const regex = /(?<year>\\d{4})-(?<month>\\d{2})/;
const match = regex.exec('2024-01');
console.log(match.groups.year);   // '2024'
console.log(match.groups.month);  // '01'`}
          />
        </section>
      </div>
    </div>
  )
}
