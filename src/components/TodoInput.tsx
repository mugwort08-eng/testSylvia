import { useState, type FormEvent } from 'react'
import type { TimeOfDay } from '../types'

interface TodoInputProps {
  onAdd: (text: string, timeOfDay: TimeOfDay) => void
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('')
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, timeOfDay)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <label htmlFor="new-todo" className="sr-only">
        새 할 일 추가
      </label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="할 일을 입력하세요"
        className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />

      <label htmlFor="new-todo-time" className="sr-only">
        오전 또는 오후 선택
      </label>
      <select
        id="new-todo-time"
        value={timeOfDay}
        onChange={(event) => setTimeOfDay(event.target.value as TimeOfDay)}
        className="shrink-0 rounded-md border border-slate-300 px-2 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      >
        <option value="morning">오전</option>
        <option value="afternoon">오후</option>
      </select>

      <button
        type="submit"
        aria-label="할 일 추가"
        className="shrink-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!text.trim()}
      >
        추가
      </button>
    </form>
  )
}
