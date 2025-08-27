"use client"

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language: string
  title?: string
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6">
      {title && (
        <div className="bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-300 px-4 py-2 rounded-t-lg text-sm font-medium">
          {title}
        </div>
      )}
      
      <div className="relative">
        <pre className="code-block">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-lg bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-400 hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
