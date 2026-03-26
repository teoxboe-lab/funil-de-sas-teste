export interface FunnelData {
  name: string
  niche: string
  funnelType: string
  tone: string
  productName: string
  productPrice: string
  pixelFacebook: string
  pixelGoogle: string
  checkoutUrl: string
  whatsappUrl: string
}

export interface GeneratedContent {
  headline: string
  subheadline: string
  heroText: string
  benefits: string[]
  painPoints: string[]
  cta: string
  ctaSecondary?: string
  socialProof: Array<{ name: string; text: string; rating: number }>
  faq: Array<{ question: string; answer: string }>
  urgencyText?: string
  bonuses?: Array<{ title: string; value: string; description: string }>
}
