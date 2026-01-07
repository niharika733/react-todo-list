import { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState(""); // Stores what you are typing
  const [todos, setTodos] = useState([]); // Stores the list of tasks

  // Adds a task to the list
  const addTask = (e) => {
    e.preventDefault(); // Prevents the browser from refreshing
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(), // Unique ID for each item
      text: task,
      completed: false
    };

    setTodos([...todos, newTodo]); // Adds the new task to the array
    setTask(""); // Resets the input box
  };

  // Toggles the "completed" status
  const toggleComplete = (id) => {
    setTodos(todos.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Deletes a task
  const deleteTask = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      
      <form onSubmit={addTask} className="input-section">
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item.id} className={item.completed ? "todo-item done" : "todo-item"}>
            <div className="task-text" onClick={() => toggleComplete(item.id)}>
              <input type="checkbox" checked={item.completed} readOnly />
              <span>{item.text}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;