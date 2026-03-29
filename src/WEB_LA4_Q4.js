import React, { useState } from 'react';

const WEB_LA4_Q4 = () => {
  // Multiple useState Hooks for individual subject marks
  const [subject1, setSubject1] = useState("");
  const [subject2, setSubject2] = useState("");
  const [subject3, setSubject3] = useState("");
  
  // State for calculated results
  const [average, setAverage] = useState(null);
  const [grade, setGrade] = useState("");

  const calculateGrade = () => {
    // Type conversion using Number()
    const s1 = Number(subject1);
    const s2 = Number(subject2);
    const s3 = Number(subject3);

    // Arithmetic operations
    const avg = (s1 + s2 + s3) / 3;
    setAverage(avg.toFixed(2));

    // Conditional rendering logic (if-else if-else) using Comparison operators
    let calculatedGrade = "";
    if (avg >= 90) {
      calculatedGrade = "S (Outstanding)";
    } else if (avg >= 80) {
      calculatedGrade = "A (Excellent)";
    } else if (avg >= 70) {
      calculatedGrade = "B (Very Good)";
    } else if (avg >= 60) {
      calculatedGrade = "C (Good)";
    } else if (avg >= 50) {
      calculatedGrade = "D (Pass)";
    } else {
      calculatedGrade = "F (Fail)";
    }
    setGrade(calculatedGrade);
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

      <h2 style={{ color: 'Teal' }}>Grade Calculator</h2>

      {/* Controlled Components */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <input 
          type="number" 
          placeholder="Subject 1 Marks" 
          value={subject1} 
          onChange={(e) => setSubject1(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        <input 
          type="number" 
          placeholder="Subject 2 Marks" 
          value={subject2} 
          onChange={(e) => setSubject2(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        <input 
          type="number" 
          placeholder="Subject 3 Marks" 
          value={subject3} 
          onChange={(e) => setSubject3(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        
        <button 
          onClick={calculateGrade} 
          style={{ 
            marginTop: '10px', 
            padding: '10px 20px', 
            backgroundColor: 'MidnightBlue', 
            color: 'White', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Calculate Result
        </button>
      </div>

      {/* Conditional Rendering of Result */}
      {average !== null && (
        <div style={{ marginTop: '25px', padding: '15px', backgroundColor: 'LightGrey', borderRadius: '10px' }}>
          <p><strong>Average Marks:</strong> {average}</p>
          <h3>Grade: <span style={{ color: grade.includes('F') ? 'FireBrick' : 'DarkGreen' }}>{grade}</span></h3>
        </div>
      )}
    </div>
  );
};

export default WEB_LA4_Q4;