import { useState } from 'react';

const App = () => {
  /** Todoリスト */
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoId, setTodoId] = useState(0);
  const [state, setState] = useState('未着手');

  const [isEditable, setIsEditable] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [newTitle, setNewTitle] = useState('');

  /** 作成フォームの状態制御 */
  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value);
  };

  const handleEditFormChanges = (e) => {
    setNewTitle(e.target.value);
  };

  /** 入力欄をリセット（空欄にする） */
  const resetFormInput = () => {
    setTodoTitle('');
  };

  /** 編集フォーム表示 */
  const openEditForm = (index) => {
    setIsEditable(true);
    setEditIndex(index);
    setNewTitle(todos[index].title);
  };

  /** 編集フォームを閉じる */
  const closeEditForm = () => {
    setIsEditable(false);
    setEditIndex();
  };

  /** Todo新規作成 */
  const addTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle, todoState: state }]);
    setTodoId(todoId + 1);
    resetFormInput();
  };

  /** Todo削除 */
  const deleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  /** Todo編集 */
  const editTodo = () => {
    const newTodos = todos.map((todo) => ({ ...todo }));
    newTodos[editIndex].title = newTitle;
    setTodos(newTodos);
    setNewTitle('');
    closeEditForm();
    setEditIndex();
  };

  /** Todoの状態変更 */
  const changeState = (targetTodo) => {

  };

  return (
    <>
      {(() => {
        if (!isEditable) {
          /* 新規作成フォーム */
          return (
            <>
              <input
                type='text'
                label='タイトル'
                value={todoTitle}
                onChange={handleAddFormChanges}
              />
              <button onClick={addTodo}>作成</button>
            </>
          );
        } else {
          /* 編集フォーム */
          return (
            <>
              <input
                type='text'
                label='新しいタイトル'
                value={newTitle}
                onChange={handleEditFormChanges}
              />
              <button onClick={editTodo}>編集を保存</button>
              <button onClick={closeEditForm}>キャンセル</button>
            </>
          );
        }
      })()}

      {/* Todoリスト */}
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => changeState(todo)}>{state}</button>
            <button onClick={() => openEditForm(index)}>編集</button>
            <button onClick={() => deleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
