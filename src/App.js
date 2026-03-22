import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:8080/api/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title) return;

    await axios.post(API, {
      title: title,
      completed: false,
    });

    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;