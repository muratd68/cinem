'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'
import { Button } from 'primereact/button'

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
        <span style={{ fontSize: '0.875rem', color: isDark ? '#9ca3af' : '#4b5563' }}>
          {title || language}
        </span>
        <Button
          icon={copied ? 'pi pi-check' : 'pi pi-copy'}
          rounded
          text
          size="small"
          onClick={handleCopy}
          style={{ color: copied ? '#34d399' : (isDark ? '#9ca3af' : '#4b5563') }}
        />
      </div>
      <div className="code-content">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
