interface TodoFooterProps {
  remainingCount: number
  hasCompleted: boolean
  onClearCompleted: () => void
}

export function TodoFooter({ remainingCount, hasCompleted, onClearCompleted }: TodoFooterProps) {
  return (
    <div className="flex items-center justify-between text-sm text-slate-500">
      <span>{remainingCount}개 남음</span>
      <button
        type="button"
        onClick={onClearCompleted}
        aria-label="완료된 할 일 모두 삭제"
        disabled={!hasCompleted}
        className="rounded px-2 py-1 font-medium text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        완료 항목 삭제
      </button>
    </div>
  )
}
