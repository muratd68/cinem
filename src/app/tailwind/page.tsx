'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Palette, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function TailwindCheatSheet() {
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
            <div className="p-3 rounded-xl bg-cyan-500">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Tailwind CSS Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Utility classes, responsive design</p>
            </div>
          </div>
          <PDFDownload title="Tailwind" sheetId="tailwind" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Layout</h2>

          <CodeBlock
            language="html"
            title="Container ve Display"
            code={`<!-- Container -->
<div class="container mx-auto px-4">

<!-- Display -->
<div class="block">
<div class="inline-block">
<div class="inline">
<div class="flex">
<div class="inline-flex">
<div class="grid">
<div class="hidden">

<!-- Box Sizing -->
<div class="box-border">
<div class="box-content">

<!-- Float -->
<div class="float-right">
<div class="float-left">
<div class="float-none">
<div class="clear-both">`}
          />

          <CodeBlock
            language="html"
            title="Position"
            code={`<!-- Position -->
<div class="static">
<div class="relative">
<div class="absolute">
<div class="fixed">
<div class="sticky">

<!-- Top/Right/Bottom/Left -->
<div class="top-0 right-0 bottom-0 left-0">
<div class="inset-0">           <!-- tüm kenarlar -->
<div class="inset-x-0">         <!-- sol ve sağ -->
<div class="inset-y-0">         <!-- üst ve alt -->
<div class="top-1/2 left-1/2">  <!-- center -->

<!-- Z-index -->
<div class="z-0">
<div class="z-10">
<div class="z-50">
<div class="z-auto">`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Flexbox</h2>

          <CodeBlock
            language="html"
            title="Flex Container"
            code={`<!-- Flex Direction -->
<div class="flex flex-row">
<div class="flex flex-row-reverse">
<div class="flex flex-col">
<div class="flex flex-col-reverse">

<!-- Flex Wrap -->
<div class="flex flex-wrap">
<div class="flex flex-nowrap">
<div class="flex flex-wrap-reverse">

<!-- Justify Content -->
<div class="flex justify-start">
<div class="flex justify-center">
<div class="flex justify-end">
<div class="flex justify-between">
<div class="flex justify-around">
<div class="flex justify-evenly">

<!-- Align Items -->
<div class="flex items-start">
<div class="flex items-center">
<div class="flex items-end">
<div class="flex items-baseline">
<div class="flex items-stretch">

<!-- Gap -->
<div class="flex gap-4">
<div class="flex gap-x-4 gap-y-2">`}
          />

          <CodeBlock
            language="html"
            title="Flex Items"
            code={`<!-- Flex Grow/Shrink -->
<div class="flex-1">        <!-- grow:1, shrink:1, basis:0% -->
<div class="flex-auto">     <!-- grow:1, shrink:1, basis:auto -->
<div class="flex-initial">  <!-- grow:0, shrink:1, basis:auto -->
<div class="flex-none">     <!-- grow:0, shrink:0, basis:auto -->

<div class="grow">
<div class="grow-0">
<div class="shrink">
<div class="shrink-0">

<!-- Order -->
<div class="order-first">
<div class="order-last">
<div class="order-1">
<div class="order-2">

<!-- Align Self -->
<div class="self-auto">
<div class="self-start">
<div class="self-center">
<div class="self-end">
<div class="self-stretch">`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Grid</h2>

          <CodeBlock
            language="html"
            title="Grid Container"
            code={`<!-- Grid Template Columns -->
<div class="grid grid-cols-1">
<div class="grid grid-cols-2">
<div class="grid grid-cols-3">
<div class="grid grid-cols-12">
<div class="grid grid-cols-none">

<!-- Grid Template Rows -->
<div class="grid grid-rows-1">
<div class="grid grid-rows-3">
<div class="grid grid-rows-6">

<!-- Gap -->
<div class="grid gap-4">
<div class="grid gap-x-4 gap-y-2">

<!-- Auto Flow -->
<div class="grid grid-flow-row">
<div class="grid grid-flow-col">
<div class="grid grid-flow-dense">`}
          />

          <CodeBlock
            language="html"
            title="Grid Items"
            code={`<!-- Column Span -->
<div class="col-span-1">
<div class="col-span-2">
<div class="col-span-full">

<!-- Column Start/End -->
<div class="col-start-1">
<div class="col-end-3">

<!-- Row Span -->
<div class="row-span-1">
<div class="row-span-2">
<div class="row-span-full">

<!-- Row Start/End -->
<div class="row-start-1">
<div class="row-end-3">`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Spacing</h2>

          <CodeBlock
            language="html"
            title="Padding ve Margin"
            code={`<!-- Padding -->
<div class="p-4">      <!-- tüm kenarlar -->
<div class="px-4">     <!-- sol-sağ -->
<div class="py-4">     <!-- üst-alt -->
<div class="pt-4">     <!-- üst -->
<div class="pr-4">     <!-- sağ -->
<div class="pb-4">     <!-- alt -->
<div class="pl-4">     <!-- sol -->

<!-- Margin -->
<div class="m-4">
<div class="mx-auto">  <!-- yatay ortalama -->
<div class="my-4">
<div class="mt-4">
<div class="mr-4">
<div class="mb-4">
<div class="ml-4">
<div class="-mt-4">    <!-- negatif margin -->

<!-- Space Between -->
<div class="space-x-4">  <!-- yatay boşluk -->
<div class="space-y-4">  <!-- dikey boşluk -->

<!-- Değerler: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96 -->`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Sizing</h2>

          <CodeBlock
            language="html"
            title="Width ve Height"
            code={`<!-- Width -->
<div class="w-0">
<div class="w-1">
<div class="w-64">
<div class="w-auto">
<div class="w-1/2">
<div class="w-1/3">
<div class="w-2/3">
<div class="w-full">
<div class="w-screen">
<div class="w-min">
<div class="w-max">
<div class="w-fit">

<!-- Min/Max Width -->
<div class="min-w-0">
<div class="min-w-full">
<div class="max-w-sm">
<div class="max-w-md">
<div class="max-w-lg">
<div class="max-w-xl">
<div class="max-w-2xl">

<!-- Height -->
<div class="h-0">
<div class="h-64">
<div class="h-auto">
<div class="h-full">
<div class="h-screen">
<div class="h-min">
<div class="h-max">
<div class="h-fit">

<!-- Min/Max Height -->
<div class="min-h-0">
<div class="min-h-full">
<div class="min-h-screen">
<div class="max-h-full">`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Typography</h2>

          <CodeBlock
            language="html"
            title="Font"
            code={`<!-- Font Family -->
<p class="font-sans">
<p class="font-serif">
<p class="font-mono">

<!-- Font Size -->
<p class="text-xs">      <!-- 12px -->
<p class="text-sm">      <!-- 14px -->
<p class="text-base">    <!-- 16px -->
<p class="text-lg">      <!-- 18px -->
<p class="text-xl">      <!-- 20px -->
<p class="text-2xl">     <!-- 24px -->
<p class="text-3xl">     <!-- 30px -->
<p class="text-4xl">     <!-- 36px -->

<!-- Font Weight -->
<p class="font-thin">        <!-- 100 -->
<p class="font-light">       <!-- 300 -->
<p class="font-normal">      <!-- 400 -->
<p class="font-medium">      <!-- 500 -->
<p class="font-semibold">    <!-- 600 -->
<p class="font-bold">        <!-- 700 -->
<p class="font-extrabold">   <!-- 800 -->

<!-- Font Style -->
<p class="italic">
<p class="not-italic">`}
          />

          <CodeBlock
            language="html"
            title="Text"
            code={`<!-- Text Alignment -->
<p class="text-left">
<p class="text-center">
<p class="text-right">
<p class="text-justify">

<!-- Text Color -->
<p class="text-black">
<p class="text-white">
<p class="text-gray-500">
<p class="text-red-500">
<p class="text-blue-500">

<!-- Text Decoration -->
<p class="underline">
<p class="overline">
<p class="line-through">
<p class="no-underline">

<!-- Text Transform -->
<p class="uppercase">
<p class="lowercase">
<p class="capitalize">
<p class="normal-case">

<!-- Line Height -->
<p class="leading-none">
<p class="leading-tight">
<p class="leading-normal">
<p class="leading-relaxed">
<p class="leading-loose">

<!-- Letter Spacing -->
<p class="tracking-tighter">
<p class="tracking-tight">
<p class="tracking-normal">
<p class="tracking-wide">
<p class="tracking-wider">

<!-- Truncate -->
<p class="truncate">
<p class="line-clamp-2">`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Background ve Border</h2>

          <CodeBlock
            language="html"
            title="Background"
            code={`<!-- Background Color -->
<div class="bg-white">
<div class="bg-black">
<div class="bg-gray-100">
<div class="bg-blue-500">
<div class="bg-transparent">

<!-- Background Gradient -->
<div class="bg-gradient-to-r from-blue-500 to-purple-500">
<div class="bg-gradient-to-b from-gray-100 to-gray-300">

<!-- Background Size -->
<div class="bg-auto">
<div class="bg-cover">
<div class="bg-contain">

<!-- Background Position -->
<div class="bg-center">
<div class="bg-top">
<div class="bg-bottom">

<!-- Background Repeat -->
<div class="bg-repeat">
<div class="bg-no-repeat">
<div class="bg-repeat-x">`}
          />

          <CodeBlock
            language="html"
            title="Border"
            code={`<!-- Border Width -->
<div class="border">
<div class="border-0">
<div class="border-2">
<div class="border-4">
<div class="border-t-2">
<div class="border-r-2">
<div class="border-b-2">
<div class="border-l-2">

<!-- Border Color -->
<div class="border-black">
<div class="border-gray-300">
<div class="border-blue-500">

<!-- Border Style -->
<div class="border-solid">
<div class="border-dashed">
<div class="border-dotted">
<div class="border-none">

<!-- Border Radius -->
<div class="rounded-none">
<div class="rounded-sm">
<div class="rounded">
<div class="rounded-md">
<div class="rounded-lg">
<div class="rounded-xl">
<div class="rounded-2xl">
<div class="rounded-full">
<div class="rounded-t-lg">   <!-- üst -->
<div class="rounded-r-lg">   <!-- sağ -->
<div class="rounded-b-lg">   <!-- alt -->
<div class="rounded-l-lg">   <!-- sol -->`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Effects ve Filters</h2>

          <CodeBlock
            language="html"
            title="Shadow ve Opacity"
            code={`<!-- Box Shadow -->
<div class="shadow-sm">
<div class="shadow">
<div class="shadow-md">
<div class="shadow-lg">
<div class="shadow-xl">
<div class="shadow-2xl">
<div class="shadow-none">

<!-- Opacity -->
<div class="opacity-0">
<div class="opacity-25">
<div class="opacity-50">
<div class="opacity-75">
<div class="opacity-100">`}
          />

          <CodeBlock
            language="html"
            title="Filters"
            code={`<!-- Blur -->
<div class="blur-none">
<div class="blur-sm">
<div class="blur">
<div class="blur-lg">

<!-- Brightness -->
<div class="brightness-50">
<div class="brightness-100">
<div class="brightness-150">

<!-- Grayscale -->
<div class="grayscale-0">
<div class="grayscale">`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Responsive ve States</h2>

          <CodeBlock
            language="html"
            title="Responsive Breakpoints"
            code={`<!-- sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px -->

<div class="w-full md:w-1/2 lg:w-1/3">
<div class="text-sm md:text-base lg:text-lg">
<div class="hidden md:block">
<div class="flex flex-col md:flex-row">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">`}
          />

          <CodeBlock
            language="html"
            title="State Variants"
            code={`<!-- Hover -->
<button class="bg-blue-500 hover:bg-blue-700">

<!-- Focus -->
<input class="border focus:border-blue-500 focus:ring-2">

<!-- Active -->
<button class="bg-blue-500 active:bg-blue-800">

<!-- Disabled -->
<button class="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed">

<!-- Group Hover -->
<div class="group">
  <div class="group-hover:text-blue-500">

<!-- Dark Mode -->
<div class="bg-white dark:bg-gray-800">
<p class="text-black dark:text-white">

<!-- First/Last Child -->
<li class="first:pt-0 last:pb-0">

<!-- Odd/Even -->
<tr class="odd:bg-gray-100 even:bg-white">`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Transitions ve Animations</h2>

          <CodeBlock
            language="html"
            title="Transitions"
            code={`<!-- Transition Property -->
<div class="transition-all">
<div class="transition-colors">
<div class="transition-opacity">
<div class="transition-transform">

<!-- Duration -->
<div class="duration-75">
<div class="duration-150">
<div class="duration-300">
<div class="duration-500">

<!-- Timing Function -->
<div class="ease-linear">
<div class="ease-in">
<div class="ease-out">
<div class="ease-in-out">

<!-- Örnek -->
<button class="bg-blue-500 hover:bg-blue-700 transition-colors duration-300">`}
          />

          <CodeBlock
            language="html"
            title="Transform ve Animation"
            code={`<!-- Scale -->
<div class="scale-50">
<div class="scale-100">
<div class="scale-150">
<div class="hover:scale-110 transition-transform">

<!-- Rotate -->
<div class="rotate-45">
<div class="rotate-90">
<div class="-rotate-45">

<!-- Translate -->
<div class="translate-x-4">
<div class="translate-y-4">
<div class="-translate-x-1/2 -translate-y-1/2">

<!-- Animation -->
<div class="animate-spin">
<div class="animate-ping">
<div class="animate-pulse">
<div class="animate-bounce">`}
          />
        </section>
      </div>
    </div>
  )
}
