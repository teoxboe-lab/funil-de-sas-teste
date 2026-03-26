'use client'

interface Props {
  value: string
  label: string
  description: string
  icon: string
  color: 'yellow' | 'red' | 'green' | 'black'
  selected: boolean
  onClick: () => void
}

const bgMap = { yellow: 'bg-brand-yellow', red: 'bg-brand-red', green: 'bg-brand-green', black: 'bg-black' }
const textMap = { yellow: 'text-black', red: 'text-white', green: 'text-white', black: 'text-white' }

export function SelectionCard({ label, description, icon, color, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full p-4 border-2 border-black text-left transition-all duration-150 ${
        selected ? `${bgMap[color]} shadow-none translate-x-1 translate-y-1` : 'bg-white shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`font-black text-sm uppercase ${selected ? textMap[color] : 'text-black'}`}>{label}</p>
          <p className={`text-xs mt-0.5 ${selected ? textMap[color] : 'text-gray-500'} opacity-90`}>{description}</p>
        </div>
        {selected && (
          <div className={`shrink-0 w-4 h-4 rounded-full border-2 mt-0.5 ${color === 'yellow' ? 'border-black bg-black' : 'border-white bg-white'}`} />
        )}
      </div>
    </button>
  )
}
