import { useState } from "react"

const App = () => {
  /** Todoリスト */
  const [todos, setTodos] = useState([])
  const [todoTitle, setTodoTitle] = useState("")
  const [todoId, setTodoId] = useState(0)

  /** 作成フォームの状態制御 */
	const handleAddFormChanges = e => {
    setTodoTitle(e.target.value)
  }
  /** 入力欄をリセット（空欄にする） */
  const resetFormInput = () => {
		setTodoTitle("")
	}

	/** Todo新規作成 */
	const addTodo = () => {
    setTodos([　...todos,　{ id: todoId, title: todoTitle }　])
    setTodoId(todoId + 1)
    resetFormInput()
  }
  /** Todo削除 */
  const deleteTodo = targetTodo => {
  	setTodos(todos.filter(todo => todo !== targetTodo))
  }

  return (
    <>
    	{/* 新規作成フォーム */}
			<div>
				<input
					type="text"
          label="タイトル"
          value={todoTitle}
          onChange={handleAddFormChanges}
				/>
				<button onClick={addTodo}>作成</button>
			</div>

      {/* Todoリスト */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App