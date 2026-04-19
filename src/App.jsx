import { useEffect, useState } from "react";
import './App.css';

function App() {
  // ① 初期値にlocalStorageのデータを使う
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // ② todosが変わるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 追加
  const handleAdd = () => {
    if (inputText.trim() === '') return setInputText('');
    setTodos([...todos, { id: Date.now(), text: inputText, completed: false }]);
    setInputText('');
  }

  // 削除
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // 完了チェック
  const handleToggle = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  return (
    <div className="container">
      <h1 className="title">ToDoアプリ</h1>

      {/* 入力エリア */}
      <div className="input-area">
        <input
          type="text"
          name="入力エリア"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="ToDoを入力してください"
        />
        <button onClick={handleAdd}>追加</button>
      </div>

      {/* ToDoリスト：1件以上ある時だけ表示 */}
      {todos.length > 0 && (
      <ul className="todo-list"  >
        {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            name="ToDoリスト選択"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
          />
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
          <button onClick={() => handleDelete(todo.id)}>削除</button>
        </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default App;