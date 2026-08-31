import type { ClassEntry } from '../types'

interface ClassRowProps {
  entry: ClassEntry
  onDelete: (id: string) => void
}

export function ClassRow({ entry, onDelete }: ClassRowProps) {
  const label = `${entry.period}교시 ${entry.grade}학년 ${entry.classNo}반`

  return (
    <li className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <span className="text-sm text-slate-900">{label}</span>
      <button
        type="button"
        onClick={() => onDelete(entry.id)}
        aria-label={`${label} 삭제`}
        className="shrink-0 rounded px-2 py-1 text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/40 sm:text-sm"
      >
        삭제
      </button>
    </li>
  )
}
