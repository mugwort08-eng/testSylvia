import type { ClassEntry } from './types'

export type ClassAction =
  | { type: 'ADD'; period: number; grade: number; classNo: number }
  | { type: 'DELETE'; id: string }

export function classReducer(state: ClassEntry[], action: ClassAction): ClassEntry[] {
  switch (action.type) {
    case 'ADD': {
      const newEntry: ClassEntry = {
        id: crypto.randomUUID(),
        period: action.period,
        grade: action.grade,
        classNo: action.classNo,
      }
      return [...state, newEntry]
    }
    case 'DELETE':
      return state.filter((entry) => entry.id !== action.id)
    default:
      return state
  }
}
