import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { FunnelRenderer } from '@/components/FunnelRenderer'
import { CopyLinkButton } from './CopyLinkButton'

export default async function FunnelPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const funnel = await prisma.funnel.findFirst({
    where: { id, user: { email: session.user.email } },
    include: { generatedContent: true },
  })

  if (!funnel || !funnel.generatedContent) redirect('/dashboard')

  const funnelUrl = `${process.env.NEXTAUTH_URL}/f/${id}`

  return (
    <div>
      <div className="sticky top-0 z-50 bg-black text-white px-4 py-3 flex flex-wrap gap-3 items-center justify-between border-b-2 border-brand-yellow">
        <div className="flex items-center gap-3 min-w-0">
          <a href="/dashboard" className="text-brand-yellow font-black text-sm uppercase shrink-0 hover:text-white transition-colors">← Dashboard</a>
          <span className="font-black text-sm uppercase truncate hidden sm:block">{funnel.name}</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <CopyLinkButton url={funnelUrl} />
          <a href={funnelUrl} target="_blank" rel="noopener noreferrer"
            className="bg-brand-green text-white font-black text-xs uppercase px-3 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors">
            🔗 Ver Publicado
          </a>
        </div>
      </div>
      <FunnelRenderer funnel={funnel as any} />
    </div>
  )
}
