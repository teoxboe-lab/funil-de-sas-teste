import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const funnel = await prisma.funnel.findFirst({
    where: { id, user: { email: session.user.email } },
    include: { generatedContent: true },
  })

  if (!funnel) {
    return NextResponse.json({ error: 'Funil não encontrado' }, { status: 404 })
  }

  return NextResponse.json(funnel)
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  await prisma.funnel.deleteMany({
    where: { id, user: { email: session.user.email } },
  })

  return NextResponse.json({ success: true })
}
