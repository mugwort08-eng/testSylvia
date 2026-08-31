export interface Todo {
  id: string
  text: string
  completed: boolean
}

export type Filter = 'all' | 'active' | 'completed'

export interface ClassEntry {
  id: string
  period: number
  grade: number
  classNo: number
}
