import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialTasks = [
  { id: 1, text: 'Task 1', completed: false, priority: 'low' },
  { id: 2, text: 'Task 2', completed: false, priority: 'medium' },
  { id: 3, text: 'Task 3', completed: false, priority: 'high' }
];

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // If no tasks are stored in localStorage, set initialTasks as default
      setTasks(initialTasks);
    }
  }, []);

  const [newTaskText, setNewTaskText] = useState('');

  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        text: newTaskText,
        completed: false,
        priority: 'low'
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTaskText('');
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  // Function to delete a task with confirmation
  const deleteTask = (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  return (
    <div className="App container">
      <h1>Todo List</h1>
      <div className="task-management">
        <div className="d-flex mb-4">
          <input
            className='form-control w-75'
            type="text"
            placeholder="Enter new task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />
          <button className='btn btn-success' onClick={addTask}>Add Task</button>
        </div>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={task.completed} />
            <span>{task.text}</span>
            <button className='btn btn-primary'>Edit</button>
            <button onClick={() => deleteTask(task.id)} className='btn btn-danger'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
