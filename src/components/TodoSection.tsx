import { useCallback, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { todoReducer, type TodoAction } from '../todoReducer'
import type { Filter, Todo } from '../types'
import { FilterBar } from './FilterBar'
import { TodoFooter } from './TodoFooter'
import { TodoGroupedList } from './TodoGroupedList'
import { TodoInput } from './TodoInput'

const initialTodos: Todo[] = []

export function TodoSection() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', initialTodos)
  const [filter, setFilter] = useState<Filter>('all')

  const dispatch = useCallback(
    (action: TodoAction) => setTodos((prev) => todoReducer(prev, action)),
    [setTodos],
  )

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const remainingCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos])
  const hasCompleted = todos.some((todo) => todo.completed)

  return (
    <section className="flex w-full min-w-0 flex-col gap-5 rounded-xl bg-white/60 p-4 shadow-sm ring-1 ring-slate-200 sm:p-6 lg:flex-1">
      <h1 className="text-2xl font-bold tracking-tight text-slate-800">할 일</h1>

      <TodoInput onAdd={(text, timeOfDay) => dispatch({ type: 'ADD', text, timeOfDay })} />

      <FilterBar filter={filter} onChange={setFilter} />

      <TodoGroupedList
        todos={filteredTodos}
        onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
        onEdit={(id, text) => dispatch({ type: 'EDIT', id, text })}
        onDelete={(id) => dispatch({ type: 'DELETE', id })}
      />

      <TodoFooter
        remainingCount={remainingCount}
        hasCompleted={hasCompleted}
        onClearCompleted={() => dispatch({ type: 'CLEAR_COMPLETED' })}
      />
    </section>
  )
}
