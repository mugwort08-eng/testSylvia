import { useCallback, useMemo } from 'react'
import { classReducer, type ClassAction } from '../classReducer'
import { getClassesStorageKey, getTodayDateString } from '../dateUtils'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { ClassEntry } from '../types'
import { ClassRow } from './ClassRow'
import { ClassScheduleForm } from './ClassScheduleForm'

const initialClasses: ClassEntry[] = []

export function TodayClasses() {
  const today = useMemo(() => getTodayDateString(), [])
  const [classes, setClasses] = useLocalStorage<ClassEntry[]>(
    getClassesStorageKey(today),
    initialClasses,
  )

  const dispatch = useCallback(
    (action: ClassAction) => setClasses((prev) => classReducer(prev, action)),
    [setClasses],
  )

  const sortedClasses = useMemo(
    () => [...classes].sort((a, b) => a.period - b.period),
    [classes],
  )

  return (
    <section className="flex w-full min-w-0 flex-col gap-4 rounded-xl bg-white/60 p-4 shadow-sm ring-1 ring-slate-200 sm:p-6 lg:flex-1">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">오늘의 수업</h1>
        <p className="text-sm text-slate-500">{today}</p>
      </div>

      <ClassScheduleForm
        onAdd={(period, grade, classNo) => dispatch({ type: 'ADD', period, grade, classNo })}
      />

      {sortedClasses.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">아직 입력된 수업이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {sortedClasses.map((entry) => (
            <ClassRow
              key={entry.id}
              entry={entry}
              onDelete={(id) => dispatch({ type: 'DELETE', id })}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
