'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Palette, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function SassCheatSheet() {
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
            <div className="p-3 rounded-xl bg-pink-500">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SASS/SCSS Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Variables, mixins, nesting</p>
            </div>
          </div>
          <PDFDownload title="SASS" sheetId="sass" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Variables</h2>

          <CodeBlock
            language="scss"
            title="Variable Tanımlama"
            code={`// Variables
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: 'Helvetica', sans-serif;
$base-padding: 16px;

// Usage
.button {
  background-color: $primary-color;
  font-family: $font-stack;
  padding: $base-padding;
}

// Default values
$brand-color: red !default;  // Değiştirilebilir

// Scope
.container {
  $local-var: 10px;  // Sadece bu block içinde
  padding: $local-var;
}

// Global
.sidebar {
  $global-var: 20px !global;
}

// Maps
$colors: (
  'primary': #3498db,
  'secondary': #2ecc71,
  'danger': #e74c3c
);

.alert {
  background: map-get($colors, 'danger');
}

// Lists
$font-sizes: 12px, 14px, 16px, 18px;
$first-size: nth($font-sizes, 1);  // 12px`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Nesting</h2>

          <CodeBlock
            language="scss"
            title="Selector Nesting"
            code={`// Basic nesting
.navbar {
  background: #333;

  ul {
    list-style: none;
    margin: 0;

    li {
      display: inline-block;

      a {
        color: white;
        text-decoration: none;
      }
    }
  }
}

// Parent selector (&)
.button {
  background: blue;

  &:hover {
    background: darkblue;
  }

  &:active {
    background: navy;
  }

  &.large {
    padding: 20px;
  }

  &--primary {  // BEM modifier
    background: $primary-color;
  }

  &__icon {    // BEM element
    margin-right: 8px;
  }
}

// Property nesting
.box {
  font: {
    family: sans-serif;
    size: 16px;
    weight: bold;
  }

  margin: {
    top: 10px;
    bottom: 10px;
  }

  border: 1px solid black {
    radius: 5px;
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Mixins</h2>

          <CodeBlock
            language="scss"
            title="Mixin Tanımlama"
            code={`// Basic mixin
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul {
  @include reset-list;
}

// Mixin with parameters
@mixin button($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.btn-primary {
  @include button(#3498db);
}

.btn-danger {
  @include button(#e74c3c, #fff);
}

// Mixin with variable arguments
@mixin box-shadow($shadows...) {
  box-shadow: $shadows;
}

.card {
  @include box-shadow(
    0 2px 4px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.1)
  );
}

// Mixin with @content
@mixin media($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: 767px) { @content; }
  } @else if $breakpoint == tablet {
    @media (max-width: 1023px) { @content; }
  } @else if $breakpoint == desktop {
    @media (min-width: 1024px) { @content; }
  }
}

.container {
  width: 100%;

  @include media(tablet) {
    width: 750px;
  }

  @include media(desktop) {
    width: 1200px;
  }
}`}
          />

          <CodeBlock
            language="scss"
            title="Yaygın Mixins"
            code={`// Flexbox center
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Absolute center
@mixin absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// Clearfix
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

// Truncate text
@mixin truncate($width: 100%) {
  max-width: $width;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Responsive font size
@mixin responsive-font($min, $max, $min-vw: 320px, $max-vw: 1200px) {
  font-size: $min;

  @media (min-width: $min-vw) {
    font-size: calc(#{$min} + #{strip-unit($max - $min)} * ((100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)}));
  }

  @media (min-width: $max-vw) {
    font-size: $max;
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Functions</h2>

          <CodeBlock
            language="scss"
            title="Custom Functions"
            code={`// Custom function
@function calculate-rem($size) {
  @return $size / 16px * 1rem;
}

h1 {
  font-size: calculate-rem(32px);  // 2rem
}

// Function with multiple returns
@function theme-color($name) {
  $colors: (
    'primary': #3498db,
    'secondary': #2ecc71,
    'danger': #e74c3c
  );

  @if map-has-key($colors, $name) {
    @return map-get($colors, $name);
  } @else {
    @error "Color '#{$name}' not found.";
  }
}

.alert {
  background: theme-color('danger');
}

// Strip unit
@function strip-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    @return $number / ($number * 0 + 1);
  }
  @return $number;
}`}
          />

          <CodeBlock
            language="scss"
            title="Built-in Functions"
            code={`// Color functions
$color: #3498db;

.element {
  // Lighten/Darken
  background: lighten($color, 20%);
  border-color: darken($color, 10%);

  // Saturate/Desaturate
  color: saturate($color, 20%);

  // Adjust hue
  background: adjust-hue($color, 45deg);

  // Mix colors
  background: mix(#f00, #00f, 50%);

  // Alpha
  background: rgba($color, 0.5);
  background: transparentize($color, 0.5);
  background: opacify($color, 0.3);

  // Complement
  color: complement($color);
}

// String functions
$string: "Hello World";
$length: str-length($string);     // 11
$upper: to-upper-case($string);   // "HELLO WORLD"
$lower: to-lower-case($string);   // "hello world"

// Number functions
$number: 4.5;
$rounded: round($number);   // 5
$ceil: ceil($number);       // 5
$floor: floor($number);     // 4
$abs: abs(-10);            // 10
$min: min(1, 2, 3);        // 1
$max: max(1, 2, 3);        // 3
$percentage: percentage(0.5); // 50%

// List functions
$list: 1px, 2px, 3px;
$first: nth($list, 1);          // 1px
$length: length($list);         // 3
$appended: append($list, 4px);  // 1px, 2px, 3px, 4px
$joined: join($list, (4px, 5px)); // 1px, 2px, 3px, 4px, 5px

// Map functions
$map: ('a': 1, 'b': 2);
$value: map-get($map, 'a');           // 1
$keys: map-keys($map);                // 'a', 'b'
$values: map-values($map);            // 1, 2
$merged: map-merge($map, ('c': 3));   // ('a': 1, 'b': 2, 'c': 3)
$has: map-has-key($map, 'a');         // true`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Control Directives</h2>

          <CodeBlock
            language="scss"
            title="@if, @else"
            code={`// @if
@mixin button-style($type) {
  @if $type == 'primary' {
    background: #3498db;
    color: white;
  } @else if $type == 'secondary' {
    background: #95a5a6;
    color: white;
  } @else if $type == 'danger' {
    background: #e74c3c;
    color: white;
  } @else {
    background: #ecf0f1;
    color: black;
  }
}

.btn-primary {
  @include button-style('primary');
}

// Conditional in selector
$theme: 'dark';

body {
  @if $theme == 'dark' {
    background: #333;
    color: white;
  } @else {
    background: white;
    color: #333;
  }
}`}
          />

          <CodeBlock
            language="scss"
            title="@for Loop"
            code={`// through (includes end)
@for $i from 1 through 5 {
  .col-#{$i} {
    width: percentage($i / 5);
  }
}

// to (excludes end)
@for $i from 1 to 5 {
  .item-#{$i} {
    z-index: $i;
  }
}

// Generates:
// .col-1 { width: 20%; }
// .col-2 { width: 40%; }
// .col-3 { width: 60%; }
// .col-4 { width: 80%; }
// .col-5 { width: 100%; }`}
          />

          <CodeBlock
            language="scss"
            title="@each Loop"
            code={`// List
$sizes: small, medium, large;

@each $size in $sizes {
  .icon-#{$size} {
    @if $size == small {
      font-size: 12px;
    } @else if $size == medium {
      font-size: 16px;
    } @else {
      font-size: 20px;
    }
  }
}

// Map
$colors: (
  'primary': #3498db,
  'secondary': #2ecc71,
  'danger': #e74c3c
);

@each $name, $color in $colors {
  .btn-#{$name} {
    background-color: $color;
  }
}

// Multiple values
$icons: (
  'home': '\\e900',
  'user': '\\e901',
  'search': '\\e902'
);

@each $name, $code in $icons {
  .icon-#{$name}::before {
    content: $code;
  }
}`}
          />

          <CodeBlock
            language="scss"
            title="@while Loop"
            code={`$i: 1;

@while $i <= 5 {
  .width-#{$i * 20} {
    width: percentage($i / 5);
  }
  $i: $i + 1;
}

// Generates:
// .width-20 { width: 20%; }
// .width-40 { width: 40%; }
// .width-60 { width: 60%; }
// .width-80 { width: 80%; }
// .width-100 { width: 100%; }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Extend ve Placeholder</h2>

          <CodeBlock
            language="scss"
            title="@extend"
            code={`// Basic extend
.message {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}

// Placeholder selector (%)
%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  @extend %button-base;
  background: #3498db;
  color: white;
}

.btn-secondary {
  @extend %button-base;
  background: #95a5a6;
  color: white;
}

// Placeholder doesn't generate CSS by itself
// Only generates when extended`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Import ve Use</h2>

          <CodeBlock
            language="scss"
            title="Modules"
            code={`// _variables.scss (partial)
$primary-color: #3498db;
$font-size: 16px;

// _mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// main.scss
// @import (eski yöntem)
@import 'variables';
@import 'mixins';

// @use (yeni yöntem - önerilen)
@use 'variables';
@use 'mixins';

.button {
  background: variables.$primary-color;
  @include mixins.flex-center;
}

// Namespace değiştir
@use 'variables' as vars;
@use 'mixins' as *;  // no namespace

.button {
  background: vars.$primary-color;
  @include flex-center;  // namespace yok
}

// @forward - Re-export
// _index.scss
@forward 'variables';
@forward 'mixins';
@forward 'functions';

// main.scss
@use 'index';`}
          />
        </section>
      </div>
    </div>
  )
}
