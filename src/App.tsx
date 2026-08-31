import { TodayClasses } from './components/TodayClasses'
import { TodoSection } from './components/TodoSection'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 lg:flex-row lg:items-start">
        <TodayClasses />
        <TodoSection />
      </div>
    </div>
  )
}

export default App
