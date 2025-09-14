import AddBox from './Component/AddBox'
import Toolkit from './Component/Toolkit'
import { useState } from 'react'
import { useTodoStore } from '../store/todoStore'

const AddTodo = () => {
  const [text, setText] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text)
      setText('')ช
    }
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>เพิ่ม</button>
    </div>
  )
}

export default AddTodo
