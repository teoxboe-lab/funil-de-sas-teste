'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepNiche } from './StepNiche'
import { StepFunnelType } from './StepFunnelType'
import { StepTone } from './StepTone'
import { StepDetails } from './StepDetails'
import { StepIntegrations } from './StepIntegrations'
import { FunnelData } from '@/types/funnel'

const STEPS = ['Nicho', 'Funil', 'Tom', 'Produto', 'Links']

const emptyData: FunnelData = {
  name: '', niche: '', funnelType: '', tone: '', productName: '',
  productPrice: '', pixelFacebook: '', pixelGoogle: '', checkoutUrl: '', whatsappUrl: '',
}

export function FunnelStepper() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<FunnelData>(emptyData)

  const update = (field: keyof FunnelData, value: string) => setData((prev) => ({ ...prev, [field]: value }))

  const canAdvance = () => {
    if (step === 0) return !!data.niche
    if (step === 1) return !!data.funnelType
    if (step === 2) return !!data.tone
    if (step === 3) return !!data.name && !!data.productName && !!data.productPrice
    if (step === 4) return !!data.checkoutUrl
    return false
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/funnel/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Erro desconhecido')
      router.push(`/funnel/${json.funnelId}`)
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 pb-12">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((s, i) => (
            <span key={s} className={`text-xs font-black uppercase transition-colors ${i <= step ? 'text-black' : 'text-gray-300'}`}>
              {i + 1}. {s}
            </span>
          ))}
        </div>
        <div className="w-full h-3 border-2 border-black bg-white">
          <div className="h-full bg-brand-yellow transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      {step === 0 && <StepNiche value={data.niche} onChange={(v) => update('niche', v)} />}
      {step === 1 && <StepFunnelType value={data.funnelType} onChange={(v) => update('funnelType', v)} />}
      {step === 2 && <StepTone value={data.tone} onChange={(v) => update('tone', v)} />}
      {step === 3 && <StepDetails data={data} onChange={update} />}
      {step === 4 && <StepIntegrations data={data} onChange={update} />}

      {error && (
        <div className="mt-4 p-3 border-2 border-brand-red bg-red-50 text-brand-red font-bold text-sm">⚠️ {error}</div>
      )}

      <div className="flex gap-3 mt-8">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="btn-brutal px-6 py-3 bg-white border-2 border-black font-black uppercase text-sm">
            ← Voltar
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="btn-brutal flex-1 py-3 bg-brand-yellow border-2 border-black font-black uppercase disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-brutal disabled:translate-x-0 disabled:translate-y-0"
          >
            Próximo →
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={!canAdvance() || loading}
            className="btn-brutal flex-1 py-4 bg-brand-green border-2 border-black font-black uppercase text-white text-lg disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? '⚡ Gerando com IA...' : '🚀 GERAR MEU FUNIL'}
          </button>
        )}
      </div>
    </div>
  )
}
