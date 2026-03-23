import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:8080/api/todos";

  const toggleTodo = async (todo) => {
  await axios.put(`${API}/${todo.id}`, {
    title: todo.title,
    completed: !todo.completed,
  });

  fetchTodos();
};

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
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List</h1>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
        />
        <button style={styles.addBtn} onClick={addTodo}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((t) => (
          <li key={t.id} style={styles.listItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t)}
              />

              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  opacity: t.completed ? 0.6 : 1,
                }}
              >
                {t.title}
              </span>

            </div>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteTodo(t.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  heading: {
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
export default App;