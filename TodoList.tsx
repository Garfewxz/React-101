import { useTodoStore } from '../store/todoStore'
import TodoItem from './TodoItem'

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos)

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} />
      ))}
    </ul>
  )
}

export default TodoList
