'use client'
import { FunnelData } from '@/types/funnel'

interface Props {
  data: FunnelData
  onChange: (field: keyof FunnelData, value: string) => void
}

export function StepDetails({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="font-black text-2xl uppercase mb-1">Seu Produto</h2>
      <p className="text-gray-600 text-sm mb-5">Dados para a IA criar a copy certa.</p>
      <div className="space-y-4">
        <div>
          <label className="font-black uppercase text-xs block mb-1">Nome do Funil *</label>
          <input className="input-brutal" placeholder="Ex: Funil Beleza Premium" value={data.name} onChange={(e) => onChange('name', e.target.value)} />
        </div>
        <div>
          <label className="font-black uppercase text-xs block mb-1">Nome do Produto *</label>
          <input className="input-brutal" placeholder="Ex: Curso Pele Perfeita" value={data.productName} onChange={(e) => onChange('productName', e.target.value)} />
        </div>
        <div>
          <label className="font-black uppercase text-xs block mb-1">Preço em R$ *</label>
          <input className="input-brutal" placeholder="Ex: 197" type="number" min="1" value={data.productPrice} onChange={(e) => onChange('productPrice', e.target.value)} />
        </div>
      </div>
    </div>
  )
}
