import React, { useState } from 'react';

const WEB_LA4_Q5 = () => {
  // Multiple useState Hooks
  const [taskInput, setTaskInput] = useState(""); // String state for the input field
  const [todoList, setTodoList] = useState([]);   // Array state for the list of tasks

  // Arrow function to handle adding a task
  const addTask = () => {
    if (taskInput.trim() !== "") {
      // Spread operator used for array immutability
      setTodoList([...todoList, taskInput]);
      
      // Clearing the input (State update triggers re-render)
      setTaskInput(""); 
    }
  };

  return (
    <div style={{ 
      border: '3px solid DarkSlateGrey', 
      padding: '30px', 
      borderRadius: '20px', 
      backgroundColor: 'GhostWhite',
      maxWidth: '450px',
      margin: '40px auto',
      fontFamily: 'Verdana',
      textAlign: 'center'
    }}>
      {/* Student Identification Header */}
      <div style={{ borderBottom: '2px solid Silver', marginBottom: '20px', paddingBottom: '10px' }}>
        <h3 style={{ margin: '0', color: 'MidnightBlue' }}>Lab Assessment 4</h3>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>NAME: MAYUR R KENI</p>
        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>REG NO: 24BCE0686</p>
      </div>

      <h2 style={{ color: 'Teal' }}>Dynamic To-Do List</h2>

      {/* Controlled Component */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={taskInput} 
          onChange={(e) => setTaskInput(e.target.value)} 
          placeholder="Enter a new task..."
          style={{ padding: '10px', width: '70%', borderRadius: '5px', border: '1px solid Grey' }}
        />
        <button 
          onClick={addTask} 
          style={{ 
            padding: '10px', 
            marginLeft: '5px', 
            backgroundColor: 'Indigo', 
            color: 'White', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Add
        </button>
      </div>

      {/* Dynamic List Rendering */}
      <ul style={{ listStyleType: 'none', padding: '0', textAlign: 'left' }}>
        {todoList.map((task, index) => (
          <li 
            key={index} 
            style={{ 
              padding: '10px', 
              backgroundColor: 'WhiteSmoke', 
              marginBottom: '5px', 
              borderRadius: '5px', 
              borderLeft: '5px solid Teal',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.05)'
            }}
          >
            {task}
          </li>
        ))}
      </ul>
      
      {todoList.length === 0 && <p style={{ color: 'Grey' }}>No tasks added yet!</p>}
    </div>
  );
};

export default WEB_LA4_Q5;