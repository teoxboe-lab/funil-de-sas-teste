import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IA Funnel — Gerador de Funis com IA',
  description: 'Crie funis de vendas com copy gerada por IA em minutos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-cream min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
