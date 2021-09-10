import { useState } from 'react';

const App = () => {
  /** Todoリスト */
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoId, setTodoId] = useState(0);

  const [filter, setFilter] = useState('notStarted');
  const [isEditable, setIsEditable] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [newTitle, setNewTitle] = useState('');

  /** 作成フォームの状態制御 */
  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value);
  }; /** 編集フォームの状態制御 */

  const handleEditFormChanges = (e) => {
    setNewTitle(e.target.value);
  };

  /** 入力欄をリセット（空欄にする） */
  const resetFormInput = () => {
    setTodoTitle('');
  };

  /** 編集フォーム表示 */
  const handleOpenEditForm = (index) => {
    setIsEditable(true);
    setEditIndex(index);
    setNewTitle(todos[index].title);
  };

  /** 編集フォームを閉じる */
  const handleCloseEditForm = () => {
    setIsEditable(false);
    setEditIndex();
  };

  /** Todo新規作成 */
  const handleAddTodo = () => {
    setTodos([
      ...todos,
      { id: todoId, title: todoTitle, status: 'notStarted' },
    ]);
    setTodoId(todoId + 1);
    resetFormInput();
  };

  /** Todo削除 */
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  /** Todo編集 */
  const handleEditTodo = () => {
    const newTodos = todos.map((todo) => ({ ...todo }));
    newTodos[editIndex].title = newTitle;
    setTodos(newTodos);
    setNewTitle('');
    handleCloseEditForm();
    setEditIndex();
  };

  /** Todoの状態変更 */
  const handleStatusChange = (id, e) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: e.target.value } : todo
    );
    setTodos(newTodos);
  };

  return (
    <>
      {!isEditable ? (
        /* 新規作成フォーム */
        <>
          <input
            type='text'
            label='タイトル'
            value={todoTitle}
            onChange={handleAddFormChanges}
          />
          <button onClick={handleAddTodo}>作成</button>
        </>
      ) : (
        /* 編集フォーム */
        <>
          <input
            type='text'
            label='新しいタイトル'
            value={newTitle}
            onChange={handleEditFormChanges}
          />
          <button onClick={handleEditTodo}>編集を保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </>
      )}

      <select value={filter} onChange={(e)=> setFilter(e.target.value)}>
        <option value='all'>すべて</option>
        <option value='notStarted'>未着手</option>
        <option value='inProgress'>作業中</option>
        <option value='done'>完了</option>
      </select>

      {/* Todoリスト */}
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo.id, e)}
            >
              <option value='notStarted'>未着手</option>
              <option value='inProgress'>作業中</option>
              <option value='done'>完了</option>
            </select>
            <button onClick={() => handleOpenEditForm(index)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
