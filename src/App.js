import { useEffect, useMemo, useState } from 'react';
import './App.css';
import StartScreen from './screens/StartScreen';
import RunScreen from './screens/RunScreen';
import NoSleep from 'nosleep.js';


// todo: running, map, reset
// todo: keep awake screen
function App() {
  const [screen, setScreen] = useState(0)
  const [direction, setDirection] = useState(null)
  const [enabled, setEnabled] = useState(false)
  const [alreadyEnabled, setAlreadyEnabled] = useState(false);

  const startScreen = <StartScreen
    onStart={(direction) => {
      setScreen(1)
      setDirection(direction)
      setEnabled(true)
    }} />

  const runScreen = (<RunScreen direction={direction} />)


  const screens = [startScreen,runScreen]

  // keep the screen awake
  const noSleep = useMemo(() => new NoSleep(), []);
  useEffect(() => {
      if (alreadyEnabled === enabled) {
          return;
      }

      if (enabled) {
          noSleep.enable();
      } else {
          noSleep.disable();
      }

      setAlreadyEnabled(enabled);
  }, [alreadyEnabled, enabled, noSleep]);

  return (
    <div className='App'>
      <header className='App-header'>
        {screens[screen]}
      </header>
    </div >
  );
}

export default App;
