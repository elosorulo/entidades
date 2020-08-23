import React from 'react';
import Frame from './components/Frame';
import { Sound } from './components/Sound';

function App() {
  return (
    <div className="App">
      <Sound>
        <Frame/>
      </Sound>
    </div>
  );
}

export default App;
