import React, { useState, useRef, useEffect,createContext } from 'react';

export const StopwatchContext = createContext();

function StopwatchProvider({ children }) {
  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem('stopwatchRunning');
    return savedIsRunning === 'true';
  });

  const [elapsedTime, setElapsedTime] = useState(() => {
    const savedStartTime = localStorage.getItem('stopwatchStartTime');
    const savedPauseTime = localStorage.getItem('stopwatchPauseTime');
    if (savedStartTime) {
      if (isRunning) {
        return Date.now() - savedStartTime;
      } else if (savedPauseTime) {
        return parseInt(savedPauseTime) - parseInt(savedStartTime);
      }
    }
    return 0;
  });

  const intervalIdRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('stopwatchRunning', isRunning);
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      localStorage.setItem('stopwatchStartTime', startTime);
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
  }

  function pause() {
    if (isRunning === true) {
      localStorage.setItem('stopwatchPauseTime', Date.now());
      setIsRunning(false);
    }
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    localStorage.removeItem('stopwatchRunning');
    localStorage.removeItem('stopwatchStartTime');
    localStorage.removeItem('stopwatchPauseTime');
  }

  return (
    <StopwatchContext.Provider value={{
      elapsedTime,
      start,
      pause,
      reset,
    }}>
      {children}
    </StopwatchContext.Provider>
  );
};

export default StopwatchProvider;