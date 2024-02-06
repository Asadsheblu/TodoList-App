import React from 'react';
import { useState } from 'react';

const Todo = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1', completed: false, priority: 'low' },
        { id: 2, text: 'Task 2', completed: false, priority: 'medium' },
        { id: 3, text: 'Task 3', completed: false, priority: 'high' }
      ]);
    return (
        <div className="App container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input type="text" v placeholder="Enter a new task" />
        <button>Add Task</button>
      </div>
      <select id="priority">
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
         
            <span>{task.text}</span>
            <button className='btn btn-primary' >Edit</button>
            <button className='btn btn-danger'>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    );
};

export default Todo;