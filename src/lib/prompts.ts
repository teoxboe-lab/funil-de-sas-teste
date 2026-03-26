export interface FunnelInput {
  niche: string
  funnelType: string
  tone: string
  productName: string
  productPrice: string
}

const nicheMap: Record<string, string> = {
  BEAUTY: 'Beleza e Estética', FITNESS: 'Fitness e Musculação',
  NUTRITION: 'Nutrição e Emagrecimento', FINANCE: 'Finanças e Renda Extra',
  DIGITAL_PRODUCTS: 'Produtos Digitais', EDUCATION: 'Educação Online',
  HEALTH: 'Saúde e Bem-estar', RELATIONSHIPS: 'Relacionamentos',
  BUSINESS: 'Negócios', SPIRITUALITY: 'Espiritualidade',
}

const toneMap: Record<string, string> = {
  AGGRESSIVE: 'Linguagem direta, imperativa e urgente. Frases curtas. Provoca ação imediata.',
  PAIN_FOCUSED: 'Foca nas dores profundas. Empatia mais autoridade. Identifica o problema cirurgicamente.',
  INSPIRATIONAL: 'Motivacional. Histórias de transformação. Mostra o futuro possível.',
  AUTHORITATIVE: 'Tom de especialista. Dados e números. Profissional e confiante.',
  CONVERSATIONAL: 'Como uma conversa natural. Linguagem acessível. Próximo e humano.',
  URGENCY: 'Escassez real. Prazos. FOMO máximo. Cada frase reforça que o tempo acaba.',
}

const funnelTypeMap: Record<string, string> = {
  DIRECT: 'Venda direta: problema para solução para preço para CTA. Sem enrolação.',
  VSL: 'Video Sales Letter: Hero, história, revelação, oferta, garantia, CTA.',
  LAUNCH: 'Lançamento: antecipação, autoridade, comunidade, abertura de carrinho.',
  WEBINAR: 'Captação para webinar: benefícios de assistir ao vivo.',
  QUIZ: 'Funil quiz: headline curiosa, promessa de diagnóstico personalizado.',
  LEAD_CAPTURE: 'Captura de leads: isca digital irresistível em troca do email.',
}

export function buildPrompt(input: FunnelInput): string {
  return `Você é o melhor copywriter do Brasil especialista em funis de alta conversão.

BRIEFING:
- Nicho: ${nicheMap[input.niche] || input.niche}
- Produto: ${input.productName}
- Preço: R$ ${input.productPrice}
- Tipo de Funil: ${funnelTypeMap[input.funnelType] || input.funnelType}
- Tom de Voz: ${toneMap[input.tone] || input.tone}

Responda APENAS com JSON válido, sem texto antes ou depois:

{
  "headline": "TÍTULO IMPACTANTE EM MAIÚSCULAS máx 10 palavras",
  "subheadline": "Subtítulo que aprofunda a promessa em 1-2 linhas",
  "heroText": "Parágrafo de abertura que captura atenção e identifica a dor em 3-5 linhas",
  "painPoints": [
    "Dor 1 específica que o avatar sente",
    "Dor 2 específica que o avatar sente",
    "Dor 3 específica que o avatar sente",
    "Dor 4 específica que o avatar sente"
  ],
  "benefits": [
    "Benefício 1 concreto do produto",
    "Benefício 2 concreto do produto",
    "Benefício 3 concreto do produto",
    "Benefício 4 concreto do produto",
    "Benefício 5 concreto do produto"
  ],
  "bonuses": [
    { "title": "Nome do Bônus 1", "value": "R$ 97", "description": "O que entrega em 1 linha" },
    { "title": "Nome do Bônus 2", "value": "R$ 47", "description": "O que entrega em 1 linha" }
  ],
  "socialProof": [
    { "name": "Nome Realista", "text": "Depoimento com resultado concreto 2-3 linhas", "rating": 5 },
    { "name": "Nome Realista", "text": "Depoimento com resultado concreto 2-3 linhas", "rating": 5 },
    { "name": "Nome Realista", "text": "Depoimento com resultado concreto 2-3 linhas", "rating": 5 }
  ],
  "faq": [
    { "question": "Objeção comum 1?", "answer": "Resposta que quebra a objeção" },
    { "question": "Objeção comum 2?", "answer": "Resposta que quebra a objeção" },
    { "question": "Objeção comum 3?", "answer": "Resposta que quebra a objeção" }
  ],
  "cta": "TEXTO DO BOTÃO máx 5 palavras",
  "ctaSecondary": "Garantia ou texto de suporte abaixo do botão",
  "urgencyText": "Texto de escassez e urgência"
}`
}
