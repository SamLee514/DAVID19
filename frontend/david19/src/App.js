import React from 'react';
import Plot from './components/Plot.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-container">
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
