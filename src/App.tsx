import { useCallback, useMemo, useState } from 'react'
import { FilterBar } from './components/FilterBar'
import { TodoFooter } from './components/TodoFooter'
import { TodoGroupedList } from './components/TodoGroupedList'
import { TodoInput } from './components/TodoInput'
import { useLocalStorage } from './hooks/useLocalStorage'
import { todoReducer, type TodoAction } from './todoReducer'
import type { Filter, Todo } from './types'

const initialTodos: Todo[] = []

function App() {
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
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:py-12">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-xl bg-white/60 p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <h1 className="text-center text-2xl font-bold tracking-tight text-slate-800">To-Do</h1>

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
      </div>
    </div>
  )
}

export default App
