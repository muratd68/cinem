'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function JWTCheatSheet() {
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
            <div className="p-3 rounded-xl bg-purple-600">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">JWT Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Token authentication</p>
            </div>
          </div>
          <PDFDownload title="JWT" sheetId="jwt" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">JWT Yapısı</h2>

          <CodeBlock
            language="text"
            title="JWT Format"
            code={`// JWT üç bölümden oluşur (base64url encoded):
// HEADER.PAYLOAD.SIGNATURE

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4iLCJpYXQiOjE1MTYyMzkwMjJ9.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// Header (Algorithm & Token Type)
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload (Claims)
{
  "sub": "1234567890",
  "name": "John",
  "iat": 1516239022
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)`}
          />

          <CodeBlock
            language="text"
            title="Standard Claims"
            code={`// Registered Claims (RFC 7519)
{
  "iss": "https://example.com",  // Issuer
  "sub": "user123",              // Subject
  "aud": "https://api.example.com", // Audience
  "exp": 1516239022,             // Expiration Time
  "nbf": 1516238022,             // Not Before
  "iat": 1516237022,             // Issued At
  "jti": "unique-token-id"       // JWT ID
}

// Public Claims (IANA registered)
{
  "name": "John Doe",
  "email": "john@example.com",
  "email_verified": true
}

// Private Claims (custom)
{
  "user_id": "12345",
  "role": "admin",
  "permissions": ["read", "write"]
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Node.js (jsonwebtoken)</h2>

          <CodeBlock
            language="javascript"
            title="Token Oluşturma"
            code={`const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

// Sign token
const token = jwt.sign(
  {
    userId: '12345',
    email: 'john@example.com',
    role: 'admin'
  },
  SECRET_KEY,
  {
    expiresIn: '1h',        // 1 hour
    issuer: 'my-app',
    audience: 'my-api',
    subject: '12345'
  }
);

// Async version
jwt.sign(payload, SECRET_KEY, options, (err, token) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(token);
});`}
          />

          <CodeBlock
            language="javascript"
            title="Token Doğrulama"
            code={`// Verify token
try {
  const decoded = jwt.verify(token, SECRET_KEY, {
    issuer: 'my-app',
    audience: 'my-api'
  });
  console.log(decoded);
  // { userId: '12345', email: '...', iat: ..., exp: ... }
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    console.log('Token expired');
  } else if (err.name === 'JsonWebTokenError') {
    console.log('Invalid token');
  } else if (err.name === 'NotBeforeError') {
    console.log('Token not active yet');
  }
}

// Async version
jwt.verify(token, SECRET_KEY, (err, decoded) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(decoded);
});

// Decode without verification (don't use for auth!)
const decoded = jwt.decode(token);
const decodedComplete = jwt.decode(token, { complete: true });
// { header: {...}, payload: {...}, signature: '...' }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Express Middleware</h2>

          <CodeBlock
            language="javascript"
            title="Auth Middleware"
            code={`const jwt = require('jsonwebtoken');

// Basic auth middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Role-based middleware
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

// Usage
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/admin', authMiddleware, requireRole('admin'), (req, res) => {
  res.json({ message: 'Admin only' });
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Refresh Token Pattern</h2>

          <CodeBlock
            language="javascript"
            title="Access & Refresh Tokens"
            code={`const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Store refresh tokens (use Redis in production)
const refreshTokens = new Map();

// Generate tokens
function generateTokens(userId) {
  const accessToken = jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId, tokenId: crypto.randomUUID() },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  // Store refresh token
  refreshTokens.set(refreshToken, userId);

  return { accessToken, refreshToken };
}

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate credentials
  const user = await validateUser(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const tokens = generateTokens(user.id);

  // Set refresh token as httpOnly cookie
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.json({ accessToken: tokens.accessToken });
});

