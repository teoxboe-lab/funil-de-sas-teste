'use client'
import { SelectionCard } from '@/components/ui/SelectionCard'

const tones = [
  { value: 'AGGRESSIVE', label: 'Agressivo', description: 'Direto, imperativo, urgente', icon: '🔥', color: 'red' as const },
  { value: 'PAIN_FOCUSED', label: 'Focado na Dor', description: 'Empatia profunda mais autoridade', icon: '💔', color: 'black' as const },
  { value: 'INSPIRATIONAL', label: 'Inspiracional', description: 'Motivacional e transformador', icon: '⭐', color: 'yellow' as const },
  { value: 'AUTHORITATIVE', label: 'Autoritário', description: 'Expert, dados, credibilidade', icon: '🏆', color: 'green' as const },
  { value: 'CONVERSATIONAL', label: 'Conversacional', description: 'Natural, próximo, humano', icon: '💬', color: 'yellow' as const },
  { value: 'URGENCY', label: 'Urgência', description: 'Escassez máxima, FOMO extremo', icon: '⏰', color: 'red' as const },
]

export function StepTone({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="font-black text-2xl uppercase mb-1">Tom de Voz</h2>
      <p className="text-gray-600 text-sm mb-5">Como sua copy deve soar?</p>
      <div className="grid grid-cols-2 gap-3">
        {tones.map((t) => (
          <SelectionCard key={t.value} {...t} selected={value === t.value} onClick={() => onChange(t.value)} />
        ))}
      </div>
    </div>
  )
}
