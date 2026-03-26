import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl w-full">
        <div className="inline-block bg-brand-yellow border-2 border-black px-4 py-1 text-sm font-black uppercase shadow-brutal mb-6">
          ⚡ Powered by Claude AI
        </div>
        <h1
          className="font-black uppercase mb-4 leading-none text-black"
          style={{ fontFamily: 'Impact, Arial Narrow, sans-serif', fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          CRIE FUNIS<br />QUE VENDEM
        </h1>
        <p className="text-gray-700 text-lg mb-8 font-semibold max-w-md mx-auto">
          Gere landing pages profissionais com copy de IA em menos de 2 minutos.
        </p>
        <Link
          href="/login"
          className="inline-block bg-black text-white font-black text-xl uppercase px-10 py-4 border-4 border-black shadow-brutal-xl hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-150"
        >
          COMEÇAR GRÁTIS →
        </Link>
        <p className="mt-4 text-sm text-gray-500 font-semibold">
          3 funis grátis • Sem cartão de crédito
        </p>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            { icon: '🎯', title: 'Escolha o Nicho', desc: 'Fitness, Beleza, Finanças e mais' },
            { icon: '⚡', title: 'IA Gera o Copy', desc: 'Headlines, benefícios e CTAs prontos' },
            { icon: '🚀', title: 'Publique na Web', desc: 'Link pronto para seus anúncios' },
          ].map((item) => (
            <div key={item.title} className="border-2 border-black bg-white p-5 shadow-brutal">
              <p className="text-3xl mb-2">{item.icon}</p>
              <p className="font-black uppercase text-sm mb-1">{item.title}</p>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
