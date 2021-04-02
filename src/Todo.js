import React from "react";
import "./App.css";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  return (
    <div id="todo">
      <label class="checkbox">
        <input
          class="checkbox"
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        <div>{todo.name}</div>
      </label>
    </div>
  );
}
