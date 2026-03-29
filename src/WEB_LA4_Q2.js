import React, { useState } from 'react';

const WEB_LA4_Q2 = () => {
  // useState Hook for state management
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);

  // Arrow functions for event handling
  const handleAddition = () => {
    // Type conversion using Number()
    setResult(Number(num1) + Number(num2));
  };

  const handleSubtraction = () => {
    setResult(Number(num1) - Number(num2));
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

      <h2 style={{ color: 'Teal' }}>Basic Calculator</h2>

      {/* Controlled Components (inputs tied to state) */}
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="number" 
          value={num1} 
          onChange={(e) => setNum1(e.target.value)} 
          placeholder="Enter first number"
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid Grey' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="number" 
          value={num2} 
          onChange={(e) => setNum2(e.target.value)} 
          placeholder="Enter second number"
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid Grey' }}
        />
      </div>

      {/* Operation Buttons */}
      <button onClick={handleAddition} style={{ padding: '10px 20px', backgroundColor: 'ForestGreen', color: 'White', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
        Add (+)
      </button>
      <button onClick={handleSubtraction} style={{ padding: '10px 20px', backgroundColor: 'FireBrick', color: 'White', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Subtract (-)
      </button>

      {/* Result Display */}
      <div style={{ marginTop: '25px', padding: '15px', backgroundColor: 'LightGrey', borderRadius: '10px' }}>
        <h3 style={{ margin: '0' }}>Result: <span style={{ color: 'DarkBlue' }}>{result}</span></h3>
      </div>
    </div>
  );
};

export default WEB_LA4_Q2;