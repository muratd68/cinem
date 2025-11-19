'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Server, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function NginxCheatSheet() {
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
              <h1 className="text-3xl font-bold">Nginx Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Web server konfigurasyonu</p>
            </div>
          </div>
          <PDFDownload title="Nginx" sheetId="nginx" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Komutlar</h2>

          <CodeBlock
            language="bash"
            title="Nginx Komutlari"
            code={`# Baslat/Durdur
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx

# Konfigurasyon test
sudo nginx -t

# Version
nginx -v
nginx -V

# Config dosyasi
/etc/nginx/nginx.conf
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/

# Logs
/var/log/nginx/access.log
/var/log/nginx/error.log`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Basic Server Block</h2>

          <CodeBlock
            title="Static Site"
            code={`server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    # Static assets
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Logs
    access_log /var/log/nginx/example.access.log;
    error_log /var/log/nginx/example.error.log;
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Reverse Proxy</h2>

          <CodeBlock
            title="Proxy Pass"
            code={`server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;

        # Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}`}
          />

          <CodeBlock
            title="Upstream (Load Balancing)"
            code={`upstream backend {
    # Round robin (default)
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;

    # Weighted
    server 127.0.0.1:3001 weight=3;
    server 127.0.0.1:3002 weight=2;
    server 127.0.0.1:3003 weight=1;

    # Least connections
    least_conn;

    # IP hash (session persistence)
    ip_hash;

    # Health check
    server 127.0.0.1:3001 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://backend;
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">SSL/HTTPS</h2>

          <CodeBlock
            title="SSL Configuration"
            code={`server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Location Blocks</h2>

          <CodeBlock
            title="Location Matching"
            code={`# Exact match
location = /favicon.ico {
    log_not_found off;
    access_log off;
}

# Prefix match
location /images/ {
    alias /var/www/images/;
}

# Regex match (case sensitive)
location ~ \\.php$ {
    fastcgi_pass unix:/var/run/php/php-fpm.sock;
}

# Regex match (case insensitive)
location ~* \\.(gif|jpg|png)$ {
    expires 30d;
}

# Prefix (priority over regex)
location ^~ /static/ {
    alias /var/www/static/;
}

# Priority order:
# 1. = (exact)
# 2. ^~ (prefix priority)
# 3. ~ or ~* (regex)
# 4. none (prefix)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Caching</h2>

          <CodeBlock
            title="Proxy Cache"
            code={`# nginx.conf
http {
    proxy_cache_path /var/cache/nginx levels=1:2
                     keys_zone=my_cache:10m
                     max_size=1g
                     inactive=60m;
}

server {
    location / {
        proxy_pass http://backend;

        # Enable cache
        proxy_cache my_cache;
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;
        proxy_cache_use_stale error timeout updating;

        # Cache key
        proxy_cache_key $scheme$request_method$host$request_uri;

        # Cache headers
        add_header X-Cache-Status $upstream_cache_status;
    }

    # Bypass cache
    location /admin {
        proxy_pass http://backend;
        proxy_cache_bypass $http_authorization;
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Security</h2>

          <CodeBlock
            title="Rate Limiting"
            code={`http {
    # Rate limit zone
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_conn_zone $binary_remote_addr zone=addr:10m;
}

server {
    # Apply rate limit
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        limit_conn addr 10;
        proxy_pass http://backend;
    }
}`}
          />

          <CodeBlock
            title="Basic Auth"
            code={`# htpasswd olustur
# htpasswd -c /etc/nginx/.htpasswd admin

location /admin {
    auth_basic "Restricted Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
}

# IP restriction
location /internal {
    allow 192.168.1.0/24;
    allow 10.0.0.0/8;
    deny all;
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Gzip Compression</h2>

          <CodeBlock
            title="Gzip Settings"
            code={`http {
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;

    gzip_types
        text/plain
        text/css
        text/xml
        application/json
        application/javascript
        application/xml
        image/svg+xml;
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Rewrite ve Redirect</h2>

          <CodeBlock
            title="URL Rewriting"
            code={`# Permanent redirect
location /old-page {
    return 301 /new-page;
}

# Rewrite
rewrite ^/blog/(.*)$ /articles/$1 permanent;

# Conditional redirect
if ($host = 'www.example.com') {
    return 301 https://example.com$request_uri;
}

# Remove trailing slash
rewrite ^/(.*)/$ /$1 permanent;

# Add trailing slash
rewrite ^([^.]*[^/])$ $1/ permanent;`}
          />
        </section>
      </div>
    </div>
  )
}
