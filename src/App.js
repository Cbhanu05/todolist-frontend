import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

const API = process.env.REACT_APP_API_URL;

const fetchTodos = useCallback(async () => {
  const res = await axios.get(API);
  setTodos(res.data);
}, [API]);

useEffect(() => {
   fetchTodos();
 }, [fetchTodos]);

  const addTodo = async () => {
    if (!title) return;

    await axios.post(API, {
      title: title,
      completed: false,
    });

    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API}/${todo.id}`, {
      title: todo.title,
      completed: !todo.completed,
    });

    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const saveEdit = async (id) => {
    await axios.put(`${API}/${id}`, {
      title: editText,
      completed: todos.find((t) => t.id === id).completed,
    });

    setEditingId(null);
    setEditText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>✨ Todo List</h1>

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

                {editingId === t.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  <span
                    style={{
                      textDecoration: t.completed ? "line-through" : "none",
                      opacity: t.completed ? 0.6 : 1,
                    }}
                  >
                    {t.title}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", gap: "5px" }}>
                {editingId === t.id ? (
                  <button style={styles.addBtn} onClick={() => saveEdit(t.id)}>
                    Save
                  </button>
                ) : (
                  <button style={styles.addBtn} onClick={() => startEdit(t)}>
                    ✏️
                  </button>
                )}

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTodo(t.id)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "60px auto",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  deleteBtn: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "5px 8px",
    cursor: "pointer",
  },
};

export default App;