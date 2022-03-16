import React, {useState} from 'react'
import './App.css';
import Menu from './Components/Menu/Menu.js'
import './Styles/global.css'

function App() {
  const [setup, setSetup] = useState(true)
  return (
    <div className="App">
      { setup ? 
        <Menu changeState={setSetup} /> : 
        <h1></h1> }
    </div>
  );
}

export default App;
