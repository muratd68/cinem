'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Layers, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function NextJSCheatSheet() {
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
            <div className="p-3 rounded-xl bg-black">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Next.js Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>React framework</p>
            </div>
          </div>
          <PDFDownload title="Next.js" sheetId="nextjs" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">App Router (Next.js 13+)</h2>

          <CodeBlock
            title="Dosya Yapisi"
            code={`app/
├── layout.tsx        // Root layout
├── page.tsx          // Home page (/)
├── loading.tsx       // Loading UI
├── error.tsx         // Error UI
├── not-found.tsx     // 404 page
├── about/
│   └── page.tsx      // /about
├── blog/
│   ├── page.tsx      // /blog
│   └── [slug]/
│       └── page.tsx  // /blog/[slug]
└── api/
    └── users/
        └── route.ts  // API route`}
          />

          <CodeBlock
            language="javascript"
            title="Page Component"
            code={`// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
    </main>
  )
}

// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: {
  params: { slug: string }
}) {
  return <h1>Post: {params.slug}</h1>
}

// Metadata
export const metadata = {
  title: 'My Page',
  description: 'Page description'
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: \`Post: \${params.slug}\`
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Data Fetching</h2>

          <CodeBlock
            language="javascript"
            title="Server Components"
            code={`// Server Component (default)
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Dynamic
    // cache: 'force-cache' // Static (default)
    // next: { revalidate: 3600 } // ISR
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()

  return (
    <div>
      {data.map(item => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  )
}

// Revalidate
export const revalidate = 3600 // Saniye

// Dynamic rendering
export const dynamic = 'force-dynamic'`}
          />

          <CodeBlock
            language="javascript"
            title="Client Components"
            code={`'use client'

import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Layouts</h2>

          <CodeBlock
            language="javascript"
            title="Root Layout"
            code={`// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'My App',
  description: 'App description'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>Navigation</nav>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  )
}

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  )
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">API Routes</h2>

          <CodeBlock
            language="javascript"
            title="Route Handlers"
            code={`// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return NextResponse.json(user, { status: 201 })
}

// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUser(params.id)
  if (!user) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }
  return NextResponse.json(user)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deleteUser(params.id)
  return new NextResponse(null, { status: 204 })
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Navigation</h2>

          <CodeBlock
            language="javascript"
            title="Link ve useRouter"
            code={`import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

// Link component
<Link href="/">Home</Link>
<Link href="/blog/hello">Blog Post</Link>
<Link href={{ pathname: '/search', query: { q: 'hello' } }}>
  Search
</Link>

// Programmatic navigation
'use client'

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleClick = () => {
    router.push('/dashboard')
    router.replace('/login')
    router.back()
    router.refresh()
  }

  return (
    <div>
      <p>Current path: {pathname}</p>
      <p>Query: {searchParams.get('q')}</p>
      <button onClick={handleClick}>Navigate</button>
    </div>
  )
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Loading ve Error</h2>

          <CodeBlock
            language="javascript"
            title="Loading UI"
            code={`// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="loading">
      <p>Loading...</p>
    </div>
  )
}

// Skeleton component
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
    </div>
  )
}`}
          />

          <CodeBlock
            language="javascript"
            title="Error Handling"
            code={`// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  )
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Server Actions</h2>

          <CodeBlock
            language="javascript"
            title="Form Actions"
            code={`// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')

  await db.user.create({
    data: { name, email }
  })

  revalidatePath('/users')
}

// app/page.tsx
import { createUser } from './actions'

export default function Page() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit">Create</button>
    </form>
  )
}

// With useFormState
'use client'
import { useFormState } from 'react-dom'
import { createUser } from './actions'

export default function Form() {
  const [state, formAction] = useFormState(createUser, null)

  return (
    <form action={formAction}>
      <input name="name" />
      {state?.error && <p>{state.error}</p>}
      <button>Submit</button>
    </form>
  )
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Middleware</h2>

          <CodeBlock
            language="javascript"
            title="middleware.ts"
            code={`// middleware.ts (root)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Auth check
  const token = request.cookies.get('token')

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Header ekleme
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')

  return response
}

// Matcher config
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*'
  ]
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Image ve Font</h2>

          <CodeBlock
            language="javascript"
            title="Image Optimization"
            code={`import Image from 'next/image'

// Local image
import profilePic from './profile.png'

<Image
  src={profilePic}
  alt="Profile"
  width={500}
  height={500}
  priority
/>

// Remote image
<Image
  src="https://example.com/image.jpg"
  alt="Remote"
  width={500}
  height={500}
  placeholder="blur"
  blurDataURL="data:image/..."
/>

// Fill container
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="/hero.jpg"
    alt="Hero"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>

// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
  },
}`}
          />
        </section>
      </div>
    </div>
  )
}
