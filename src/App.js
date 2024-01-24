import { useState } from 'react';
import './App.css';
import StartScreen from './screens/StartScreen';
import RunScreen from './screens/RunScreen';


// todo: running, map, reset
// todo: keep awake screen
function App() {
  const [screen, setScreen] = useState(0)
  const [direction, setDirection] = useState(null)

  const startScreen = <StartScreen
    onStart={(direction) => {
      setScreen(1)
      setDirection(direction)
    }} />

  const runScreen = (<RunScreen direction={direction} />)


  const screens = [startScreen,runScreen]

  return (
    <div className='App'>
      <header className='App-header'>
        {screens[screen]}
      </header>
    </div >
  );
}

export default App;
