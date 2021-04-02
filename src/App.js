import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    //clear out input
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <input class="input" ref={todoNameRef} type="text" placeholder="Do..." />
      <button id="addTodo" class="buttons" onClick={handleAddTodo}>
        Add Todo
      </button>
      <button id="clearButton" class="buttons" onClick={handleClearTodos}>
        Clear Completed
      </button>
      <div class="text">
        <b>{todos.filter((todo) => !todo.complet).length}</b> tasks left
      </div>
      <div class="todos">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </>
  );
}

export default App;
