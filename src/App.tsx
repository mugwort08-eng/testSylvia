import { useCallback, useMemo, useState } from 'react'
import { FilterBar } from './components/FilterBar'
import { TodoFooter } from './components/TodoFooter'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
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
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <h1 className="text-2xl font-semibold">To-Do</h1>

        <TodoInput onAdd={(text) => dispatch({ type: 'ADD', text })} />

        <FilterBar filter={filter} onChange={setFilter} />

        <TodoList
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
