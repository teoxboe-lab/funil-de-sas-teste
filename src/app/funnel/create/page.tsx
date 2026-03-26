import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FunnelStepper } from '@/components/FunnelStepper'

export default async function CreateFunnelPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <main className="min-h-screen bg-cream">
      <nav className="border-b-2 border-black bg-white px-4 sm:px-6 py-4 flex items-center gap-4">
        <a href="/dashboard" className="font-black text-sm uppercase hover:text-brand-red transition-colors">← Dashboard</a>
        <span className="text-gray-300">|</span>
        <span className="font-black text-xl uppercase">⚡ IA Funnel</span>
      </nav>
      <div className="py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="font-black text-3xl uppercase mb-1">Criar Novo Funil</h1>
          <p className="text-gray-600">Responda as perguntas e a IA faz o copy completo</p>
        </div>
        <FunnelStepper />
      </div>
    </main>
  )
}
