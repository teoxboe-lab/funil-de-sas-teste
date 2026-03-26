import { prisma } from '@/lib/prisma'
import { FunnelRenderer } from '@/components/FunnelRenderer'
import { notFound } from 'next/navigation'

export default async function PublicFunnelPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const funnel = await prisma.funnel.findFirst({
    where: { id, status: 'PUBLISHED' },
    include: { generatedContent: true },
  })

  if (!funnel || !funnel.generatedContent) notFound()

  return <FunnelRenderer funnel={funnel as any} />
}
