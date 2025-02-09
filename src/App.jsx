import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './App.css';

function App() {
  const [wishes, setWishes] = useState(['']);

  const addWish = () => {
    setWishes([...wishes, '']);
  };

  const updateWish = (index, value) => {
    const newWishes = [...wishes];
    newWishes[index] = value;
    setWishes(newWishes);
  };

  const generatePDF = async () => {
    try {
      const response = await fetch('/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishes }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wish-card.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to generate PDF:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  return (
    <div className="App">
      <h1>Wish Card Generator</h1>
      {wishes.map((wish, index) => (
        <div key={index} className="wish-container">
          <label>Wish {index + 1}:</label>
          <ReactQuill value={wish} onChange={(value) => updateWish(index, value)} />
        </div>
      ))}
      <button onClick={addWish}>Add Wish</button>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default App;
