import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onRemove }) {
  if (!tasks.length) {
    return (
      <div className="empty">
        No tasks yet — add a tiny one to get started! 🌱
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onRemove={() => onRemove(task.id)}
        />
      ))}
    </ul>
  )
}

