import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Anthropic from '@anthropic-ai/sdk'
import { buildPrompt } from '@/lib/prompts'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { name, niche, funnelType, tone, productName, productPrice, pixelFacebook, pixelGoogle, checkoutUrl, whatsappUrl } = body

    if (!name || !niche || !funnelType || !tone || !productName || !checkoutUrl) {
      return NextResponse.json({ error: 'Preencha todos os campos obrigatórios' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })

    const limits: Record<string, number> = { FREE: 3, PRO: 50, AGENCY: 999 }
    const userLimit = limits[user.plan] ?? 3

    if (user.funnelCount >= userLimit) {
      return NextResponse.json({ error: `Limite de ${userLimit} funis atingido. Faça upgrade do plano.` }, { status: 403 })
    }

    const prompt = buildPrompt({ niche, funnelType, tone, productName, productPrice })

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const rawText = (message.content[0] as any).text
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return NextResponse.json({ error: 'Erro ao processar resposta da IA. Tente novamente.' }, { status: 500 })

    const generated = JSON.parse(jsonMatch[0])

    const result = await prisma.$transaction(async (tx) => {
      const funnel = await tx.funnel.create({
        data: {
          userId: user.id, name, niche, funnelType, tone, productName,
          productPrice: String(productPrice),
          pixelFacebook: pixelFacebook || null,
          pixelGoogle: pixelGoogle || null,
          checkoutUrl,
          whatsappUrl: whatsappUrl || null,
          status: 'PUBLISHED',
        },
      })

      await tx.generatedContent.create({
        data: {
          funnelId: funnel.id,
          headline: generated.headline ?? '',
          subheadline: generated.subheadline ?? '',
          heroText: generated.heroText ?? '',
          benefits: generated.benefits ?? [],
          painPoints: generated.painPoints ?? [],
          cta: generated.cta ?? 'COMPRAR AGORA',
          ctaSecondary: generated.ctaSecondary ?? null,
          socialProof: generated.socialProof ?? [],
          faq: generated.faq ?? [],
          urgencyText: generated.urgencyText ?? null,
          bonuses: generated.bonuses ?? null,
          rawJson: generated,
          tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
        },
      })

      await tx.user.update({ where: { id: user.id }, data: { funnelCount: { increment: 1 } } })
      return funnel
    })

    return NextResponse.json({ funnelId: result.id, success: true })
  } catch (error: any) {
    console.error('Erro na geração:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
