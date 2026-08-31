import { useCallback } from 'react'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { useLocalStorage } from './hooks/useLocalStorage'
import { todoReducer, type TodoAction } from './todoReducer'
import type { Todo } from './types'

const initialTodos: Todo[] = []

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', initialTodos)
  const dispatch = useCallback(
    (action: TodoAction) => setTodos((prev) => todoReducer(prev, action)),
    [setTodos],
  )

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <h1 className="text-2xl font-semibold">To-Do</h1>

        <TodoInput onAdd={(text) => dispatch({ type: 'ADD', text })} />

        <TodoList
          todos={todos}
          onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
          onEdit={(id, text) => dispatch({ type: 'EDIT', id, text })}
          onDelete={(id) => dispatch({ type: 'DELETE', id })}
        />
      </div>
    </div>
  )
}

export default App
