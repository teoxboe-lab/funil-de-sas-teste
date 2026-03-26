'use client'
import { SelectionCard } from '@/components/ui/SelectionCard'

const niches = [
  { value: 'BEAUTY', label: 'Beleza', description: 'Estética, skincare, maquiagem', icon: '💄', color: 'red' as const },
  { value: 'FITNESS', label: 'Fitness', description: 'Musculação, emagrecimento', icon: '💪', color: 'green' as const },
  { value: 'NUTRITION', label: 'Nutrição', description: 'Dieta, reeducação alimentar', icon: '🥗', color: 'green' as const },
  { value: 'FINANCE', label: 'Finanças', description: 'Renda extra, investimentos', icon: '💰', color: 'yellow' as const },
  { value: 'DIGITAL_PRODUCTS', label: 'Infoprodutos', description: 'Cursos, ebooks, mentorias', icon: '📱', color: 'black' as const },
  { value: 'EDUCATION', label: 'Educação', description: 'Cursos, idiomas, concursos', icon: '📚', color: 'yellow' as const },
  { value: 'HEALTH', label: 'Saúde', description: 'Bem-estar, suplementos', icon: '❤️', color: 'red' as const },
  { value: 'RELATIONSHIPS', label: 'Relacionamentos', description: 'Conquista, família', icon: '💑', color: 'red' as const },
  { value: 'BUSINESS', label: 'Negócios', description: 'Empreendedorismo, marketing', icon: '🏢', color: 'black' as const },
  { value: 'SPIRITUALITY', label: 'Espiritualidade', description: 'Autoconhecimento, meditação', icon: '✨', color: 'yellow' as const },
]

export function StepNiche({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="font-black text-2xl uppercase mb-1">Escolha seu Nicho</h2>
      <p className="text-gray-600 text-sm mb-5">Em qual mercado seu produto atua?</p>
      <div className="grid grid-cols-2 gap-3">
        {niches.map((n) => (
          <SelectionCard key={n.value} {...n} selected={value === n.value} onClick={() => onChange(n.value)} />
        ))}
      </div>
    </div>
  )
}
