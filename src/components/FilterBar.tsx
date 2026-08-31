import type { Filter } from '../types'

interface FilterBarProps {
  filter: Filter
  onChange: (filter: Filter) => void
}

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'completed', label: '완료' },
]

export function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <div role="group" aria-label="할 일 필터" className="flex gap-2">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={filter === value}
          onClick={() => onChange(value)}
          className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
            filter === value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
