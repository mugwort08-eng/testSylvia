import type { Todo } from '../types'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
  emptyMessage?: string
}

export function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
  emptyMessage = '표시할 할 일이 없습니다.',
}: TodoListProps) {
  if (todos.length === 0) {
    return <p className="py-6 text-center text-sm text-slate-400">{emptyMessage}</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}
