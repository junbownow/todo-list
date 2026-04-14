import { useState } from "react";

function App() {
  // 必要なstateの準備
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);

  // 追加ボタンをクリックした時の処理
  const handleAdd = () => {
    if (inputText === '') return; // 入力欄がからの時は処理しない
    setTodos([...todos, inputText]);
    setInputText('');
  }

  // 削除ボタンをクリックした時の処理
  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>ToDoリスト</h1>

      {/* 入力エリア */}
      <input
        type="text"
        name="入力エリア"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ToDoを入力してください"
      />
      <button onClick={handleAdd}>追加</button>

      {/* ToDoエリア */}
      {todos.length > 0 && (
      <ul>
        {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          <button onClick={() => handleDelete(index)}>削除</button>
        </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default App;