// Refresh endpoint
app.post('/api/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken || !refreshTokens.has(refreshToken)) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });
  } catch (err) {
    refreshTokens.delete(refreshToken);
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    refreshTokens.delete(refreshToken);
  }

  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Python (PyJWT)</h2>

          <CodeBlock
            language="python"
            title="Token İşlemleri"
            code={`import jwt
from datetime import datetime, timedelta

SECRET_KEY = 'your-secret-key'

# Create token
payload = {
    'user_id': '12345',
    'email': 'john@example.com',
    'exp': datetime.utcnow() + timedelta(hours=1),
    'iat': datetime.utcnow(),
    'iss': 'my-app'
}

token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

# Verify token
try:
    decoded = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=['HS256'],
        issuer='my-app'
    )
    print(decoded)
except jwt.ExpiredSignatureError:
    print('Token expired')
except jwt.InvalidTokenError:
    print('Invalid token')

# Decode without verification
decoded = jwt.decode(token, options={'verify_signature': False})`}
          />

          <CodeBlock
            language="python"
            title="FastAPI Middleware"
            code={`from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

app = FastAPI()
security = HTTPBearer()

SECRET_KEY = 'your-secret-key'

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Token expired'
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token'
        )

@app.get('/api/profile')
async def get_profile(user: dict = Depends(get_current_user)):
    return {'user': user}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">RSA Keys (Asymmetric)</h2>

          <CodeBlock
            language="bash"
            title="Key Generation"
            code={`# Generate private key
openssl genrsa -out private.pem 2048

# Extract public key
openssl rsa -in private.pem -outform PEM -pubout -out public.pem`}
          />

          <CodeBlock
            language="javascript"
            title="RSA Token Operations"
            code={`const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Sign with private key
const token = jwt.sign(
  { userId: '12345' },
  privateKey,
  {
    algorithm: 'RS256',
    expiresIn: '1h'
  }
);

// Verify with public key
const decoded = jwt.verify(token, publicKey, {
  algorithms: ['RS256']
});

// JWKS (JSON Web Key Set) - production
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://example.com/.well-known/jwks.json'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
  console.log(decoded);
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Best Practices</h2>

          <CodeBlock
            language="text"
            title="Security Guidelines"
            code={`1. Token Storage (Client)
   - Access token: Memory only (not localStorage)
   - Refresh token: HttpOnly cookie
   - Never store in localStorage/sessionStorage

2. Token Expiration
   - Access token: 15 minutes or less
   - Refresh token: 7-30 days
   - Implement token rotation

3. Secret Key
   - Use strong, random secrets (256+ bits)
   - Store in environment variables
   - Rotate keys periodically

4. Algorithm
   - Use RS256 for distributed systems
   - Use HS256 for single server
   - Never use 'none' algorithm

5. Payload
   - Don't store sensitive data (passwords, PII)
   - Keep payload small
   - Include necessary claims only

6. Validation
   - Always verify signature
   - Check exp, iat, iss, aud claims
   - Validate token structure

7. Additional Security
   - Use HTTPS only
   - Implement CSRF protection
   - Add jti for token revocation
   - Log authentication events`}
          />

          <CodeBlock
            language="javascript"
            title="Token Blacklisting"
            code={`const redis = require('redis');
const client = redis.createClient();

// Blacklist token on logout
async function blacklistToken(token) {
  const decoded = jwt.decode(token);
  const exp = decoded.exp;
  const ttl = exp - Math.floor(Date.now() / 1000);

  if (ttl > 0) {
    await client.setEx(\`blacklist:\${token}\`, ttl, '1');
  }
}

// Check if token is blacklisted
async function isBlacklisted(token) {
  const result = await client.get(\`blacklist:\${token}\`);
  return result === '1';
}

// Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (await isBlacklisted(token)) {
    return res.status(401).json({ error: 'Token revoked' });
  }

  // Continue with verification...
};`}
          />
        </section>
      </div>
    </div>
  )
}
