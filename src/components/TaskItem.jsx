import React from 'react'

export default function TaskItem({ task, onToggle, onRemove }) {
  return (
    <li
      className={`task-item ${task.done ? 'done' : ''}`}
      style={{ borderLeftColor: task.color }}
    >
      <label className="left">
        <input
          type="checkbox"
          checked={task.done}
          onChange={onToggle}
        />
        <span className="text">{task.text}</span>
      </label>

      <div className="right">
        <button
          className="tiny"
          onClick={onRemove}
          aria-label="remove"
        >
          🗑️
        </button>
      </div>
    </li>
  )
}
