// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCounter(0);
  };

  const handleChange = (event) => {
    setIncrementValue(Number(event.target.value));
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCounter((prevCounter) => prevCounter + incrementValue);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, incrementValue]);

  return (
    <div className="App">
      <h1>Counter: {counter}</h1>
      <div>
        <label htmlFor="increment">Increment Value:</label>
        <input 
          type="number" 
          id="increment" 
          value={incrementValue} 
          onChange={handleChange} 
        />
      </div>
      <br/>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
