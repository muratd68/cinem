'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Atom, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function ReactCheatSheet() {
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
              <Atom className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">React Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Component ve hooks</p>
            </div>
          </div>
          <PDFDownload title="React" sheetId="react" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Components</h2>

          <CodeBlock
            language="javascript"
            title="Functional Component"
            code={`// Basit component
function Hello() {
  return <h1>Hello World</h1>
}

// Props ile
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
    </div>
  )
}

// Children ile
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

// Default props
Greeting.defaultProps = {
  name: 'Guest',
  age: 0
}

// Export
export default Hello
export { Greeting, Card }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Hooks</h2>

          <CodeBlock
            language="javascript"
            title="useState"
            code={`import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: '', age: 0 })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>

      {/* Object update */}
      <button onClick={() => setUser({ ...user, name: 'Ali' })}>
        Set Name
      </button>
    </div>
  )
}`}
          />

          <CodeBlock
            language="javascript"
            title="useEffect"
            code={`import { useState, useEffect } from 'react'

function DataFetcher() {
  const [data, setData] = useState(null)

  // Component mount
  useEffect(() => {
    fetchData()
  }, [])

  // Dependency degisince
  useEffect(() => {
    fetchData(id)
  }, [id])

  // Cleanup
  useEffect(() => {
    const timer = setInterval(() => {}, 1000)
    return () => clearInterval(timer)
  }, [])

  // Her renderda
  useEffect(() => {
    console.log('Rendered')
  })

  return <div>{data}</div>
}`}
          />

          <CodeBlock
            language="javascript"
            title="Diger Hooks"
            code={`import { useRef, useMemo, useCallback, useContext } from 'react'

// useRef
function Input() {
  const inputRef = useRef(null)
  const focus = () => inputRef.current.focus()
  return <input ref={inputRef} />
}

// useMemo (deger memo)
const expensive = useMemo(() => {
  return computeExpensive(a, b)
}, [a, b])

// useCallback (fonksiyon memo)
const handleClick = useCallback(() => {
  doSomething(a, b)
}, [a, b])

// useContext
const ThemeContext = React.createContext('light')
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  )
}
function Child() {
  const theme = useContext(ThemeContext)
}`}
          />

          <CodeBlock
            language="javascript"
            title="Custom Hook"
            code={`// Custom hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// Kullanim
function App() {
  const [name, setName] = useLocalStorage('name', '')
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Event Handling</h2>

          <CodeBlock
            language="javascript"
            title="Events"
            code={`function Form() {
  const [value, setValue] = useState('')

  // Input change
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value)
  }

  // Click with parameter
  const handleClick = (id) => (e) => {
    console.log(id, e)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={handleChange}
        onFocus={() => {}}
        onBlur={() => {}}
      />
      <button onClick={handleClick(1)}>Submit</button>
    </form>
  )
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Conditional Rendering</h2>

          <CodeBlock
            language="javascript"
            title="Kosullu Render"
            code={`function App({ isLoggedIn, items }) {
  return (
    <div>
      {/* Ternary */}
      {isLoggedIn ? <Dashboard /> : <Login />}

      {/* && operatoru */}
      {isLoggedIn && <Profile />}

      {/* Erken return */}
      {!isLoggedIn && return <Login />}

      {/* Liste render */}
      {items.map(item => (
        <Item key={item.id} {...item} />
      ))}

      {/* Kosullu class */}
      <div className={\`btn \${isActive ? 'active' : ''}\`}>
    </div>
  )
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">State Management</h2>

          <CodeBlock
            language="javascript"
            title="useReducer"
            code={`import { useReducer } from 'react'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}`}
          />
        </section>
      </div>
    </div>
  )
}
