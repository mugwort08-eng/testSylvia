import { useState, type FormEvent } from 'react'

interface ClassScheduleFormProps {
  onAdd: (period: number, grade: number, classNo: number) => void
}

const PERIODS = [1, 2, 3, 4, 5, 6, 7]

export function ClassScheduleForm({ onAdd }: ClassScheduleFormProps) {
  const [period, setPeriod] = useState('1')
  const [grade, setGrade] = useState('')
  const [classNo, setClassNo] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const gradeNum = Number(grade)
    const classNoNum = Number(classNo)
    if (!grade || !classNo || !Number.isInteger(gradeNum) || !Number.isInteger(classNoNum)) return
    if (gradeNum <= 0 || classNoNum <= 0) return

    onAdd(Number(period), gradeNum, classNoNum)
    setGrade('')
    setClassNo('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="class-period" className="text-xs font-medium text-slate-500">
          교시
        </label>
        <select
          id="class-period"
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className="rounded-md border border-slate-300 px-2 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          {PERIODS.map((p) => (
            <option key={p} value={p}>
              {p}교시
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="class-grade" className="text-xs font-medium text-slate-500">
          학년
        </label>
        <input
          id="class-grade"
          type="number"
          min={1}
          inputMode="numeric"
          value={grade}
          onChange={(event) => setGrade(event.target.value)}
          placeholder="학년"
          className="w-20 rounded-md border border-slate-300 px-2 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="class-no" className="text-xs font-medium text-slate-500">
          반
        </label>
        <input
          id="class-no"
          type="number"
          min={1}
          inputMode="numeric"
          value={classNo}
          onChange={(event) => setClassNo(event.target.value)}
          placeholder="반"
          className="w-20 rounded-md border border-slate-300 px-2 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      <button
        type="submit"
        aria-label="수업 추가"
        className="shrink-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!grade || !classNo}
      >
        추가
      </button>
    </form>
  )
}
