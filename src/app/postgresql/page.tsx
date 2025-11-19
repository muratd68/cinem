'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Database, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function PostgreSQLCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-700">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">PostgreSQL Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Ileri SQL veritabani</p>
            </div>
          </div>
          <PDFDownload title="PostgreSQL" sheetId="postgresql" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Veri Tipleri</h2>

          <CodeBlock
            language="sql"
            title="PostgreSQL Veri Tipleri"
            code={`-- Numeric
INTEGER, BIGINT, SMALLINT
NUMERIC(precision, scale)
REAL, DOUBLE PRECISION
SERIAL, BIGSERIAL        -- Auto-increment

-- Text
VARCHAR(n), CHAR(n)
TEXT                     -- Unlimited
UUID

-- Date/Time
DATE, TIME, TIMESTAMP
TIMESTAMPTZ              -- With timezone
INTERVAL

-- Boolean
BOOLEAN

-- JSON
JSON, JSONB              -- Binary JSON (faster)

-- Array
INTEGER[], TEXT[]
ARRAY[1,2,3]

-- Special
BYTEA                    -- Binary data
INET, CIDR               -- Network addresses
POINT, LINE, POLYGON     -- Geometric`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Tablo Islemleri</h2>

          <CodeBlock
            language="sql"
            title="CREATE TABLE"
            code={`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER CHECK (age >= 0),
    role VARCHAR(20) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    metadata JSONB,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Foreign key
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Composite primary key
CREATE TABLE order_items (
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER,
    quantity INTEGER,
    PRIMARY KEY (order_id, product_id)
);`}
          />

          <CodeBlock
            language="sql"
            title="ALTER TABLE"
            code={`-- Kolon ekle
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Kolon sil
ALTER TABLE users DROP COLUMN phone;

-- Kolon tipi degistir
ALTER TABLE users ALTER COLUMN name TYPE TEXT;

-- Default deger
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'member';

-- NOT NULL
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;

-- Constraint ekle
ALTER TABLE users ADD CONSTRAINT email_check
    CHECK (email LIKE '%@%');

-- Index ekle
CREATE INDEX idx_users_email ON users(email);
CREATE UNIQUE INDEX idx_users_name ON users(name);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">JSONB Islemleri</h2>

          <CodeBlock
            language="sql"
            title="JSONB Sorgulari"
            code={`-- JSONB kolon ile tablo
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    details JSONB
);

-- Insert
INSERT INTO products (name, details) VALUES
('Phone', '{"brand": "Apple", "specs": {"ram": 8, "storage": 256}}');

-- Select - alan alma
SELECT details->>'brand' AS brand FROM products;
SELECT details->'specs'->>'ram' AS ram FROM products;

-- Where - JSONB filtreleme
SELECT * FROM products
WHERE details->>'brand' = 'Apple';

SELECT * FROM products
WHERE details->'specs'->>'ram' = '8';

-- Containment
SELECT * FROM products
WHERE details @> '{"brand": "Apple"}';

-- Key exists
SELECT * FROM products
WHERE details ? 'brand';

-- Update JSONB
UPDATE products
SET details = details || '{"color": "black"}'
WHERE id = 1;

UPDATE products
SET details = jsonb_set(details, '{specs,ram}', '16')
WHERE id = 1;

-- JSONB Index
CREATE INDEX idx_products_details ON products USING GIN (details);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Array Islemleri</h2>

          <CodeBlock
            language="sql"
            title="Array Sorgulari"
            code={`-- Array kolon
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    tags TEXT[]
);

-- Insert
INSERT INTO posts (title, tags) VALUES
('Post 1', ARRAY['python', 'django']),
('Post 2', '{"javascript", "react"}');

-- Select
SELECT tags[1] FROM posts;           -- Ilk eleman
SELECT array_length(tags, 1) FROM posts;

-- Where - contains
SELECT * FROM posts WHERE 'python' = ANY(tags);
SELECT * FROM posts WHERE tags @> ARRAY['python'];

-- Array overlap
SELECT * FROM posts
WHERE tags && ARRAY['python', 'javascript'];

-- Array append
UPDATE posts SET tags = array_append(tags, 'new-tag');

-- Array remove
UPDATE posts SET tags = array_remove(tags, 'old-tag');

-- Unnest
SELECT id, unnest(tags) AS tag FROM posts;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Window Functions</h2>

          <CodeBlock
            language="sql"
            title="Window Functions"
            code={`-- ROW_NUMBER
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- Partition ile
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) as dept_rank
FROM employees;

-- RANK ve DENSE_RANK
SELECT
    name,
    salary,
    RANK() OVER (ORDER BY salary DESC),
    DENSE_RANK() OVER (ORDER BY salary DESC)
FROM employees;

-- LAG ve LEAD
SELECT
    date,
    sales,
    LAG(sales, 1) OVER (ORDER BY date) as prev_sales,
    LEAD(sales, 1) OVER (ORDER BY date) as next_sales
FROM daily_sales;

-- Running total
SELECT
    date,
    amount,
    SUM(amount) OVER (ORDER BY date) as running_total
FROM transactions;

-- Moving average
SELECT
    date,
    value,
    AVG(value) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7
FROM metrics;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">CTE (Common Table Expressions)</h2>

          <CodeBlock
            language="sql"
            title="WITH Clause"
            code={`-- Basic CTE
WITH active_users AS (
    SELECT * FROM users WHERE is_active = true
)
SELECT * FROM active_users WHERE age > 25;

-- Multiple CTEs
WITH
    dept_totals AS (
        SELECT department, SUM(salary) as total
        FROM employees
        GROUP BY department
    ),
    company_avg AS (
        SELECT AVG(total) as avg_total
        FROM dept_totals
    )
SELECT d.department, d.total, c.avg_total
FROM dept_totals d, company_avg c
WHERE d.total > c.avg_total;

-- Recursive CTE
WITH RECURSIVE subordinates AS (
    -- Base case
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case
    SELECT e.id, e.name, e.manager_id, s.level + 1
    FROM employees e
    JOIN subordinates s ON e.manager_id = s.id
)
SELECT * FROM subordinates;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Transactions</h2>

          <CodeBlock
            language="sql"
            title="Transaction Kontrolu"
            code={`-- Basic transaction
BEGIN;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Rollback
BEGIN;
    DELETE FROM users WHERE id = 1;
    -- Hata olursa
ROLLBACK;

-- Savepoint
BEGIN;
    INSERT INTO orders (user_id, total) VALUES (1, 100);
    SAVEPOINT order_created;

    INSERT INTO order_items (order_id, product_id) VALUES (1, 1);
    -- Hata olursa
    ROLLBACK TO order_created;
    -- Order kalir, items gider
COMMIT;

-- Isolation levels
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Indexes</h2>

          <CodeBlock
            language="sql"
            title="Index Turleri"
            code={`-- B-tree (default)
CREATE INDEX idx_name ON users(name);

-- Unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Composite index
CREATE INDEX idx_name_email ON users(name, email);

-- Partial index
CREATE INDEX idx_active ON users(email) WHERE is_active = true;

-- Expression index
CREATE INDEX idx_lower_email ON users(LOWER(email));

-- GIN index (for JSONB, arrays, full-text)
CREATE INDEX idx_tags ON posts USING GIN(tags);
CREATE INDEX idx_details ON products USING GIN(details);

-- GiST index (geometric, full-text)
CREATE INDEX idx_location ON places USING GIST(location);

-- BRIN index (large tables, sorted data)
CREATE INDEX idx_created ON logs USING BRIN(created_at);

-- Index kullanimi kontrolu
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@test.com';`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Useful Functions</h2>

          <CodeBlock
            language="sql"
            title="String ve Date Functions"
            code={`-- String functions
SELECT
    LOWER('HELLO'),
    UPPER('hello'),
    CONCAT(first_name, ' ', last_name),
    LENGTH('hello'),
    SUBSTRING('hello' FROM 1 FOR 3),
    REPLACE('hello', 'l', 'L'),
    SPLIT_PART('a,b,c', ',', 2),
    TRIM('  hello  ');

-- Date functions
SELECT
    NOW(),
    CURRENT_DATE,
    CURRENT_TIME,
    DATE_TRUNC('month', NOW()),
    EXTRACT(YEAR FROM NOW()),
    AGE(NOW(), '2000-01-01'),
    NOW() + INTERVAL '1 day',
    TO_CHAR(NOW(), 'YYYY-MM-DD HH:MI:SS');

-- Aggregate functions
SELECT
    COUNT(*),
    SUM(amount),
    AVG(amount),
    MIN(amount),
    MAX(amount),
    STRING_AGG(name, ', '),
    ARRAY_AGG(name)
FROM orders;

-- COALESCE ve NULLIF
SELECT COALESCE(nickname, name) FROM users;
SELECT NULLIF(value, 0);`}
          />
        </section>
      </div>
    </div>
  )
}
