import React, { useState, useEffect } from 'react';
import Plot from './components/Plot.js';

import './App.css';

function App() {
  const [response, setResponse] = useState('');
  
  const callAPI = () => {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => setResponse(res));
  }

  useEffect(() => {
    callAPI()
  });

  return (
    <div>
      <div className="header">
        DAVID-19
      </div>
      <div className="App-container">
        <p>{response}</p>
        <Plot />
        <div className="sentiment-legend" height='100px' width='50px'>
          <div className="sentiment-title">how people feel</div>
          <div className="sentiment-color-container">
            <div className="sentiment-color-swatch"></div>
            <div className="sentiment-color-name-container">
              <div className="sentiment-color-name">positive outlook</div>
              <div className="sentiment-color-name">neutral outlook</div>
              <div className="sentiment-color-name">negative outlook</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
