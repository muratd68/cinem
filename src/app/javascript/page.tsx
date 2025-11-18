'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { FileJson, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function JavaScriptCheatSheet() {
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
            <div className="p-3 rounded-xl bg-yellow-500">
              <FileJson className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">JavaScript Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Modern ES6+ syntax</p>
            </div>
          </div>
          <PDFDownload title="JavaScript" sheetId="javascript" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Degiskenler ve Tipler</h2>

          <CodeBlock
            language="javascript"
            title="Variables"
            code={`// Degisken tanimlama
let name = "Ali"          // Block scope, degistirilebilir
const PI = 3.14           // Block scope, sabit
var old = "eski"          // Function scope (kullanma)

// Veri tipleri
const str = "string"
const num = 42
const bool = true
const nul = null
const undef = undefined
const sym = Symbol("id")
const big = 9007199254740991n

// Tip kontrolu
typeof str              // "string"
typeof num              // "number"
Array.isArray([1, 2])   // true
obj instanceof Object   // true`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">String Islemleri</h2>

          <CodeBlock
            language="javascript"
            title="Strings"
            code={`const str = "Hello World"

// Metodlar
str.length              // 11
str.toUpperCase()       // "HELLO WORLD"
str.toLowerCase()       // "hello world"
str.trim()              // Bosluklari sil
str.split(" ")          // ["Hello", "World"]
str.slice(0, 5)         // "Hello"
str.substring(0, 5)     // "Hello"
str.replace("World", "JS")
str.includes("World")   // true
str.startsWith("Hello") // true
str.endsWith("World")   // true
str.indexOf("World")    // 6
str.repeat(2)           // "Hello WorldHello World"
str.padStart(15, "*")   // "****Hello World"

// Template literals
const name = "Ali"
const msg = \`Merhaba \${name}!\`
const multi = \`
  Cok
  satirli
  metin
\``}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Array Islemleri</h2>

          <CodeBlock
            language="javascript"
            title="Arrays"
            code={`const arr = [1, 2, 3, 4, 5]

// Temel metodlar
arr.push(6)             // Sona ekle
arr.pop()               // Sondan sil
arr.unshift(0)          // Basa ekle
arr.shift()             // Bastan sil
arr.splice(2, 1)        // Index 2'den 1 eleman sil
arr.slice(1, 3)         // [2, 3]
arr.concat([6, 7])      // Birlestir
arr.join("-")           // "1-2-3-4-5"
arr.reverse()           // Ters cevir
arr.sort((a, b) => a - b)

// Arama
arr.includes(3)         // true
arr.indexOf(3)          // 2
arr.find(x => x > 3)    // 4
arr.findIndex(x => x > 3)
arr.filter(x => x > 2)  // [3, 4, 5]

// Donusum
arr.map(x => x * 2)     // [2, 4, 6, 8, 10]
arr.reduce((a, b) => a + b, 0)  // 15
arr.forEach(x => console.log(x))
arr.every(x => x > 0)   // true
arr.some(x => x > 4)    // true
arr.flat()              // Duzlestir
arr.flatMap(x => [x, x*2])

// Spread
const newArr = [...arr, 6, 7]
const copy = [...arr]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Object Islemleri</h2>

          <CodeBlock
            language="javascript"
            title="Objects"
            code={`const obj = {
  name: "Ali",
  age: 25,
  city: "Istanbul"
}

// Erisim
obj.name                // "Ali"
obj["name"]             // "Ali"
obj?.address?.street    // Optional chaining

// Metodlar
Object.keys(obj)        // ["name", "age", "city"]
Object.values(obj)      // ["Ali", 25, "Istanbul"]
Object.entries(obj)     // [["name", "Ali"], ...]
Object.assign({}, obj)  // Kopyala
Object.freeze(obj)      // Degistirilemez yap
Object.seal(obj)        // Eleman eklenemez

// Destructuring
const { name, age } = obj
const { name: isim } = obj
const { name, ...rest } = obj

// Spread
const newObj = { ...obj, email: "ali@mail.com" }

// Computed property
const key = "dynamic"
const dynamic = { [key]: "value" }

// Shorthand
const name = "Ali"
const user = { name }   // { name: "Ali" }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Fonksiyonlar</h2>

          <CodeBlock
            language="javascript"
            title="Functions"
            code={`// Function declaration
function greet(name) {
  return \`Hello \${name}\`
}

// Function expression
const greet = function(name) {
  return \`Hello \${name}\`
}

// Arrow function
const greet = (name) => \`Hello \${name}\`
const greet = name => \`Hello \${name}\`
const add = (a, b) => a + b

// Default parameters
const greet = (name = "World") => \`Hello \${name}\`

// Rest parameters
const sum = (...nums) => nums.reduce((a, b) => a + b)

// Destructuring parameters
const getFullName = ({ first, last }) => \`\${first} \${last}\`

// IIFE
(function() {
  console.log("Immediately invoked")
})()

// Closure
function counter() {
  let count = 0
  return () => ++count
}
const inc = counter()
inc()  // 1
inc()  // 2`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Async/Await</h2>

          <CodeBlock
            language="javascript"
            title="Asenkron Programlama"
            code={`// Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 1000)
})

promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Finished"))

// Async/Await
async function fetchData() {
  try {
    const response = await fetch("/api/data")
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

// Parallel promises
const [user, posts] = await Promise.all([
  fetch("/api/user"),
  fetch("/api/posts")
])

// Promise methods
Promise.all([p1, p2])       // Tumu tamamlaninca
Promise.race([p1, p2])      // Ilk tamamlanan
Promise.allSettled([p1, p2]) // Tumu sonuclaninca
Promise.any([p1, p2])       // Ilk basarili`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Classes</h2>

          <CodeBlock
            language="javascript"
            title="ES6 Classes"
            code={`class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(\`\${this.name} makes a sound\`)
  }

  static info() {
    return "Animal class"
  }

  get getName() {
    return this.name
  }

  set setName(name) {
    this.name = name
  }
}

// Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name)
    this.breed = breed
  }

  speak() {
    console.log(\`\${this.name} barks\`)
  }
}

const dog = new Dog("Max", "Labrador")
dog.speak()  // "Max barks"

// Private fields (ES2022)
class Counter {
  #count = 0

  increment() {
    this.#count++
  }

  get value() {
    return this.#count
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Modern Features</h2>

          <CodeBlock
            language="javascript"
            title="ES2020+ Features"
            code={`// Nullish coalescing
const value = null ?? "default"  // "default"
const value = 0 ?? "default"     // 0

// Optional chaining
const street = user?.address?.street

// Logical assignment
x ||= y   // x = x || y
x &&= y   // x = x && y
x ??= y   // x = x ?? y

// Array.at()
const arr = [1, 2, 3]
arr.at(-1)  // 3

// Object.hasOwn()
Object.hasOwn(obj, "key")

// Top-level await
const data = await fetch("/api")

// Private class fields
class Example {
  #privateField = 42
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">DOM Manipülasyonu</h2>

          <CodeBlock
            language="javascript"
            title="DOM"
            code={`// Element secme
document.getElementById("id")
document.querySelector(".class")
document.querySelectorAll("div")
document.getElementsByClassName("class")

// Element olusturma
const div = document.createElement("div")
div.textContent = "Hello"
div.innerHTML = "<span>World</span>"
document.body.appendChild(div)

// Attribute
element.getAttribute("href")
element.setAttribute("href", "url")
element.removeAttribute("href")
element.classList.add("active")
element.classList.remove("active")
element.classList.toggle("active")

// Event listener
element.addEventListener("click", (e) => {
  e.preventDefault()
  console.log(e.target)
})

// Style
element.style.color = "red"
element.style.backgroundColor = "blue"`}
          />
        </section>
      </div>
    </div>
  )
}
