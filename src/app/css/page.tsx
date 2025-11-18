'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Palette, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function CSSCheatSheet() {
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
            <div className="p-3 rounded-xl bg-blue-400">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">CSS/Tailwind Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Styling ve Tailwind CSS</p>
            </div>
          </div>
          <PDFDownload title="CSS" sheetId="css" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Flexbox</h2>

          <CodeBlock
            language="css"
            title="CSS Flexbox"
            code={`/* Container */
.container {
  display: flex;
  flex-direction: row | column | row-reverse | column-reverse;
  justify-content: flex-start | center | flex-end | space-between | space-around;
  align-items: stretch | flex-start | center | flex-end | baseline;
  flex-wrap: nowrap | wrap | wrap-reverse;
  gap: 1rem;
}

/* Items */
.item {
  flex: 1;                    /* grow shrink basis */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
  align-self: center;
  order: 1;
}`}
          />

          <CodeBlock
            title="Tailwind Flexbox"
            code={`<!-- Container -->
<div class="flex flex-row justify-center items-center gap-4">
  <div class="flex-1">Item 1</div>
  <div class="flex-none">Item 2</div>
</div>

<!-- Common patterns -->
<div class="flex justify-between">     <!-- Space between -->
<div class="flex justify-center">      <!-- Center horizontal -->
<div class="flex items-center">        <!-- Center vertical -->
<div class="flex flex-col">            <!-- Column -->
<div class="flex flex-wrap">           <!-- Wrap -->`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Grid</h2>

          <CodeBlock
            language="css"
            title="CSS Grid"
            code={`/* Container */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px auto;
  gap: 1rem;
  grid-gap: 1rem;
}

/* Items */
.item {
  grid-column: 1 / 3;         /* Start / end */
  grid-column: span 2;        /* Span 2 columns */
  grid-row: 1 / 3;
  justify-self: center;
  align-self: center;
}`}
          />

          <CodeBlock
            title="Tailwind Grid"
            code={`<!-- Grid container -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

<!-- Span -->
<div class="col-span-2">          <!-- Span 2 columns -->
<div class="row-span-3">          <!-- Span 3 rows -->`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Spacing</h2>

          <CodeBlock
            title="Tailwind Spacing"
            code={`<!-- Padding -->
p-4       <!-- padding: 1rem -->
px-4      <!-- padding-left/right -->
py-4      <!-- padding-top/bottom -->
pt-4      <!-- padding-top -->
pb-4      <!-- padding-bottom -->
pl-4      <!-- padding-left -->
pr-4      <!-- padding-right -->

<!-- Margin -->
m-4       <!-- margin: 1rem -->
mx-auto   <!-- margin-left/right: auto -->
my-4      <!-- margin-top/bottom -->
mt-4      <!-- margin-top -->
-mt-4     <!-- margin-top: -1rem -->

<!-- Space between -->
space-x-4   <!-- Children arasi horizontal gap -->
space-y-4   <!-- Children arasi vertical gap -->

<!-- Scale: 1 = 0.25rem = 4px -->
<!-- 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64 -->`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Typography</h2>

          <CodeBlock
            title="Tailwind Typography"
            code={`<!-- Font size -->
text-xs      <!-- 0.75rem -->
text-sm      <!-- 0.875rem -->
text-base    <!-- 1rem -->
text-lg      <!-- 1.125rem -->
text-xl      <!-- 1.25rem -->
text-2xl     <!-- 1.5rem -->
text-3xl     <!-- 1.875rem -->

<!-- Font weight -->
font-normal   <!-- 400 -->
font-medium   <!-- 500 -->
font-semibold <!-- 600 -->
font-bold     <!-- 700 -->

<!-- Text align -->
text-left
text-center
text-right
text-justify

<!-- Text color -->
text-gray-500
text-red-600
text-blue-700

<!-- Other -->
uppercase
lowercase
capitalize
truncate       <!-- Text overflow -->
line-clamp-3   <!-- Max 3 satir -->`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Colors ve Background</h2>

          <CodeBlock
            title="Tailwind Colors"
            code={`<!-- Text colors -->
text-black
text-white
text-gray-500
text-red-500
text-blue-600

<!-- Background -->
bg-white
bg-gray-100
bg-blue-500
bg-gradient-to-r from-blue-500 to-purple-500

<!-- Border colors -->
border-gray-300
border-red-500

<!-- Opacity -->
bg-opacity-50
text-opacity-75

<!-- Common grays -->
gray-50   <!-- En acik -->
gray-100
gray-200
gray-300
gray-400
gray-500  <!-- Orta -->
gray-600
gray-700
gray-800
gray-900  <!-- En koyu -->`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Border ve Shadow</h2>

          <CodeBlock
            title="Tailwind Border/Shadow"
            code={`<!-- Border width -->
border        <!-- 1px -->
border-2      <!-- 2px -->
border-4      <!-- 4px -->
border-t-2    <!-- top -->

<!-- Border radius -->
rounded       <!-- 0.25rem -->
rounded-md    <!-- 0.375rem -->
rounded-lg    <!-- 0.5rem -->
rounded-xl    <!-- 0.75rem -->
rounded-full  <!-- 9999px -->

<!-- Shadow -->
shadow-sm
shadow
shadow-md
shadow-lg
shadow-xl
shadow-2xl
shadow-none

<!-- Ring (focus icin) -->
ring-2
ring-blue-500
focus:ring-2`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Responsive</h2>

          <CodeBlock
            title="Tailwind Breakpoints"
            code={`<!-- Breakpoints -->
sm:   <!-- 640px -->
md:   <!-- 768px -->
lg:   <!-- 1024px -->
xl:   <!-- 1280px -->
2xl:  <!-- 1536px -->

<!-- Kullanim -->
<div class="w-full md:w-1/2 lg:w-1/3">

<!-- Mobile first -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Hidden/visible -->
<div class="hidden md:block">    <!-- Mobile'da gizli -->
<div class="block md:hidden">    <!-- Desktop'ta gizli -->`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Position ve Layout</h2>

          <CodeBlock
            title="Tailwind Position"
            code={`<!-- Position -->
relative
absolute
fixed
sticky

<!-- Inset -->
top-0
right-0
bottom-0
left-0
inset-0     <!-- Tum kenarlar 0 -->
inset-x-0   <!-- left/right 0 -->
inset-y-0   <!-- top/bottom 0 -->

<!-- Z-index -->
z-0
z-10
z-20
z-30
z-40
z-50

<!-- Display -->
block
inline-block
inline
flex
grid
hidden

<!-- Width/Height -->
w-full
w-1/2
w-screen
h-full
h-screen
min-h-screen`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Transitions ve Animations</h2>

          <CodeBlock
            title="Tailwind Animations"
            code={`<!-- Transition -->
transition          <!-- all 150ms -->
transition-colors   <!-- background, border, color -->
transition-transform
duration-300        <!-- 300ms -->
ease-in-out

<!-- Transform -->
scale-105
rotate-45
translate-x-4
-translate-y-1

<!-- Hover effects -->
hover:bg-blue-600
hover:scale-105
hover:shadow-lg

<!-- Built-in animations -->
animate-spin
animate-ping
animate-pulse
animate-bounce

<!-- Ornek -->
<button class="bg-blue-500 hover:bg-blue-600
               transition-colors duration-200
               transform hover:scale-105">`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Ornek Component</h2>

          <CodeBlock
            title="Card Component"
            code={`<div class="max-w-sm mx-auto bg-white rounded-xl shadow-md
            overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48"
           src="image.jpg" alt="">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500
                  font-semibold">
        Category
      </div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium
                        text-black hover:underline">
        Title
      </a>
      <p class="mt-2 text-gray-500">
        Description text goes here.
      </p>
    </div>
  </div>
</div>`}
          />
        </section>
      </div>
    </div>
  )
}
