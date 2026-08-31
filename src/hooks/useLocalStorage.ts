import { useEffect, useState } from 'react'

function readValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue

  try {
    const stored = window.localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : initialValue
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readValue(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore write failures (e.g. storage full or unavailable)
    }
  }, [key, value])

  return [value, setValue] as const
}
