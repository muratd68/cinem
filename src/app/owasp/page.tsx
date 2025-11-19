'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function OWASPCheatSheet() {
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
            <div className="p-3 rounded-xl bg-red-600">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">OWASP Top 10 Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Security best practices</p>
            </div>
          </div>
          <PDFDownload title="OWASP" sheetId="owasp" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A01: Broken Access Control</h2>

          <CodeBlock
            language="javascript"
            title="Zafiyetli Kod"
            code={`// YANLIŞ: Sadece URL ile erişim kontrolü
app.get('/api/users/:id', (req, res) => {
  const user = db.getUser(req.params.id);
  res.json(user);
});

// YANLIŞ: Client-side kontrol
if (user.role === 'admin') {
  showAdminPanel();
}`}
          />

          <CodeBlock
            language="javascript"
            title="Güvenli Kod"
            code={`// DOĞRU: Server-side yetkilendirme
app.get('/api/users/:id', authMiddleware, (req, res) => {
  // Kullanıcı sadece kendi verisine erişebilir
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const user = db.getUser(req.params.id);
  res.json(user);
});

// DOĞRU: Role-based access control
const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

app.delete('/api/users/:id', authMiddleware, requireRole('admin'), handler);

// DOĞRU: Resource ownership check
app.put('/api/posts/:id', authMiddleware, async (req, res) => {
  const post = await db.getPost(req.params.id);

  if (post.authorId !== req.user.id) {
    return res.status(403).json({ error: 'Not your post' });
  }

  // Update post...
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A02: Cryptographic Failures</h2>

          <CodeBlock
            language="javascript"
            title="Password Hashing"
            code={`const bcrypt = require('bcrypt');
const crypto = require('crypto');

// YANLIŞ
const hash = crypto.createHash('md5').update(password).digest('hex');
const hash = crypto.createHash('sha256').update(password).digest('hex');

// DOĞRU: bcrypt ile hash
const SALT_ROUNDS = 12;

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Kullanım
const hashedPassword = await hashPassword('user-password');
const isValid = await verifyPassword('user-password', hashedPassword);`}
          />

          <CodeBlock
            language="javascript"
            title="Encryption"
            code={`const crypto = require('crypto');

// DOĞRU: AES-256-GCM encryption
const ALGORITHM = 'aes-256-gcm';
const KEY = crypto.randomBytes(32); // Güvenli saklayın

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    encrypted,
    authTag: authTag.toString('hex')
  };
}

function decrypt(encryptedData) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(encryptedData.iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));

  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Hassas veri için
const sensitiveData = encrypt('credit-card-number');`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A03: Injection</h2>

          <CodeBlock
            language="javascript"
            title="SQL Injection"
            code={`// YANLIŞ: String concatenation
const query = "SELECT * FROM users WHERE id = " + userId;
const query = \`SELECT * FROM users WHERE name = '\${name}'\`;

// DOĞRU: Parametrized queries
// PostgreSQL (pg)
const result = await pool.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);

// MySQL
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE name = ?',
  [name]
);

// ORM (Prisma)
const user = await prisma.user.findUnique({
  where: { id: userId }
});

// ORM (Sequelize)
const users = await User.findAll({
  where: { name: name }
});`}
          />

          <CodeBlock
            language="javascript"
            title="NoSQL Injection"
            code={`// YANLIŞ: Direct user input
const user = await db.collection('users').findOne({
  username: req.body.username,
  password: req.body.password
});

// Saldırı: { "username": "admin", "password": { "$ne": "" } }

// DOĞRU: Input validation
const { username, password } = req.body;

if (typeof username !== 'string' || typeof password !== 'string') {
  return res.status(400).json({ error: 'Invalid input' });
}

const user = await db.collection('users').findOne({
  username: username,
  password: await hashPassword(password)
});

// DOĞRU: Mongoose ile
const user = await User.findOne({
  username: String(req.body.username)
});`}
          />

          <CodeBlock
            language="javascript"
            title="Command Injection"
            code={`// YANLIŞ: Direct user input in command
const { exec } = require('child_process');
exec(\`ls \${userInput}\`, callback);

// DOĞRU: Avoid shell, use spawn with args
const { spawn } = require('child_process');
const ls = spawn('ls', [userInput]);

// DOĞRU: Input validation
const allowedCommands = ['status', 'version'];
if (!allowedCommands.includes(userInput)) {
  return res.status(400).json({ error: 'Invalid command' });
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A04: Insecure Design</h2>

          <CodeBlock
            language="javascript"
            title="Rate Limiting"
            code={`const rateLimit = require('express-rate-limit');

// Login rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/login', loginLimiter, loginHandler);

// API rate limiting
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
});

app.use('/api/', apiLimiter);`}
          />

          <CodeBlock
            language="javascript"
            title="Input Validation"
            code={`const Joi = require('joi');

// Schema definition
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/),
  age: Joi.number().integer().min(13).max(120)
});

// Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(d => d.message)
    });
  }

  req.body = value;
  next();
};

