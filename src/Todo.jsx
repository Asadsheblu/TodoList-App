import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Initial tasks data
const initialTasks = [
  { id: 1, text: 'Task 1', completed: false, priority: 'low' },
  { id: 2, text: 'Task 2', completed: false, priority: 'medium' },
  { id: 3, text: 'Task 3', completed: false, priority: 'high' }
];

const Todo = () => {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);

  // Add a new task
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
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Store tasks in localStorage
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Store tasks in localStorage
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Store tasks in localStorage
    }
  };

  // Open edit modal with task details
  const openEditModal = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditTaskText(taskText);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditTaskId(null);
    setEditTaskText('');
    setIsEditModalOpen(false);
  };

  // Update task with edited text
  const updateTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editTaskId ? { ...task, text: editTaskText } : task
    );
    setTasks(updatedTasks);
    setIsEditModalOpen(false);
    setEditTaskId(null);
    setEditTaskText('');
    toast.success('Task updated successfully');
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Store tasks in localStorage
  };

  // Count total tasks and completed tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  // Render the component
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
      <div className="task-counters">
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span>{task.text}</span>
            <button className='btn btn-primary' onClick={() => openEditModal(task.id, task.text)}>Edit</button>
            <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <input className='form-control'
              type="text"
              value={editTaskText}
              onChange={(e) => setEditTaskText(e.target.value)}
            />
            <button className='btn btn-primary mt-2 mb-2' onClick={updateTask}>Update Task</button>
            <button className='btn btn-danger' onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
