'use client'
import { useState } from 'react'

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="bg-brand-yellow text-black font-black text-xs uppercase px-3 py-2 border-2 border-white hover:bg-white transition-colors"
    >
      {copied ? '✅ Copiado!' : '📋 Copiar Link'}
    </button>
  )
}
