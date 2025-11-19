'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { GitBranch, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function GitHubActionsCheatSheet() {
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
            <div className="p-3 rounded-xl bg-gray-800">
              <GitBranch className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">GitHub Actions Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>CI/CD automation</p>
            </div>
          </div>
          <PDFDownload title="GitHub Actions" sheetId="github-actions" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Basic Workflow</h2>

          <CodeBlock
            language="yaml"
            title=".github/workflows/ci.yml"
            code={`name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Triggers</h2>

          <CodeBlock
            language="yaml"
            title="Event Triggers"
            code={`on:
  # Push
  push:
    branches:
      - main
      - 'release/**'
    paths:
      - 'src/**'
      - '!src/**/*.md'
    tags:
      - 'v*'

  # Pull request
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main]

  # Schedule (cron)
  schedule:
    - cron: '0 0 * * *'  # Her gun gece yarisi

  # Manual trigger
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

  # Other workflow
  workflow_call:
    inputs:
      config-path:
        required: true
        type: string

  # Release
  release:
    types: [published]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Jobs ve Steps</h2>

          <CodeBlock
            language="yaml"
            title="Job Configuration"
            code={`jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build

  deploy:
    needs: [test, build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - run: echo "Deploying..."

  # Parallel jobs
  lint:
    runs-on: ubuntu-latest
    steps:
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - run: npm run typecheck`}
          />

          <CodeBlock
            language="yaml"
            title="Matrix Strategy"
            code={`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
        os: [ubuntu-latest, windows-latest]
      fail-fast: false

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}

      - run: npm test`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Environment Variables</h2>

          <CodeBlock
            language="yaml"
            title="Variables ve Secrets"
            code={`env:
  NODE_ENV: production
  APP_NAME: myapp

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: \${{ secrets.DATABASE_URL }}

    steps:
      - name: Use env vars
        run: echo "App: \$APP_NAME"
        env:
          STEP_VAR: step-level

      # GitHub context
      - name: GitHub context
        run: |
          echo "Repo: \${{ github.repository }}"
          echo "Branch: \${{ github.ref_name }}"
          echo "SHA: \${{ github.sha }}"
          echo "Actor: \${{ github.actor }}"
          echo "Event: \${{ github.event_name }}"

      # Set output
      - name: Set output
        id: step1
        run: echo "version=1.0.0" >> $GITHUB_OUTPUT

      - name: Use output
        run: echo "Version: \${{ steps.step1.outputs.version }}"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Caching</h2>

          <CodeBlock
            language="yaml"
            title="Cache Dependencies"
            code={`jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Node.js with cache
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # Manual cache
      - name: Cache node modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            \${{ runner.os }}-node-

      # Python cache
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          cache: 'pip'

      - run: npm ci`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Artifacts</h2>

          <CodeBlock
            language="yaml"
            title="Upload/Download Artifacts"
            code={`jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build

      - name: Upload artifact
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 5

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/

      - run: ls -la dist/`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Docker</h2>

          <CodeBlock
            language="yaml"
            title="Docker Build & Push"
            code={`jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            user/app:latest
            user/app:\${{ github.sha }}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Deployment</h2>

          <CodeBlock
            language="yaml"
            title="Deploy Examples"
            code={`# Vercel
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: \${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
    vercel-args: '--prod'

# AWS S3
- name: Deploy to S3
  uses: jakejarvis/s3-sync-action@master
  with:
    args: --delete
  env:
    AWS_S3_BUCKET: \${{ secrets.AWS_S3_BUCKET }}
    AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
    SOURCE_DIR: 'dist'

# GitHub Pages
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: \${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Conditionals</h2>

          <CodeBlock
            language="yaml"
            title="If Conditions"
            code={`jobs:
  deploy:
    runs-on: ubuntu-latest
    # Job level
    if: github.ref == 'refs/heads/main'

    steps:
      # Success/failure
      - name: On success
        if: success()
        run: echo "Success!"

      - name: On failure
        if: failure()
        run: echo "Failed!"

      - name: Always run
        if: always()
        run: echo "Always!"

      # Expression
      - name: Only on push
        if: github.event_name == 'push'
        run: echo "Pushed!"

      - name: Contains
        if: contains(github.event.head_commit.message, 'deploy')
        run: echo "Deploy!"

      - name: Multiple conditions
        if: |
          github.ref == 'refs/heads/main' &&
          github.event_name == 'push'
        run: echo "Main push!"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Reusable Workflows</h2>

          <CodeBlock
            language="yaml"
            title="Callable Workflow"
            code={`# .github/workflows/reusable.yml
name: Reusable workflow

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      token:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying to \${{ inputs.environment }}"

# Caller workflow
jobs:
  call-workflow:
    uses: ./.github/workflows/reusable.yml
    with:
      environment: production
    secrets:
      token: \${{ secrets.DEPLOY_TOKEN }}`}
          />
        </section>
      </div>
    </div>
  )
}