app.post('/api/users', validate(userSchema), createUser);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A05: Security Misconfiguration</h2>

          <CodeBlock
            language="javascript"
            title="Security Headers"
            code={`const helmet = require('helmet');

app.use(helmet());

// veya özelleştirilmiş
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// CORS
const cors = require('cors');
app.use(cors({
  origin: ['https://example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));`}
          />

          <CodeBlock
            language="javascript"
            title="Error Handling"
            code={`// YANLIŞ: Stack trace gösterme
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack  // Hassas bilgi!
  });
});

// DOĞRU: Production error handling
app.use((err, req, res, next) => {
  console.error(err); // Log for debugging

  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      error: 'Internal server error'
    });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
});

// Environment variables
// YANLIŞ: Hardcoded secrets
const SECRET = 'my-secret-key';

// DOĞRU: Environment variables
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error('JWT_SECRET not configured');
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A06: Vulnerable Components</h2>

          <CodeBlock
            language="bash"
            title="Dependency Audit"
            code={`# NPM audit
npm audit
npm audit fix
npm audit fix --force

# Yarn audit
yarn audit

# Snyk
npm install -g snyk
snyk test
snyk monitor

# GitHub Dependabot
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A07: Auth Failures</h2>

          <CodeBlock
            language="javascript"
            title="Secure Authentication"
            code={`const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Password requirements
const passwordSchema = Joi.string()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])/)
  .messages({
    'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character'
  });

// Account lockout
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

async function login(email, password) {
  const user = await db.getUser(email);

  if (!user) {
    // Timing attack prevention
    await bcrypt.compare(password, '$2b$12$invalidhash');
    throw new Error('Invalid credentials');
  }

  // Check lockout
  if (user.lockoutUntil && user.lockoutUntil > Date.now()) {
    throw new Error('Account locked. Try again later.');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    // Increment failed attempts
    user.failedAttempts = (user.failedAttempts || 0) + 1;

    if (user.failedAttempts >= MAX_ATTEMPTS) {
      user.lockoutUntil = Date.now() + LOCKOUT_TIME;
    }

    await db.updateUser(user);
    throw new Error('Invalid credentials');
  }

  // Reset on success
  user.failedAttempts = 0;
  user.lockoutUntil = null;
  await db.updateUser(user);

  return generateTokens(user);
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A08: Software Integrity</h2>

          <CodeBlock
            language="html"
            title="Subresource Integrity"
            code={`<!-- CDN kaynakları için SRI -->
<script
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>

<link
  rel="stylesheet"
  href="https://cdn.example.com/style.css"
  integrity="sha384-..."
  crossorigin="anonymous">`}
          />

          <CodeBlock
            language="bash"
            title="Lockfile ve Signatures"
            code={`# Package-lock.json kullan
npm ci  # Clean install from lockfile

# Git commit signing
git config --global commit.gpgsign true

# Docker image signing
docker trust sign myimage:latest`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A09: Logging & Monitoring</h2>

          <CodeBlock
            language="javascript"
            title="Security Logging"
            code={`const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'security.log' })
  ]
});

// Log security events
function logSecurityEvent(event, data) {
  logger.info({
    type: 'SECURITY',
    event,
    timestamp: new Date().toISOString(),
    ip: data.ip,
    userId: data.userId,
    details: data.details
  });
}

// Usage
app.post('/api/login', async (req, res) => {
  try {
    const user = await authenticate(req.body);

    logSecurityEvent('LOGIN_SUCCESS', {
      ip: req.ip,
      userId: user.id
    });

    res.json({ token });
  } catch (err) {
    logSecurityEvent('LOGIN_FAILURE', {
      ip: req.ip,
      details: { email: req.body.email, reason: err.message }
    });

    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Events to log:
// - Login success/failure
// - Password changes
// - Permission changes
// - Access denied
// - Input validation failures
// - Unusual activity`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">A10: SSRF</h2>

          <CodeBlock
            language="javascript"
            title="SSRF Prevention"
            code={`const url = require('url');
const dns = require('dns').promises;

// YANLIŞ: Direct URL fetch
app.post('/api/fetch', async (req, res) => {
  const response = await fetch(req.body.url);
  res.json(await response.json());
});

// DOĞRU: URL validation
const ALLOWED_PROTOCOLS = ['http:', 'https:'];
const BLOCKED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', '169.254.169.254'];

async function validateUrl(inputUrl) {
  const parsed = new URL(inputUrl);

  // Protocol check
  if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
    throw new Error('Invalid protocol');
  }

  // Blocked hosts
  if (BLOCKED_HOSTS.includes(parsed.hostname)) {
    throw new Error('Blocked host');
  }

  // DNS resolution check for private IPs
  const addresses = await dns.resolve4(parsed.hostname);
  for (const addr of addresses) {
    if (isPrivateIP(addr)) {
      throw new Error('Private IP not allowed');
    }
  }

  return parsed;
}

function isPrivateIP(ip) {
  const parts = ip.split('.').map(Number);
  return (
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168) ||
    parts[0] === 127
  );
}

app.post('/api/fetch', async (req, res) => {
  try {
    const validUrl = await validateUrl(req.body.url);
    const response = await fetch(validUrl.toString());
    res.json(await response.json());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});`}
          />
        </section>
      </div>
    </div>
  )
}
