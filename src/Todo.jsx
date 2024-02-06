import React from 'react';

const Todo = () => {
    return (
        <div className="App container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input type="text" v placeholder="Enter a new task" />
        <button>Add Task</button>
      </div>
      </div>
    );
};

export default Todo;