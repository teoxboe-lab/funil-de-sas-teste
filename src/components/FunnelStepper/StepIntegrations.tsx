'use client'
import { FunnelData } from '@/types/funnel'

interface Props {
  data: FunnelData
  onChange: (field: keyof FunnelData, value: string) => void
}

export function StepIntegrations({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="font-black text-2xl uppercase mb-1">Integrações</h2>
      <p className="text-gray-600 text-sm mb-5">Só o checkout é obrigatório.</p>
      <div className="space-y-4">
        <div>
          <label className="font-black uppercase text-xs block mb-1">Link de Checkout *</label>
          <input className="input-brutal font-mono text-sm" placeholder="https://pay.hotmart.com/..." value={data.checkoutUrl} onChange={(e) => onChange('checkoutUrl', e.target.value)} />
        </div>
        <div>
          <label className="font-black uppercase text-xs block mb-1">Pixel Facebook (ID numérico)</label>
          <input className="input-brutal font-mono text-sm" placeholder="123456789012345" value={data.pixelFacebook} onChange={(e) => onChange('pixelFacebook', e.target.value)} />
        </div>
        <div>
          <label className="font-black uppercase text-xs block mb-1">Pixel Google (ID)</label>
          <input className="input-brutal font-mono text-sm" placeholder="AW-123456789" value={data.pixelGoogle} onChange={(e) => onChange('pixelGoogle', e.target.value)} />
        </div>
        <div>
          <label className="font-black uppercase text-xs block mb-1">WhatsApp (com DDI sem espaços)</label>
          <input className="input-brutal font-mono text-sm" placeholder="5511999999999" value={data.whatsappUrl} onChange={(e) => onChange('whatsappUrl', e.target.value)} />
        </div>
      </div>
    </div>
  )
}
