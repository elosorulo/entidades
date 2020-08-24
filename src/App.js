import React from 'react';
import Frame from './components/Frame';
import { Sound } from './components/Sound';
import InitialPage from './components/layout/pages/InitialPage';
import GlobalStyle from './style/GlobalStyle';

function App() {

  const [started, setStarted] = React.useState(false);
  console.log(started);
  return (
    <div className="App">
      <GlobalStyle/>
      <Sound>
        {
          started ? <Frame/> : <InitialPage started={started} start={() => setStarted(true)}/>
        }
      </Sound>
    </div>
  );
}

export default App;
