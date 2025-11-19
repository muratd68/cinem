'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function OAuthCheatSheet() {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">OAuth 2.0 Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Authorization</p>
            </div>
          </div>
          <PDFDownload title="OAuth 2.0" sheetId="oauth" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">OAuth 2.0 Flows</h2>

          <CodeBlock
            language="text"
            title="Grant Types"
            code={`1. Authorization Code (Web Apps)
   - En güvenli flow
   - Server-side uygulamalar için
   - PKCE ile mobile/SPA için

2. Client Credentials (Machine-to-Machine)
   - Server-to-server iletişim
   - Kullanıcı etkileşimi yok

3. Resource Owner Password (Legacy)
   - Kullanıcı adı/şifre ile
   - Sadece güvenilir uygulamalar
   - Önerilmez

4. Implicit (Deprecated)
   - SPA'lar için kullanılıyordu
   - Authorization Code + PKCE tercih edilmeli

5. Device Code (TV, CLI)
   - Sınırlı input cihazlar için`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Authorization Code Flow</h2>

          <CodeBlock
            language="text"
            title="Flow Diagram"
            code={`1. User -> App: Login isteği
2. App -> Auth Server: Authorization request
   GET /authorize?
     response_type=code&
     client_id=xxx&
     redirect_uri=xxx&
     scope=openid profile&
     state=random

3. Auth Server -> User: Login sayfası
4. User -> Auth Server: Credentials
5. Auth Server -> App: Authorization code
   GET /callback?code=xxx&state=xxx

6. App -> Auth Server: Token request
   POST /token
   grant_type=authorization_code&
   code=xxx&
   redirect_uri=xxx&
   client_id=xxx&
   client_secret=xxx

7. Auth Server -> App: Access token
   {
     "access_token": "xxx",
     "token_type": "Bearer",
     "expires_in": 3600,
     "refresh_token": "xxx"
   }`}
          />

          <CodeBlock
            language="javascript"
            title="Express Implementation"
            code={`const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_SERVER = 'https://auth.example.com';

// Store states (use Redis in production)
const states = new Map();

// Step 1: Redirect to authorization
app.get('/login', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  states.set(state, Date.now());

  const authUrl = new URL(\`\${AUTH_SERVER}/authorize\`);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('scope', 'openid profile email');
  authUrl.searchParams.set('state', state);

  res.redirect(authUrl.toString());
});

// Step 2: Handle callback
app.get('/callback', async (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    return res.status(400).json({ error });
  }

  // Verify state
  if (!state || !states.has(state)) {
    return res.status(400).json({ error: 'Invalid state' });
  }
  states.delete(state);

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post(
      \`\${AUTH_SERVER}/token\`,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, refresh_token, id_token } = tokenResponse.data;

    // Get user info
    const userResponse = await axios.get(\`\${AUTH_SERVER}/userinfo\`, {
      headers: {
        Authorization: \`Bearer \${access_token}\`
      }
    });

    // Create session or JWT
    req.session.user = userResponse.data;
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json({ error: 'Token exchange failed' });
  }
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">PKCE (SPA/Mobile)</h2>

          <CodeBlock
            language="javascript"
            title="PKCE Implementation"
            code={`// Generate code verifier and challenge
function generatePKCE() {
  // Code verifier: random string 43-128 chars
  const verifier = crypto.randomBytes(32).toString('base64url');

  // Code challenge: SHA256 hash of verifier
  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');

  return { verifier, challenge };
}

// Store verifier (per session)
const pkceStore = new Map();

// Step 1: Authorization request with PKCE
app.get('/login', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  const { verifier, challenge } = generatePKCE();

  // Store verifier
  pkceStore.set(state, verifier);

  const authUrl = new URL(\`\${AUTH_SERVER}/authorize\`);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('scope', 'openid profile');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  res.redirect(authUrl.toString());
});

// Step 2: Token request with code_verifier
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  const verifier = pkceStore.get(state);
  if (!verifier) {
    return res.status(400).json({ error: 'Invalid state' });
  }
  pkceStore.delete(state);

  const tokenResponse = await axios.post(
    \`\${AUTH_SERVER}/token\`,
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: verifier  // No client_secret needed
    })
  );

  // Handle tokens...
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Client Credentials Flow</h2>

          <CodeBlock
            language="javascript"
            title="Server-to-Server"
            code={`const axios = require('axios');

async function getAccessToken() {
  const response = await axios.post(
    \`\${AUTH_SERVER}/token\`,
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: 'api:read api:write'
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  return response.data.access_token;
}

// Use access token
async function callAPI() {
  const token = await getAccessToken();

  const response = await axios.get('https://api.example.com/data', {
    headers: {
      Authorization: \`Bearer \${token}\`
    }
  });

  return response.data;
}

// Token caching
let cachedToken = null;
let tokenExpiry = 0;

async function getCachedToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await axios.post(\`\${AUTH_SERVER}/token\`, ...);

  cachedToken = response.data.access_token;
  // Expire 5 minutes early
  tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;

  return cachedToken;
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Refresh Token</h2>

          <CodeBlock
            language="javascript"
            title="Token Refresh"
            code={`async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(
      \`\${AUTH_SERVER}/token\`,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      })
    );

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token || refreshToken,
      expiresIn: response.data.expires_in
    };
  } catch (err) {
    if (err.response?.status === 400) {
      // Refresh token expired/revoked
      throw new Error('Session expired');
    }
    throw err;
  }
}

// Axios interceptor for auto-refresh
const api = axios.create({
  baseURL: 'https://api.example.com'
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await refreshAccessToken(getStoredRefreshToken());
        setStoredAccessToken(accessToken);

        originalRequest.headers.Authorization = \`Bearer \${accessToken}\`;
        return api(originalRequest);
      } catch (refreshError) {
        // Logout user
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Social Login Providers</h2>

          <CodeBlock
            language="javascript"
            title="Google OAuth"
            code={`// Google OAuth endpoints
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

// Authorization URL
const authUrl = new URL(GOOGLE_AUTH_URL);
authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'openid email profile');
authUrl.searchParams.set('access_type', 'offline'); // For refresh token
authUrl.searchParams.set('prompt', 'consent');

// Token exchange
const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, {
  code,
  client_id: GOOGLE_CLIENT_ID,
  client_secret: GOOGLE_CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  grant_type: 'authorization_code'
});

// Get user info
const userInfo = await axios.get(GOOGLE_USERINFO_URL, {
  headers: { Authorization: \`Bearer \${tokenResponse.data.access_token}\` }
});

// userInfo.data = { id, email, verified_email, name, picture }`}
          />

          <CodeBlock
            language="javascript"
            title="GitHub OAuth"
            code={`// GitHub OAuth endpoints
const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';

// Authorization URL
const authUrl = new URL(GITHUB_AUTH_URL);
authUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', 'user:email');

// Token exchange
const tokenResponse = await axios.post(
  GITHUB_TOKEN_URL,
  {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code,
    redirect_uri: REDIRECT_URI
  },
  {
    headers: { Accept: 'application/json' }
  }
);

// Get user info
const userInfo = await axios.get(GITHUB_USER_URL, {
  headers: {
    Authorization: \`Bearer \${tokenResponse.data.access_token}\`
  }
});

// Get user email
const emails = await axios.get('https://api.github.com/user/emails', {
  headers: { Authorization: \`Bearer \${tokenResponse.data.access_token}\` }
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">OpenID Connect</h2>

          <CodeBlock
            language="javascript"
            title="OIDC Implementation"
            code={`// OpenID Connect extends OAuth 2.0
// Adds: id_token, userinfo endpoint, discovery

// Discovery endpoint
const discoveryUrl = 'https://auth.example.com/.well-known/openid-configuration';
const config = await axios.get(discoveryUrl);
// Returns: authorization_endpoint, token_endpoint, userinfo_endpoint, jwks_uri

// ID Token claims
{
  "iss": "https://auth.example.com",
  "sub": "user123",
  "aud": "client_id",
  "exp": 1516239022,
  "iat": 1516238022,
  "nonce": "random",
  "name": "John Doe",
  "email": "john@example.com",
  "email_verified": true
}

// Verify ID Token
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: config.data.jwks_uri
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    callback(null, key.publicKey);
  });
}

jwt.verify(idToken, getKey, {
  algorithms: ['RS256'],
  audience: CLIENT_ID,
  issuer: config.data.issuer,
  nonce: expectedNonce
}, (err, decoded) => {
  console.log(decoded);
});`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Security Best Practices</h2>

          <CodeBlock
            language="text"
            title="OAuth Security"
            code={`1. State Parameter
   - Her authorization request'te unique state
   - CSRF koruması sağlar
   - Callback'te doğrula

2. PKCE
   - Public clients için zorunlu
   - Authorization code interception koruması
   - S256 method kullan

3. Redirect URI
   - Tam URL eşleşmesi
   - Wildcard kullanma
   - HTTPS zorunlu (development hariç)

4. Token Storage
   - Access token: Memory
   - Refresh token: Secure, HttpOnly cookie
   - localStorage kullanma

5. Scope
   - Minimum gerekli scope
   - Kullanıcıya açıkça göster
   - Incremental authorization

6. Token Validation
   - Signature doğrula
   - Claims kontrol et (iss, aud, exp)
   - Nonce doğrula (OIDC)

7. HTTPS
   - Tüm endpoint'lerde zorunlu
   - Token transmission güvenliği

8. Client Secret
   - Güvenli saklama
   - Public clients için PKCE
   - Rotate periodically`}
          />
        </section>
      </div>
    </div>
  )
}
