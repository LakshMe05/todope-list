import React, { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import confetti from 'canvas-confetti'

const STORAGE_KEY = 'todope_tasks_v1'

export default function App() {
  const [tasks, setTasks] = useState([])

  // Load tasks on first render
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setTasks(JSON.parse(raw))
  }, [])

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(text, color) {
    if (!text.trim()) return
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      done: false,
      color: color || 'var(--accent)'
    }
    setTasks(prev => [newTask, ...prev])
  }

  function onToggleDone(id) {
    const task = tasks.find(t => t.id === id)

    // Confetti only when marking “done”
    if (task && !task.done) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function removeTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTasks(prev => prev.filter(t => !t.done))
  }

  const remaining = tasks.filter(t => !t.done).length

  return (
    <div className="app">
      <header>
        <h1>ToDope List</h1>
        <p className="subtitle">Tiny wins. Big vibes. ✨</p>
        <div className="meta">
          <div className="chip">Remaining: {remaining}</div>
          <div className="chip">Total: {tasks.length}</div>
        </div>
      </header>

      <main>
        <TaskInput onAdd={addTask} />
        <TaskList
          tasks={tasks}
          onToggle={onToggleDone}
          onRemove={removeTask}
        />
      </main>

      <footer>
        <button className="btn ghost" onClick={clearCompleted}>
          Clear completed
        </button>
        <p className="hint">Built for micro-wins — celebrate every tiny finish 💫</p>
      </footer>
    </div>
  )
}
