'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Terminal, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LinuxCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-700">
            <Terminal className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Linux Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Terminal komutlari ve sistem yonetimi</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Dosya Islemleri</h2>

          <CodeBlock
            language="bash"
            title="Temel Komutlar"
            code={`# Dizin listeleme
ls                  # Liste
ls -l               # Detayli
ls -la              # Gizli dosyalar dahil
ls -lh              # Okunabilir boyut
ls -lt              # Tarihe gore sirala
ls -lS              # Boyuta gore sirala

# Dizin degistirme
cd /home/user       # Belirli dizine git
cd ..               # Ust dizine
cd ~                # Home dizinine
cd -                # Onceki dizine
pwd                 # Mevcut dizini goster

# Dosya/dizin olusturma
mkdir klasor        # Dizin olustur
mkdir -p a/b/c      # Nested dizin
touch dosya.txt     # Bos dosya olustur

# Kopyalama ve tasima
cp dosya.txt yedek.txt
cp -r klasor/ yedek/    # Dizin kopyala
mv dosya.txt yeni.txt   # Tasi/yeniden adlandir
mv dosya.txt klasor/    # Dizine tasi

# Silme
rm dosya.txt
rm -r klasor/           # Dizin sil
rm -rf klasor/          # Zorla sil
rmdir bos_klasor        # Bos dizin sil`}
          />

          <CodeBlock
            language="bash"
            title="Dosya Icerik Islemleri"
            code={`# Dosya okuma
cat dosya.txt           # Tum icerik
less dosya.txt          # Sayfa sayfa
more dosya.txt          # Sayfa sayfa
head dosya.txt          # Ilk 10 satir
head -n 20 dosya.txt    # Ilk 20 satir
tail dosya.txt          # Son 10 satir
tail -f log.txt         # Canli takip

# Dosya bilgisi
file dosya.txt          # Dosya tipi
wc dosya.txt            # Satir/kelime/byte sayisi
wc -l dosya.txt         # Sadece satir sayisi
stat dosya.txt          # Detayli bilgi
du -sh klasor/          # Dizin boyutu
df -h                   # Disk kullanimi

# Arama
find . -name "*.txt"    # Isimle ara
find . -type f -size +1M    # 1MB'dan buyuk
find . -mtime -7        # Son 7 gun degisen
locate dosya.txt        # Hizli arama

# Metin arama
grep "kelime" dosya.txt
grep -r "kelime" .      # Recursive
grep -i "kelime" dosya  # Case insensitive
grep -n "kelime" dosya  # Satir numarasi
grep -c "kelime" dosya  # Eslesme sayisi`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Izinler</h2>

          <CodeBlock
            language="bash"
            title="Dosya Izinleri"
            code={`# Izin gosterimi: rwxrwxrwx
# r=read(4), w=write(2), x=execute(1)
# [owner][group][others]

# chmod ile izin degistirme
chmod 755 script.sh     # rwxr-xr-x
chmod 644 dosya.txt     # rw-r--r--
chmod +x script.sh      # Execute ekle
chmod -w dosya.txt      # Write kaldir
chmod u+x dosya         # Owner'a execute ekle
chmod g-w dosya         # Group'tan write kaldir
chmod o=r dosya         # Others sadece read
chmod -R 755 klasor/    # Recursive

# chown ile sahiplik degistirme
chown user dosya.txt
chown user:group dosya.txt
chown -R user:group klasor/

# chgrp ile grup degistirme
chgrp group dosya.txt`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Proses Yonetimi</h2>

          <CodeBlock
            language="bash"
            title="Proses Komutlari"
            code={`# Proses listeleme
ps                      # Mevcut terminal
ps aux                  # Tum prosesler
ps aux | grep python    # Filtrele
top                     # Interaktif izleme
htop                    # Gelismis izleme

# Proses sonlandirma
kill PID                # SIGTERM
kill -9 PID             # SIGKILL (zorla)
killall python          # Isimle oldur
pkill -f "script.py"    # Pattern ile

# Arka plan islemleri
command &               # Arka planda calistir
jobs                    # Arka plan islerini listele
fg %1                   # On plana getir
bg %1                   # Arka plana gonder
nohup command &         # Terminal kapansa da calis
disown                  # Jobdan ayir

# Kaynak kullanimi
free -h                 # Bellek kullanimi
vmstat                  # Sistem istatistikleri
iostat                  # I/O istatistikleri`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Ag Komutlari</h2>

          <CodeBlock
            language="bash"
            title="Network"
            code={`# Ag bilgisi
ip addr                 # IP adresi
ifconfig                # Ag arayuzleri
hostname -I             # IP adresi

# Baglanti testi
ping google.com
ping -c 4 google.com    # 4 paket

# Port ve baglanti
netstat -tuln           # Dinleyen portlar
ss -tuln                # Modern netstat
lsof -i :8080           # Port kullanan proses

# Dosya transferi
scp dosya.txt user@host:/path/
scp -r klasor/ user@host:/path/
rsync -avz klasor/ user@host:/path/

# Indirme
wget https://example.com/file.zip
curl -O https://example.com/file.zip
curl -X GET https://api.example.com

# SSH
ssh user@host
ssh -p 2222 user@host   # Farkli port
ssh-keygen -t rsa       # Anahtar olustur`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Arsiv ve Sikistirma</h2>

          <CodeBlock
            language="bash"
            title="Arsiv Islemleri"
            code={`# tar
tar -cvf arsiv.tar klasor/      # Olustur
tar -xvf arsiv.tar              # Cikar
tar -tvf arsiv.tar              # Listele

# tar.gz
tar -czvf arsiv.tar.gz klasor/  # Olustur
tar -xzvf arsiv.tar.gz          # Cikar

# tar.bz2
tar -cjvf arsiv.tar.bz2 klasor/ # Olustur
tar -xjvf arsiv.tar.bz2         # Cikar

# zip
zip -r arsiv.zip klasor/        # Olustur
unzip arsiv.zip                 # Cikar
unzip -l arsiv.zip              # Listele

# gzip
gzip dosya.txt                  # Sikistir
gunzip dosya.txt.gz             # Ac`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Metin Isleme</h2>

          <CodeBlock
            language="bash"
            title="Text Processing"
            code={`# sed (stream editor)
sed 's/eski/yeni/' dosya        # Ilk eslesen
sed 's/eski/yeni/g' dosya       # Tum eslesen
sed -i 's/eski/yeni/g' dosya    # Dosyada degistir
sed '5d' dosya                  # 5. satiri sil
sed '/pattern/d' dosya          # Pattern iceren satirlari sil

# awk
awk '{print $1}' dosya          # 1. sutun
awk '{print $1, $3}' dosya      # 1. ve 3. sutun
awk -F: '{print $1}' /etc/passwd
awk '{sum+=$1} END {print sum}' # Toplam

# sort ve uniq
sort dosya                      # Sirala
sort -r dosya                   # Ters sirala
sort -n dosya                   # Sayisal sirala
sort -u dosya                   # Benzersiz
uniq dosya                      # Tekrarlari kaldir
sort dosya | uniq -c            # Tekrar sayisi

# cut
cut -d',' -f1 dosya.csv         # 1. sutun
cut -c1-10 dosya                # Ilk 10 karakter

# tr
tr 'a-z' 'A-Z' < dosya          # Kucuk->buyuk
tr -d ' ' < dosya               # Bosluklari sil`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Pipe ve Yonlendirme</h2>

          <CodeBlock
            language="bash"
            title="Redirection"
            code={`# Cikis yonlendirme
command > dosya         # Ustune yaz
command >> dosya        # Ekle
command 2> hata.log     # Stderr
command &> tum.log      # Stdout + stderr
command 2>&1            # Stderr -> stdout

# Giris yonlendirme
command < dosya

# Pipe
command1 | command2
ls -l | grep ".txt"
cat dosya | sort | uniq
ps aux | grep python | awk '{print $2}'

# tee (hem dosyaya hem ekrana)
command | tee dosya.txt
command | tee -a dosya.txt      # Ekle

# xargs
find . -name "*.txt" | xargs rm
cat list.txt | xargs -I {} cp {} /backup/`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sistem Yonetimi</h2>

          <CodeBlock
            language="bash"
            title="Sistem Komutlari"
            code={`# Sistem bilgisi
uname -a                # Sistem bilgisi
lsb_release -a          # Distro bilgisi
cat /etc/os-release     # OS bilgisi
uptime                  # Calisma suresi

# Kullanici yonetimi
whoami                  # Mevcut kullanici
id                      # Kullanici bilgisi
users                   # Giris yapan kullanicilar
sudo command            # Root olarak calistir
su - user               # Kullanici degistir

# Paket yonetimi (Debian/Ubuntu)
apt update              # Repo guncelle
apt upgrade             # Paketleri guncelle
apt install paket       # Yukle
apt remove paket        # Kaldir
apt search paket        # Ara

# Paket yonetimi (RHEL/CentOS)
yum update
yum install paket

# Servis yonetimi
systemctl start servis
systemctl stop servis
systemctl restart servis
systemctl status servis
systemctl enable servis # Baslangicta calistir

# Cron (zamanlanmis gorevler)
crontab -e              # Duzenle
crontab -l              # Listele
# Dakika Saat Gun Ay Haftagunu Komut
# */5 * * * * /path/script.sh`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Kisayollar</h2>

          <CodeBlock
            language="bash"
            title="Terminal Kisayollari"
            code={`# Navigasyon
Ctrl + A        # Satir basi
Ctrl + E        # Satir sonu
Ctrl + U        # Imlece kadar sil
Ctrl + K        # Imlecten sonrasini sil
Ctrl + W        # Onceki kelimeyi sil
Ctrl + Y        # Yapistir

# Gecmis
Ctrl + R        # Gecmiste ara
!!              # Son komutu tekrarla
!$              # Son argumaini kullan
history         # Komut gecmisi
!123            # 123. komutu calistir

# Kontrol
Ctrl + C        # Islemi iptal et
Ctrl + Z        # Arka plana at
Ctrl + D        # EOF / Cikis
Ctrl + L        # Ekrani temizle

# Tab completion
Tab             # Otomatik tamamla
Tab Tab         # Secenekleri goster`}
          />
        </section>
      </div>
    </div>
  )
}
