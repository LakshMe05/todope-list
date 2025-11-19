import React, { useState } from 'react'

const COLORS = [
  '#FF9AA2', '#FFB7B2', '#FFDAC1',
  '#E2F0CB', '#B5EAD7', '#C7CEEA',
  '#FFD700', '#F4A261', 'var(--accent)'
]

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('')
  const [color, setColor] = useState('var(--accent)')

  function submit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, color)
    setText('')
  }

  return (
    <form className="task-input" onSubmit={submit}>
      <input
        placeholder="What do you wanna do? (tiny tasks win!)"
        value={text}
        onChange={e => setText(e.target.value)}
        maxLength={140}
      />

      <div className="controls">
        <div className="color-swatches">
          {COLORS.map(c => (
            <button
              key={c}
              type="button"
              className={'swatch' + (c === color ? ' active' : '')}
              style={{ background: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <button className="btn" type="submit">
          Add
        </button>
      </div>
    </form>
  )
}
