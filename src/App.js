import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from local storage at initial render
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState('');

  useEffect(() => {
    // Save tasks to local storage whenever tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    $('.list-group-item').hover(
      function() {
        $(this).css('background-color', '#f8bbd0'); 
      }, function() {
        $(this).css('background-color', '#8423a1'); 
      }
    );
  }, [tasks]);
  
  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const updateTask = (index) => {
    const newTask = prompt('Update the task:', tasks[index]);
    if (newTask) {
      const newTasks = tasks.map((item, i) => (i === index ? newTask : item));
      setTasks(newTasks);
    }
  };

  return (
    <div style={{ backgroundColor: '#4c0557', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <div className="gradient-bg p-4 rounded">
            <h1 className="text-center mb-4 text-white">To-Do List App</h1>
            <h2 className="text-center mb-4 text-white">Get Things Done!</h2>
              <div className="header-custom d-flex justify-content-between align-items-center mb-3">
                <input
                  type="text"
                  className="form-control input-custom me-2"
                  placeholder="What is the task today?"
                  id="taskInput"
                  onChange={(e) => setTask(e.target.value)}
                />
                <button className="btn btn-dark btn-sm px-3 border-2 rounded-pill" onClick={addTask}>
                  Add Task
                </button>
              </div>
              <ul className="list-group bg-light">
                {tasks.map((item, index) => (
                  <li key={index} className="list-group-item list-item-custom d-flex justify-content-between align-items-center text-white "  style={{ backgroundColor: '#8423a1' }} >
                    <input type="checkbox" />
                    {item}
                    <button className="btn button-custom" onClick={() => updateTask(index)}>
                      ✏️
                    </button>
                    <button className="btn button-custom" onClick={() => deleteTask(index)}>
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
