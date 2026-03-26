'use client'
import { SelectionCard } from '@/components/ui/SelectionCard'

const types = [
  { value: 'DIRECT', label: 'Direto', description: 'Venda direta sem enrolação', icon: '⚡', color: 'yellow' as const },
  { value: 'VSL', label: 'VSL', description: 'Video Sales Letter completo', icon: '🎥', color: 'red' as const },
  { value: 'LAUNCH', label: 'Lançamento', description: 'Funil com antecipação', icon: '🚀', color: 'green' as const },
  { value: 'WEBINAR', label: 'Webinar', description: 'Captação para evento ao vivo', icon: '🎓', color: 'black' as const },
  { value: 'QUIZ', label: 'Quiz', description: 'Diagnóstico interativo', icon: '🎯', color: 'yellow' as const },
  { value: 'LEAD_CAPTURE', label: 'Captação', description: 'Isca digital por email', icon: '🎁', color: 'green' as const },
]

export function StepFunnelType({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="font-black text-2xl uppercase mb-1">Tipo de Funil</h2>
      <p className="text-gray-600 text-sm mb-5">Qual estrutura você quer criar?</p>
      <div className="grid grid-cols-2 gap-3">
        {types.map((t) => (
          <SelectionCard key={t.value} {...t} selected={value === t.value} onClick={() => onChange(t.value)} />
        ))}
      </div>
    </div>
  )
}
