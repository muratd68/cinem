'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { GitBranch, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function GitCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gray-600">
            <GitBranch className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Git Cheat Sheet</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Versiyon kontrol komutlari</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Komutlar</h2>

          <CodeBlock
            language="bash"
            title="Baslangic"
            code={`# Yeni repo olustur
git init

# Repo klonla
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git klasor-adi

# Konfigürasyon
git config --global user.name "Adiniz"
git config --global user.email "email@ornek.com"
git config --list`}
          />

          <CodeBlock
            language="bash"
            title="Durum ve Gecmis"
            code={`# Durumu gor
git status
git status -s          # Kisa format

# Degisiklikleri gor
git diff               # Unstaged degisiklikler
git diff --staged      # Staged degisiklikler
git diff HEAD~1        # Son commit ile karsilastir

# Gecmisi gor
git log
git log --oneline
git log --graph --oneline --all
git log -n 5           # Son 5 commit
git log --author="Ali"
git log --since="2024-01-01"
git log -- dosya.txt   # Belirli dosya`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Stage ve Commit</h2>

          <CodeBlock
            language="bash"
            title="Degisiklikleri Kaydetme"
            code={`# Stage'e ekle
git add dosya.txt
git add .              # Tum degisiklikler
git add *.js           # Pattern ile
git add -A             # Tum degisiklikler (silmeler dahil)

# Stage'den cikar
git reset dosya.txt
git reset              # Tum staged dosyalar

# Commit
git commit -m "Commit mesaji"
git commit -am "Mesaj" # add + commit (sadece tracked)
git commit --amend     # Son commiti duzenle
git commit --amend -m "Yeni mesaj"

# Dosya silme
git rm dosya.txt
git rm --cached dosya.txt  # Sadece Git'ten sil

# Dosya tasima/yeniden adlandirma
git mv eski.txt yeni.txt`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Branch Islemleri</h2>

          <CodeBlock
            language="bash"
            title="Branch Yonetimi"
            code={`# Branch listele
git branch             # Yerel
git branch -r          # Remote
git branch -a          # Tumu

# Branch olustur
git branch yeni-branch
git checkout -b yeni-branch    # Olustur ve gec
git switch -c yeni-branch      # Yeni syntax

# Branch degistir
git checkout branch-adi
git switch branch-adi

# Branch sil
git branch -d branch-adi       # Merged ise
git branch -D branch-adi       # Zorla sil

# Branch yeniden adlandir
git branch -m eski-ad yeni-ad`}
          />

          <CodeBlock
            language="bash"
            title="Merge ve Rebase"
            code={`# Merge
git checkout main
git merge feature-branch
git merge --no-ff feature      # Merge commit olustur

# Merge conflict cozumu
# 1. Dosyalari duzenle
# 2. git add .
# 3. git commit

# Merge iptal
git merge --abort

# Rebase
git checkout feature
git rebase main

# Interactive rebase
git rebase -i HEAD~3

# Rebase iptal
git rebase --abort

# Cherry-pick
git cherry-pick abc123         # Tek commit
git cherry-pick abc123..def456 # Aralik`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Remote Islemleri</h2>

          <CodeBlock
            language="bash"
            title="Remote Yonetimi"
            code={`# Remote listele
git remote -v

# Remote ekle
git remote add origin https://github.com/user/repo.git

# Remote guncelle
git remote set-url origin yeni-url

# Remote sil
git remote remove origin

# Remote'dan cek
git fetch origin
git fetch --all

# Pull (fetch + merge)
git pull origin main
git pull --rebase origin main

# Push
git push origin main
git push -u origin main        # Upstream ayarla
git push origin --all          # Tum branchlar
git push origin --tags         # Tum taglar

# Remote branch sil
git push origin --delete branch-adi`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Geri Alma Islemleri</h2>

          <CodeBlock
            language="bash"
            title="Degisiklikleri Geri Alma"
            code={`# Dosyadaki degisiklikleri geri al
git checkout -- dosya.txt
git restore dosya.txt          # Yeni syntax

# Staged degisikligi geri al
git reset HEAD dosya.txt
git restore --staged dosya.txt

# Son commiti geri al (degisiklikler kalir)
git reset --soft HEAD~1

# Son commiti tamamen sil
git reset --hard HEAD~1

# Belirli commite don
git reset --hard abc123

# Revert (yeni commit ile geri al)
git revert abc123
git revert HEAD

# Reflog (kayip commitleri bul)
git reflog
git checkout HEAD@{2}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Stash</h2>

          <CodeBlock
            language="bash"
            title="Gecici Kayit"
            code={`# Degisiklikleri sakla
git stash
git stash push -m "Mesaj"
git stash --include-untracked

# Stash listele
git stash list

# Stash uygula
git stash apply            # Son stash
git stash apply stash@{2}  # Belirli stash
git stash pop              # Uygula ve sil

# Stash gor
git stash show
git stash show -p          # Diff ile

# Stash sil
git stash drop stash@{0}
git stash clear            # Tumu`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Tag</h2>

          <CodeBlock
            language="bash"
            title="Tag Islemleri"
            code={`# Tag listele
git tag
git tag -l "v1.*"

# Lightweight tag
git tag v1.0.0

# Annotated tag
git tag -a v1.0.0 -m "Versiyon 1.0.0"

# Belirli commite tag
git tag -a v0.9.0 abc123 -m "Mesaj"

# Tag bilgisi
git show v1.0.0

# Tag push
git push origin v1.0.0
git push origin --tags

# Tag sil
git tag -d v1.0.0
git push origin --delete v1.0.0`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Diger Komutlar</h2>

          <CodeBlock
            language="bash"
            title="Faydali Komutlar"
            code={`# Blame (satir bazli gecmis)
git blame dosya.txt

# Bisect (bug bulma)
git bisect start
git bisect bad             # Suanki commit kotü
git bisect good abc123     # Bu commit iyi
# ... test et ...
git bisect good/bad
git bisect reset

# Clean (untracked dosyalari sil)
git clean -n               # Onizleme
git clean -f               # Sil
git clean -fd              # Klasorler dahil

# Archive
git archive --format=zip HEAD > arsiv.zip

# Grep
git grep "aranacak" -- "*.js"

# Shortlog
git shortlog -sn           # Contributor istatistik`}
          />

          <CodeBlock
            language="bash"
            title=".gitignore"
            code={`# .gitignore ornekleri
*.log                    # Tum .log dosyalari
node_modules/            # Klasor
!important.log           # Istisna
/build                   # Sadece root'ta
doc/**/*.pdf             # Nested

# Global gitignore
git config --global core.excludesfile ~/.gitignore_global`}
          />
        </section>
      </div>
    </div>
  )
}
