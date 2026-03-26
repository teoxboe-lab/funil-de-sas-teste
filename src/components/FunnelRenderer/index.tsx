'use client'

interface Content {
  headline: string
  subheadline: string
  heroText: string
  painPoints: string[]
  benefits: string[]
  bonuses?: Array<{ title: string; value: string; description: string }>
  socialProof: Array<{ name: string; text: string; rating: number }>
  faq: Array<{ question: string; answer: string }>
  cta: string
  ctaSecondary?: string
  urgencyText?: string
}

interface Props {
  funnel: {
    productName: string
    productPrice: string | null
    checkoutUrl: string | null
    whatsappUrl: string | null
    pixelFacebook: string | null
    pixelGoogle: string | null
    generatedContent: { rawJson: any }
  }
}

export function FunnelRenderer({ funnel }: Props) {
  const c = funnel.generatedContent.rawJson as Content
  const checkoutUrl = funnel.checkoutUrl || '#'
  const titleStyle = { fontFamily: 'Impact, Arial Narrow, sans-serif', fontSize: 'clamp(2rem, 6vw, 4rem)' }
  const h2Style = { fontFamily: 'Impact, Arial Narrow, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FFFBEB' }}>

      <section className="bg-black text-white px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-black uppercase leading-none mb-5" style={titleStyle}>{c.headline}</h1>
          <p className="text-brand-yellow text-lg sm:text-xl font-bold mb-6 max-w-2xl mx-auto">{c.subheadline}</p>
          <p className="text-gray-300 text-base max-w-2xl mx-auto leading-relaxed mb-8">{c.heroText}</p>
          {c.urgencyText && (
            <div className="inline-block bg-brand-red text-white font-black px-5 py-2 border-2 border-white text-sm uppercase mb-5">
              ⏰ {c.urgencyText}
            </div>
          )}
          <div className="flex flex-col items-center gap-3">
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-brand-yellow text-black font-black text-xl uppercase px-10 py-4 border-4 border-white shadow-brutal-xl hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-150">
              {c.cta}
            </a>
            {c.ctaSecondary && <p className="text-gray-400 text-sm">{c.ctaSecondary}</p>}
          </div>
        </div>
      </section>

      <section className="bg-brand-red py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-white uppercase text-center mb-8" style={h2Style}>Você se identifica com isso? 👇</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.painPoints?.map((pain, i) => (
              <div key={i} className="bg-white border-2 border-black p-4 shadow-brutal">
                <p className="font-bold text-black flex gap-2 items-start">
                  <span className="shrink-0">😔</span><span>{pain}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4" style={{ backgroundColor: '#FFFBEB' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-black uppercase text-center mb-8" style={h2Style}>O que você vai conquistar ✅</h2>
          <div className="space-y-3">
            {c.benefits?.map((benefit, i) => (
              <div key={i} className="flex gap-4 items-start border-2 border-black bg-white p-4 shadow-brutal">
                <span className="text-brand-green font-black text-xl shrink-0">✓</span>
                <p className="font-semibold text-black">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {c.bonuses && c.bonuses.length > 0 && (
        <section className="bg-brand-green py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-black text-white uppercase text-center mb-8" style={h2Style}>🎁 Bônus Exclusivos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {c.bonuses.map((bonus, i) => (
                <div key={i} className="bg-white border-2 border-black p-5 shadow-brutal">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-black text-black uppercase text-sm">{bonus.title}</p>
                    <span className="bg-brand-yellow border border-black px-2 py-0.5 font-black text-xs line-through text-gray-600">{bonus.value}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{bonus.description}</p>
                  <p className="font-black text-brand-green text-sm mt-2">GRÁTIS</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 px-4" style={{ backgroundColor: '#FFFBEB' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-black uppercase text-center mb-8" style={h2Style}>Resultados Reais 🏆</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {c.socialProof?.map((proof, i) => (
              <div key={i} className="border-2 border-black bg-white p-5 shadow-brutal">
                <p className="text-brand-yellow text-lg mb-2">{'★'.repeat(proof.rating)}</p>
                <p className="text-sm text-gray-700 italic mb-3 leading-relaxed">"{proof.text}"</p>
                <p className="font-black text-black text-sm">— {proof.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-yellow py-14 px-4 text-center border-y-4 border-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black text-black uppercase mb-4"
            style={{ fontFamily: 'Impact, Arial Narrow, sans-serif', fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
            Garanta Agora — R$ {funnel.productPrice}
          </h2>
          {c.urgencyText && <p className="font-bold text-brand-red mb-5 text-sm">⏰ {c.urgencyText}</p>}
          <a href={checkoutUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-black text-white font-black text-xl uppercase px-10 py-4 border-4 border-black shadow-brutal-xl hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-150">
            {c.cta}
          </a>
          {c.ctaSecondary && <p className="mt-3 text-gray-700 text-sm font-semibold">{c.ctaSecondary}</p>}
          {funnel.whatsappUrl && (
            <a href={`https://wa.me/${funnel.whatsappUrl}`} className="block mt-4 text-brand-green font-bold text-sm hover:underline" target="_blank" rel="noopener noreferrer">
              💬 Dúvidas? Fale no WhatsApp
            </a>
          )}
        </div>
      </section>

      <section className="py-14 px-4" style={{ backgroundColor: '#FFFBEB' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-black uppercase text-center mb-8" style={h2Style}>Perguntas Frequentes</h2>
          <div className="space-y-3">
            {c.faq?.map((item, i) => (
              <details key={i} className="border-2 border-black bg-white shadow-brutal group">
                <summary className="p-4 font-black cursor-pointer text-sm uppercase flex justify-between items-center list-none select-none">
                  <span>{item.question}</span>
                  <span className="shrink-0 ml-2 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed border-t-2 border-black pt-3">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-500 py-8 px-4 text-center text-xs border-t-4 border-brand-yellow">
        <p className="font-bold mb-1">© {new Date().getFullYear()} {funnel.productName} — Todos os direitos reservados</p>
        <p>Este site não é afiliado ao Facebook Inc. ou Google LLC</p>
      </footer>
    </div>
  )
}
