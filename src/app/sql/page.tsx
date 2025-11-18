'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Database, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SQLCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">SQL Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Veritabani sorgulari ve islemleri</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Sorgular</h2>

          <CodeBlock
            language="sql"
            title="SELECT Ifadeleri"
            code={`-- Tum verileri sec
SELECT * FROM calisanlar;

-- Belirli sutunlari sec
SELECT ad, soyad, maas FROM calisanlar;

-- Alias kullanimi
SELECT ad AS isim, maas AS ucret FROM calisanlar;
SELECT c.ad, d.ad AS departman
FROM calisanlar c, departmanlar d;

-- Benzersiz degerler
SELECT DISTINCT sehir FROM calisanlar;
SELECT DISTINCT departman, pozisyon FROM calisanlar;

-- Limit
SELECT * FROM calisanlar LIMIT 10;
SELECT * FROM calisanlar LIMIT 10 OFFSET 20;

-- Siralama
SELECT * FROM calisanlar ORDER BY maas;
SELECT * FROM calisanlar ORDER BY maas DESC;
SELECT * FROM calisanlar ORDER BY departman ASC, maas DESC;`}
          />

          <CodeBlock
            language="sql"
            title="WHERE Kosullari"
            code={`-- Temel kosullar
SELECT * FROM calisanlar WHERE departman = 'IT';
SELECT * FROM calisanlar WHERE maas > 5000;
SELECT * FROM calisanlar WHERE maas >= 5000 AND maas <= 10000;
SELECT * FROM calisanlar WHERE maas BETWEEN 5000 AND 10000;

-- Mantiksal operatorler
SELECT * FROM calisanlar
WHERE departman = 'IT' AND maas > 5000;

SELECT * FROM calisanlar
WHERE departman = 'IT' OR departman = 'HR';

SELECT * FROM calisanlar
WHERE NOT departman = 'IT';

-- IN operatoru
SELECT * FROM calisanlar
WHERE departman IN ('IT', 'HR', 'Finans');

-- LIKE ile arama
SELECT * FROM calisanlar WHERE ad LIKE 'A%';     -- A ile baslar
SELECT * FROM calisanlar WHERE ad LIKE '%a';     -- a ile biter
SELECT * FROM calisanlar WHERE ad LIKE '%li%';   -- li icerir
SELECT * FROM calisanlar WHERE ad LIKE '_li';    -- 3 harf, li ile biter

-- NULL kontrolu
SELECT * FROM calisanlar WHERE email IS NULL;
SELECT * FROM calisanlar WHERE email IS NOT NULL;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Aggregation Fonksiyonlari</h2>

          <CodeBlock
            language="sql"
            title="Toplama Fonksiyonlari"
            code={`-- Temel fonksiyonlar
SELECT COUNT(*) FROM calisanlar;
SELECT COUNT(DISTINCT departman) FROM calisanlar;
SELECT SUM(maas) FROM calisanlar;
SELECT AVG(maas) FROM calisanlar;
SELECT MIN(maas) FROM calisanlar;
SELECT MAX(maas) FROM calisanlar;

-- GROUP BY
SELECT departman, COUNT(*) AS calisan_sayisi
FROM calisanlar
GROUP BY departman;

SELECT departman, AVG(maas) AS ortalama_maas
FROM calisanlar
GROUP BY departman;

-- Birden fazla sutunla gruplama
SELECT departman, pozisyon, COUNT(*)
FROM calisanlar
GROUP BY departman, pozisyon;

-- HAVING (GROUP BY sonrasi filtreleme)
SELECT departman, AVG(maas) AS ort_maas
FROM calisanlar
GROUP BY departman
HAVING AVG(maas) > 5000;

SELECT departman, COUNT(*) AS sayi
FROM calisanlar
GROUP BY departman
HAVING COUNT(*) > 10
ORDER BY sayi DESC;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">JOIN Islemleri</h2>

          <CodeBlock
            language="sql"
            title="Tablo Birlestirme"
            code={`-- INNER JOIN (kesisim)
SELECT c.ad, c.soyad, d.departman_adi
FROM calisanlar c
INNER JOIN departmanlar d ON c.departman_id = d.id;

-- LEFT JOIN (sol tablo tam)
SELECT c.ad, c.soyad, d.departman_adi
FROM calisanlar c
LEFT JOIN departmanlar d ON c.departman_id = d.id;

-- RIGHT JOIN (sag tablo tam)
SELECT c.ad, c.soyad, d.departman_adi
FROM calisanlar c
RIGHT JOIN departmanlar d ON c.departman_id = d.id;

-- FULL OUTER JOIN (her iki tablo tam)
SELECT c.ad, d.departman_adi
FROM calisanlar c
FULL OUTER JOIN departmanlar d ON c.departman_id = d.id;

-- CROSS JOIN (kartezyen carpim)
SELECT * FROM renkler CROSS JOIN bedenler;

-- Self Join
SELECT c1.ad, c2.ad AS yonetici
FROM calisanlar c1
LEFT JOIN calisanlar c2 ON c1.yonetici_id = c2.id;

-- Coklu JOIN
SELECT c.ad, d.departman_adi, p.proje_adi
FROM calisanlar c
JOIN departmanlar d ON c.departman_id = d.id
JOIN projeler p ON c.proje_id = p.id;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Subqueries</h2>

          <CodeBlock
            language="sql"
            title="Alt Sorgular"
            code={`-- WHERE icinde subquery
SELECT * FROM calisanlar
WHERE maas > (SELECT AVG(maas) FROM calisanlar);

-- IN ile subquery
SELECT * FROM calisanlar
WHERE departman_id IN (
    SELECT id FROM departmanlar WHERE lokasyon = 'Istanbul'
);

-- EXISTS ile subquery
SELECT * FROM departmanlar d
WHERE EXISTS (
    SELECT 1 FROM calisanlar c
    WHERE c.departman_id = d.id
);

-- FROM icinde subquery (derived table)
SELECT departman, ort_maas
FROM (
    SELECT departman, AVG(maas) AS ort_maas
    FROM calisanlar
    GROUP BY departman
) AS dept_maaslari
WHERE ort_maas > 5000;

-- Correlated subquery
SELECT * FROM calisanlar c1
WHERE maas > (
    SELECT AVG(maas) FROM calisanlar c2
    WHERE c2.departman = c1.departman
);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Veri Manipulasyonu</h2>

          <CodeBlock
            language="sql"
            title="INSERT, UPDATE, DELETE"
            code={`-- INSERT
INSERT INTO calisanlar (ad, soyad, maas)
VALUES ('Ali', 'Yilmaz', 5000);

-- Birden fazla satir
INSERT INTO calisanlar (ad, soyad, maas)
VALUES
    ('Veli', 'Kaya', 5500),
    ('Ayse', 'Demir', 6000);

-- SELECT'ten INSERT
INSERT INTO arsiv_calisanlar
SELECT * FROM calisanlar WHERE cikis_tarihi IS NOT NULL;

-- UPDATE
UPDATE calisanlar SET maas = 5500 WHERE id = 1;

UPDATE calisanlar
SET maas = maas * 1.10,
    guncelleme_tarihi = NOW()
WHERE departman = 'IT';

-- DELETE
DELETE FROM calisanlar WHERE id = 1;
DELETE FROM calisanlar WHERE cikis_tarihi < '2020-01-01';

-- TRUNCATE (tum veriyi sil)
TRUNCATE TABLE gecici_tablo;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Tablo Islemleri</h2>

          <CodeBlock
            language="sql"
            title="CREATE, ALTER, DROP"
            code={`-- CREATE TABLE
CREATE TABLE calisanlar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ad VARCHAR(50) NOT NULL,
    soyad VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    maas DECIMAL(10, 2) DEFAULT 0,
    departman_id INT,
    giris_tarihi DATE,
    aktif BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (departman_id) REFERENCES departmanlar(id)
);

-- CREATE INDEX
CREATE INDEX idx_ad ON calisanlar(ad);
CREATE UNIQUE INDEX idx_email ON calisanlar(email);

-- ALTER TABLE
ALTER TABLE calisanlar ADD COLUMN telefon VARCHAR(20);
ALTER TABLE calisanlar DROP COLUMN telefon;
ALTER TABLE calisanlar MODIFY COLUMN ad VARCHAR(100);
ALTER TABLE calisanlar RENAME COLUMN ad TO isim;
ALTER TABLE calisanlar ADD CONSTRAINT fk_dept
    FOREIGN KEY (departman_id) REFERENCES departmanlar(id);

-- DROP
DROP TABLE IF EXISTS gecici_tablo;
DROP INDEX idx_ad ON calisanlar;

-- RENAME
RENAME TABLE eski_isim TO yeni_isim;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Window Functions</h2>

          <CodeBlock
            language="sql"
            title="Pencere Fonksiyonlari"
            code={`-- ROW_NUMBER
SELECT ad, departman, maas,
    ROW_NUMBER() OVER (ORDER BY maas DESC) AS siralama
FROM calisanlar;

-- RANK ve DENSE_RANK
SELECT ad, departman, maas,
    RANK() OVER (ORDER BY maas DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY maas DESC) AS dense_rank
FROM calisanlar;

-- PARTITION BY ile gruplama
SELECT ad, departman, maas,
    ROW_NUMBER() OVER (PARTITION BY departman ORDER BY maas DESC) AS dept_siralama
FROM calisanlar;

-- Running total
SELECT ad, maas,
    SUM(maas) OVER (ORDER BY id) AS kumulatif_maas
FROM calisanlar;

-- Moving average
SELECT ad, maas,
    AVG(maas) OVER (ORDER BY id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS hareketli_ort
FROM calisanlar;

-- LAG ve LEAD
SELECT ad, maas,
    LAG(maas, 1) OVER (ORDER BY id) AS onceki_maas,
    LEAD(maas, 1) OVER (ORDER BY id) AS sonraki_maas
FROM calisanlar;

-- FIRST_VALUE ve LAST_VALUE
SELECT ad, departman, maas,
    FIRST_VALUE(ad) OVER (PARTITION BY departman ORDER BY maas DESC) AS en_yuksek_maasli
FROM calisanlar;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">String ve Tarih Fonksiyonlari</h2>

          <CodeBlock
            language="sql"
            title="String Fonksiyonlari"
            code={`-- String fonksiyonlari
SELECT UPPER(ad) FROM calisanlar;
SELECT LOWER(ad) FROM calisanlar;
SELECT LENGTH(ad) FROM calisanlar;
SELECT CONCAT(ad, ' ', soyad) AS tam_ad FROM calisanlar;
SELECT CONCAT_WS(' ', ad, soyad) FROM calisanlar;
SELECT SUBSTRING(ad, 1, 3) FROM calisanlar;
SELECT TRIM(ad) FROM calisanlar;
SELECT LTRIM(ad), RTRIM(ad) FROM calisanlar;
SELECT REPLACE(email, '@old.com', '@new.com') FROM calisanlar;
SELECT LEFT(ad, 2), RIGHT(ad, 2) FROM calisanlar;
SELECT REVERSE(ad) FROM calisanlar;

-- Tarih fonksiyonlari
SELECT NOW();                    -- Simdiki zaman
SELECT CURDATE();                -- Bugunun tarihi
SELECT CURTIME();                -- Simdiki saat
SELECT YEAR(giris_tarihi) FROM calisanlar;
SELECT MONTH(giris_tarihi) FROM calisanlar;
SELECT DAY(giris_tarihi) FROM calisanlar;
SELECT DAYNAME(giris_tarihi) FROM calisanlar;
SELECT DATEDIFF(NOW(), giris_tarihi) AS gun_sayisi FROM calisanlar;
SELECT DATE_ADD(giris_tarihi, INTERVAL 1 YEAR) FROM calisanlar;
SELECT DATE_FORMAT(giris_tarihi, '%d/%m/%Y') FROM calisanlar;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">CASE ve Kosullar</h2>

          <CodeBlock
            language="sql"
            title="CASE Expression"
            code={`-- Basit CASE
SELECT ad, maas,
    CASE
        WHEN maas < 5000 THEN 'Dusuk'
        WHEN maas < 10000 THEN 'Orta'
        ELSE 'Yuksek'
    END AS maas_grubu
FROM calisanlar;

-- CASE ile aggregation
SELECT departman,
    SUM(CASE WHEN cinsiyet = 'E' THEN 1 ELSE 0 END) AS erkek,
    SUM(CASE WHEN cinsiyet = 'K' THEN 1 ELSE 0 END) AS kadin
FROM calisanlar
GROUP BY departman;

-- COALESCE (ilk non-null deger)
SELECT COALESCE(telefon, email, 'Iletisim yok') FROM calisanlar;

-- NULLIF
SELECT NULLIF(maas, 0) FROM calisanlar;  -- 0 ise NULL

-- IFNULL / ISNULL
SELECT IFNULL(email, 'Email yok') FROM calisanlar;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Set Islemleri</h2>

          <CodeBlock
            language="sql"
            title="UNION, INTERSECT, EXCEPT"
            code={`-- UNION (birlesim, tekrar yok)
SELECT ad FROM calisanlar
UNION
SELECT ad FROM musteriler;

-- UNION ALL (tekrar var)
SELECT ad FROM calisanlar
UNION ALL
SELECT ad FROM musteriler;

-- INTERSECT (kesisim)
SELECT ad FROM calisanlar
INTERSECT
SELECT ad FROM musteriler;

-- EXCEPT (fark)
SELECT ad FROM calisanlar
EXCEPT
SELECT ad FROM eski_calisanlar;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">CTE ve Views</h2>

          <CodeBlock
            language="sql"
            title="Common Table Expressions"
            code={`-- CTE (Common Table Expression)
WITH yuksek_maaslilar AS (
    SELECT * FROM calisanlar WHERE maas > 10000
)
SELECT * FROM yuksek_maaslilar WHERE departman = 'IT';

-- Recursive CTE
WITH RECURSIVE sayilar AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM sayilar WHERE n < 10
)
SELECT * FROM sayilar;

-- Multiple CTE
WITH
dept_ort AS (
    SELECT departman, AVG(maas) AS ort_maas
    FROM calisanlar GROUP BY departman
),
yuksek_dept AS (
    SELECT * FROM dept_ort WHERE ort_maas > 7000
)
SELECT * FROM yuksek_dept;

-- VIEW olusturma
CREATE VIEW aktif_calisanlar AS
SELECT * FROM calisanlar WHERE aktif = TRUE;

-- VIEW kullanimi
SELECT * FROM aktif_calisanlar WHERE departman = 'IT';

-- VIEW guncelleme
CREATE OR REPLACE VIEW aktif_calisanlar AS
SELECT ad, soyad, departman FROM calisanlar WHERE aktif = TRUE;

-- VIEW silme
DROP VIEW IF EXISTS aktif_calisanlar;`}
          />
        </section>
      </div>
    </div>
  )
}
