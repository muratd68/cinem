'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Server, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function NodeJSCheatSheet() {
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
            <div className="p-3 rounded-xl bg-green-600">
              <Server className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Node.js/Express Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Backend JavaScript</p>
            </div>
          </div>
          <PDFDownload title="Node.js" sheetId="nodejs" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Express Temel</h2>

          <CodeBlock
            language="javascript"
            title="Express Kurulum ve Baslangic"
            code={`// Kurulum
npm init -y
npm install express

// Temel server
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static dosyalar
app.use(express.static('public'));

// Server baslatma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Routing</h2>

          <CodeBlock
            language="javascript"
            title="Route Tanimlama"
            code={`// GET
app.get('/', (req, res) => {
  res.send('Hello World');
});

// POST
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ name, email });
});

// PUT
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, ...req.body });
});

// DELETE
app.delete('/users/:id', (req, res) => {
  res.status(204).send();
});

// Route parametreleri
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id });
});

// Query parametreleri
app.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.json({ query: q, page });
});`}
          />

          <CodeBlock
            language="javascript"
            title="Router Modulleri"
            code={`// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

router.post('/', (req, res) => {
  res.status(201).json(req.body);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Middleware</h2>

          <CodeBlock
            language="javascript"
            title="Custom Middleware"
            code={`// Logger middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
  next();
};
app.use(logger);

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Token dogrulama
  next();
};

// Route-specific middleware
app.get('/protected', auth, (req, res) => {
  res.json({ message: 'Protected data' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});`}
          />

          <CodeBlock
            language="javascript"
            title="Populer Middleware"
            code={`const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

// CORS
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Security headers
app.use(helmet());

// Logging
app.use(morgan('dev'));
app.use(morgan('combined'));

// Compression
app.use(compression());`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Request & Response</h2>

          <CodeBlock
            language="javascript"
            title="Request Ozellikleri"
            code={`app.post('/api/data', (req, res) => {
  // Request body
  const body = req.body;

  // URL parametreleri
  const params = req.params;

  // Query string
  const query = req.query;

  // Headers
  const headers = req.headers;
  const auth = req.headers.authorization;

  // Cookies
  const cookies = req.cookies;

  // IP adresi
  const ip = req.ip;

  // HTTP method
  const method = req.method;

  // Original URL
  const url = req.originalUrl;
});`}
          />

          <CodeBlock
            language="javascript"
            title="Response Metodlari"
            code={`// JSON response
res.json({ message: 'Success' });

// Status code ile
res.status(201).json({ id: 1 });

// Text response
res.send('Hello World');

// HTML response
res.send('<h1>Hello</h1>');

// File download
res.download('/path/to/file.pdf');

// File gonderme
res.sendFile('/path/to/file.html');

// Redirect
res.redirect('/login');
res.redirect(301, '/new-url');

// Cookie set
res.cookie('token', 'abc123', {
  httpOnly: true,
  secure: true,
  maxAge: 3600000
});

// Header set
res.set('Content-Type', 'application/json');`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Async/Await</h2>

          <CodeBlock
            language="javascript"
            title="Async Route Handler"
            code={`// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Kullanim
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));

// Try-catch ile
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Veritabani Baglantisi</h2>

          <CodeBlock
            language="javascript"
            title="MongoDB (Mongoose)"
            code={`const mongoose = require('mongoose');

// Baglanti
mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// CRUD
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});`}
          />

          <CodeBlock
            language="javascript"
            title="PostgreSQL (pg)"
            code={`const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  res.status(201).json(result.rows[0]);
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Validation</h2>

          <CodeBlock
            language="javascript"
            title="Express Validator"
            code={`const { body, validationResult } = require('express-validator');

app.post('/users',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validation basarili
    res.json({ message: 'User created' });
  }
);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Environment Variables</h2>

          <CodeBlock
            language="javascript"
            title="dotenv Kullanimi"
            code={`// .env dosyasi
PORT=3000
DATABASE_URL=mongodb://localhost/mydb
JWT_SECRET=mysecretkey

// app.js
require('dotenv').config();

const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;
const secret = process.env.JWT_SECRET;

// Config dosyasi
// config/index.js
module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET
};`}
          />
        </section>
      </div>
    </div>
  )
}
