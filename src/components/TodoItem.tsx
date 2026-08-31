import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEditing() {
    setDraft(todo.text)
    setIsEditing(true)
  }

  function commitEdit() {
    const trimmed = draft.trim()
    if (trimmed) {
      onEdit(todo.id, trimmed)
      setIsEditing(false)
    } else {
      onDelete(todo.id)
    }
  }

  function cancelEdit() {
    setDraft(todo.text)
    setIsEditing(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      commitEdit()
    } else if (event.key === 'Escape') {
      cancelEdit()
    }
  }

  return (
    <li className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm transition-colors sm:gap-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.text} 완료로 표시`}
        className="size-5 shrink-0 accent-indigo-600"
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          aria-label="할 일 수정"
          className="min-w-0 flex-1 rounded border border-indigo-400 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      ) : (
        <span
          onDoubleClick={startEditing}
          className={`min-w-0 flex-1 truncate text-sm ${
            todo.completed ? 'text-slate-400 line-through' : 'text-slate-900'
          }`}
        >
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          onClick={startEditing}
          aria-label={`${todo.text} 수정`}
          className="shrink-0 rounded px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 sm:text-sm"
        >
          수정
        </button>
      )}
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.text} 삭제`}
        className="shrink-0 rounded px-2 py-1 text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/40 sm:text-sm"
      >
        삭제
      </button>
    </li>
  )
}
