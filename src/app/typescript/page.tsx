'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { FileCode, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function TypeScriptCheatSheet() {
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
              <FileCode className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">TypeScript Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type system, interfaces, generics</p>
            </div>
          </div>
          <PDFDownload title="TypeScript" sheetId="typescript" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Tipler</h2>

          <CodeBlock
            language="typescript"
            title="Primitive Types"
            code={`// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let id: symbol = Symbol("id");
let big: bigint = 100n;

// Special types
let notDefined: undefined = undefined;
let empty: null = null;
let anything: any = "can be anything";
let unknown: unknown = 4;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b"];

// Tuple
let tuple: [string, number] = ["hello", 10];
let namedTuple: [name: string, age: number] = ["John", 30];

// Enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

// Literal types
let direction: "left" | "right" = "left";
let count: 1 | 2 | 3 = 1;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Interfaces ve Types</h2>

          <CodeBlock
            language="typescript"
            title="Interface"
            code={`interface User {
  id: number;
  name: string;
  email?: string;              // optional
  readonly createdAt: Date;    // readonly
}

// Extend interface
interface Admin extends User {
  role: string;
  permissions: string[];
}

// Multiple inheritance
interface Employee extends User, Timestamps {
  department: string;
}

// Index signature
interface Dictionary {
  [key: string]: string;
}

// Function interface
interface SearchFunc {
  (source: string, term: string): boolean;
}

// Callable interface
interface Callable {
  (x: number): number;
  description: string;
}`}
          />

          <CodeBlock
            language="typescript"
            title="Type Alias"
            code={`// Basic type alias
type ID = string | number;
type Point = { x: number; y: number };

// Union types
type Status = "pending" | "approved" | "rejected";
type Result = Success | Error;

// Intersection types
type Admin = User & { role: string };

// Function type
type Callback = (data: string) => void;
type AsyncCallback = (data: string) => Promise<void>;

// Conditional types
type IsString<T> = T extends string ? true : false;

// Template literal types
type EventName = \`on\${Capitalize<string>}\`;
type Greeting = \`Hello, \${string}!\`;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Functions</h2>

          <CodeBlock
            language="typescript"
            title="Function Types"
            code={`// Function declaration
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"}, \${name}\`;
}

// Default parameters
function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}\`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Function overloading
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  if (typeof x === "string") {
    return x.toUpperCase();
  }
  return x * 2;
}

// Void and never
function log(message: string): void {
  console.log(message);
}

function throwError(message: string): never {
  throw new Error(message);
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Generics</h2>

          <CodeBlock
            language="typescript"
            title="Generic Types"
            code={`// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity("hello"); // type inference

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

// Generic class
class Box<T> {
  private content: T;

  constructor(value: T) {
    this.content = value;
  }

  getValue(): T {
    return this.content;
  }
}

// Default type parameter
interface Response<T = any> {
  data: T;
  status: number;
}

// keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Utility Types</h2>

          <CodeBlock
            language="typescript"
            title="Built-in Utility Types"
            code={`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - tüm property'leri optional yapar
type PartialUser = Partial<User>;

// Required - tüm property'leri required yapar
type RequiredUser = Required<User>;

// Readonly - tüm property'leri readonly yapar
type ReadonlyUser = Readonly<User>;

// Pick - belirli property'leri seçer
type UserPreview = Pick<User, "id" | "name">;

// Omit - belirli property'leri çıkarır
type UserWithoutEmail = Omit<User, "email">;

// Record - key-value map oluşturur
type UserMap = Record<string, User>;
type StatusMap = Record<"pending" | "active", boolean>;

// Exclude - union'dan tip çıkarır
type T = Exclude<"a" | "b" | "c", "a">; // "b" | "c"

// Extract - union'dan tip seçer
type T = Extract<"a" | "b" | "c", "a" | "f">; // "a"

// NonNullable - null ve undefined çıkarır
type T = NonNullable<string | null | undefined>; // string

// ReturnType - fonksiyon return tipini alır
type T = ReturnType<() => string>; // string

// Parameters - fonksiyon parametre tiplerini alır
type T = Parameters<(a: string, b: number) => void>; // [string, number]

// Awaited - Promise'in resolve tipini alır
type T = Awaited<Promise<string>>; // string`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Classes</h2>

          <CodeBlock
            language="typescript"
            title="Class Syntax"
            code={`class Animal {
  // Properties
  public name: string;
  private age: number;
  protected species: string;
  readonly id: number;

  // Static
  static count: number = 0;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.id = ++Animal.count;
  }

  // Method
  speak(): void {
    console.log(\`\${this.name} makes a sound\`);
  }

  // Getter/Setter
  get animalAge(): number {
    return this.age;
  }

  set animalAge(value: number) {
    if (value > 0) this.age = value;
  }

  // Static method
  static getCount(): number {
    return Animal.count;
  }
}

// Inheritance
class Dog extends Animal {
  breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  speak(): void {
    console.log(\`\${this.name} barks\`);
  }
}

// Abstract class
abstract class Shape {
  abstract getArea(): number;

  describe(): string {
    return \`Area: \${this.getArea()}\`;
  }
}

// Implements interface
interface Printable {
  print(): void;
}

class Document implements Printable {
  print(): void {
    console.log("Printing...");
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Type Guards</h2>

          <CodeBlock
            language="typescript"
            title="Type Narrowing"
            code={`// typeof guard
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
}

// instanceof guard
function logDate(date: Date | string) {
  if (date instanceof Date) {
    console.log(date.toISOString());
  } else {
    console.log(new Date(date).toISOString());
  }
}

// in operator
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

// Custom type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isUser(obj: any): obj is User {
  return "id" in obj && "name" in obj;
}

// Discriminated unions
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  size: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
  }
}

// Assertion functions
function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) throw new Error(msg);
}

function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string") throw new Error("Not a string!");
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Advanced Types</h2>

          <CodeBlock
            language="typescript"
            title="Mapped Types"
            code={`// Basic mapped type
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// Key remapping
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// Conditional in mapped types
type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// Filter keys
type FilteredKeys<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};`}
          />

          <CodeBlock
            language="typescript"
            title="Conditional Types"
            code={`// Basic conditional
type IsArray<T> = T extends any[] ? true : false;

// Infer keyword
type ElementType<T> = T extends (infer E)[] ? E : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type FirstArg<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;
type StrOrNumArray = ToArray<string | number>; // string[] | number[]

// Prevent distribution
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type StrOrNumArray = ToArrayNonDist<string | number>; // (string | number)[]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Module ve Namespace</h2>

          <CodeBlock
            language="typescript"
            title="Modules"
            code={`// Export
export const PI = 3.14;
export function add(a: number, b: number): number {
  return a + b;
}

export default class Calculator {
  // ...
}

// Import
import Calculator from "./calculator";
import { PI, add } from "./math";
import * as math from "./math";
import { add as addition } from "./math";

// Re-export
export { add } from "./math";
export * from "./utils";
export { default as Calculator } from "./calculator";

// Type-only import/export
import type { User } from "./types";
export type { User };`}
          />

          <CodeBlock
            language="typescript"
            title="Declaration Files"
            code={`// types.d.ts
declare module "my-library" {
  export function doSomething(): void;
  export const version: string;
}

// Global declarations
declare global {
  interface Window {
    myCustomProp: string;
  }
}

// Ambient declarations
declare const process: {
  env: {
    NODE_ENV: string;
  };
};`}
          />
        </section>
      </div>
    </div>
  )
}
