import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

const nicheEmoji: Record<string, string> = {
  BEAUTY: '💄', FITNESS: '💪', NUTRITION: '🥗', FINANCE: '💰',
  DIGITAL_PRODUCTS: '📱', EDUCATION: '📚', HEALTH: '❤️',
  RELATIONSHIPS: '💑', BUSINESS: '🏢', SPIRITUALITY: '✨',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { funnels: { orderBy: { createdAt: 'desc' }, take: 30 } },
  })

  const limits: Record<string, number> = { FREE: 3, PRO: 50, AGENCY: 999 }
  const limit = limits[user?.plan ?? 'FREE']
  const count = user?.funnelCount ?? 0

  return (
    <main className="min-h-screen bg-cream">
      <nav className="border-b-2 border-black bg-white px-4 sm:px-6 py-4 flex justify-between items-center">
        <span className="font-black text-xl uppercase">⚡ IA Funnel</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black border-2 border-black px-3 py-1 bg-brand-yellow shadow-brutal">
            {count}/{limit} funis
          </span>
          <span className="hidden sm:block text-sm font-semibold truncate max-w-[150px]">
            {session.user.name}
          </span>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-black text-3xl uppercase">Meus Funis</h1>
            <p className="text-gray-600 text-sm mt-1">Plano {user?.plan} — {count} de {limit} usados</p>
          </div>
          {count < limit && (
            <Link href="/funnel/create" className="btn-brutal bg-brand-yellow border-2 border-black px-5 py-3 font-black uppercase text-sm">
              + Novo Funil
            </Link>
          )}
        </div>
        {user?.funnels.length === 0 ? (
          <div className="border-2 border-black bg-white shadow-brutal p-12 text-center">
            <p className="text-5xl mb-4">🚀</p>
            <p className="font-black text-xl uppercase mb-2">Nenhum funil ainda</p>
            <p className="text-gray-600 mb-6">Crie seu primeiro funil em menos de 2 minutos</p>
            <Link href="/funnel/create" className="btn-brutal inline-block bg-black text-white px-8 py-3 font-black uppercase">
              Criar Primeiro Funil
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {user?.funnels.map((funnel) => (
              <Link key={funnel.id} href={`/funnel/${funnel.id}`}>
                <div className="border-2 border-black bg-white shadow-brutal p-5 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer h-full">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs font-black uppercase px-2 py-1 border border-black ${funnel.status === 'PUBLISHED' ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {funnel.status === 'PUBLISHED' ? '● Publicado' : '○ Rascunho'}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(funnel.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <p className="text-2xl mb-2">{nicheEmoji[funnel.niche] ?? '📄'}</p>
                  <p className="font-black text-base uppercase leading-tight mb-1">{funnel.name}</p>
                  <p className="text-sm text-gray-500">{funnel.niche} • {funnel.funnelType}</p>
                  {funnel.productPrice && (
                    <p className="text-sm font-black text-brand-green mt-2">R$ {funnel.productPrice}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
