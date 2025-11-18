'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Container, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function DockerCheatSheet() {
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
            <div className="p-3 rounded-xl bg-blue-600">
              <Container className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Docker Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Container ve image yonetimi</p>
            </div>
          </div>
          <PDFDownload title="Docker" sheetId="docker" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Container Islemleri</h2>

          <CodeBlock
            language="bash"
            title="Container Yonetimi"
            code={`# Container listele
docker ps                    # Calisan containerlar
docker ps -a                 # Tum containerlar

# Container calistir
docker run nginx             # Basit calistir
docker run -d nginx          # Arka planda
docker run -p 8080:80 nginx  # Port mapping
docker run --name web nginx  # Isim ver
docker run -e VAR=value nginx # Environment variable
docker run -v /host:/container nginx  # Volume mount

# Container yonet
docker start container_id
docker stop container_id
docker restart container_id
docker rm container_id
docker rm -f container_id    # Zorla sil

# Container'a baglan
docker exec -it container_id bash
docker logs container_id
docker logs -f container_id  # Canli takip`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Image Islemleri</h2>

          <CodeBlock
            language="bash"
            title="Image Yonetimi"
            code={`# Image listele
docker images
docker image ls

# Image indir
docker pull nginx
docker pull nginx:latest
docker pull nginx:1.21

# Image olustur
docker build -t myapp .
docker build -t myapp:v1 .
docker build -f Dockerfile.dev -t myapp .

# Image sil
docker rmi image_id
docker image prune           # Kullanilmayan imagelari sil

# Image push
docker tag myapp user/myapp
docker push user/myapp`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Dockerfile</h2>

          <CodeBlock
            language="dockerfile"
            title="Dockerfile Ornegi"
            code={`# Base image
FROM node:18-alpine

# Calisma dizini
WORKDIR /app

# Dosyalari kopyala
COPY package*.json ./
COPY . .

# Komut calistir
RUN npm install
RUN npm run build

# Environment variable
ENV NODE_ENV=production

# Port expose
EXPOSE 3000

# Volume
VOLUME ["/app/data"]

# Baslangic komutu
CMD ["npm", "start"]

# veya
ENTRYPOINT ["node", "server.js"]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Docker Compose</h2>

          <CodeBlock
            language="yaml"
            title="docker-compose.yml"
            code={`version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    volumes:
      - ./app:/app

  db:
    image: postgres:14
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`}
          />

          <CodeBlock
            language="bash"
            title="Compose Komutlari"
            code={`# Servisleri baslat
docker-compose up
docker-compose up -d
docker-compose up --build

# Servisleri durdur
docker-compose down
docker-compose down -v       # Volume'larla birlikte

# Servis yonetimi
docker-compose start
docker-compose stop
docker-compose restart

# Loglar
docker-compose logs
docker-compose logs -f web

# Scale
docker-compose up -d --scale web=3`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Network ve Volume</h2>

          <CodeBlock
            language="bash"
            title="Network"
            code={`# Network listele
docker network ls

# Network olustur
docker network create mynet
docker network create --driver bridge mynet

# Container'i network'e bagla
docker run --network mynet nginx

# Network incele
docker network inspect mynet

# Network sil
docker network rm mynet`}
          />

          <CodeBlock
            language="bash"
            title="Volume"
            code={`# Volume listele
docker volume ls

# Volume olustur
docker volume create myvolume

# Volume kullan
docker run -v myvolume:/data nginx

# Volume incele
docker volume inspect myvolume

# Volume sil
docker volume rm myvolume
docker volume prune          # Kullanilmayanlari sil`}
          />
        </section>
      </div>
    </div>
  )
}
