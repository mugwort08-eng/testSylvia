import type { TimeOfDay, Todo } from '../types'
import { TodoList } from './TodoList'

interface TodoGroupedListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

const GROUPS: { key: TimeOfDay; label: string }[] = [
  { key: 'morning', label: '오전' },
  { key: 'afternoon', label: '오후' },
]

export function TodoGroupedList({ todos, onToggle, onEdit, onDelete }: TodoGroupedListProps) {
  if (todos.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-400">표시할 할 일이 없습니다.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {GROUPS.map(({ key, label }) => (
        <div key={key} className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</h3>
          <TodoList
            todos={todos.filter((todo) => todo.timeOfDay === key)}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            emptyMessage={`${label}에 할 일이 없습니다.`}
          />
        </div>
      ))}
    </div>
  )
}
