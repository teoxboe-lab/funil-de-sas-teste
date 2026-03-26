import { prisma } from '@/lib/prisma'
import { FunnelRenderer } from '@/components/FunnelRenderer'
import { notFound } from 'next/navigation'

export default async function PublicFunnelPage({ params }: { params: { id: string } }) {
  const funnel = await prisma.funnel.findFirst({
    where: { id: params.id, status: 'PUBLISHED' },
    include: { generatedContent: true },
  })

  if (!funnel || !funnel.generatedContent) notFound()

  return <FunnelRenderer funnel={funnel as any} />
}
