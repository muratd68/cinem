'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export default function CodeBlock({ code, language = 'python', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { isDark } = useTheme()
  const { showToast } = useToast()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    showToast('Kod kopyalandi!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block my-4">
      <div className="code-header">
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          )}
        </button>
      </div>
      <div className="code-content">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
