import type { Todo } from './types'

export type TodoAction =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'EDIT'; id: string; text: string }
  | { type: 'DELETE'; id: string }
  | { type: 'CLEAR_COMPLETED' }

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD': {
      const text = action.text.trim()
      if (!text) return state
      const newTodo: Todo = { id: crypto.randomUUID(), text, completed: false }
      return [...state, newTodo]
    }
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    case 'EDIT': {
      const text = action.text.trim()
      if (!text) return state
      return state.map((todo) => (todo.id === action.id ? { ...todo, text } : todo))
    }
    case 'DELETE':
      return state.filter((todo) => todo.id !== action.id)
    case 'CLEAR_COMPLETED':
      return state.filter((todo) => !todo.completed)
    default:
      return state
  }
}
