import React, { useEffect, useState } from 'react';

const initialTasks = [
  { id: 1, text: 'Task 1', completed: false, priority: 'low' },
  { id: 2, text: 'Task 2', completed: false, priority: 'medium' },
  { id: 3, text: 'Task 3', completed: false, priority: 'high' }
];

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

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
      <div>Total Tasks: {totalTasks}</div>
      <div>Completed Tasks: {completedTasks}</div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span>{task.text}</span>
            <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
