import React, { useState, useEffect, useRef } from 'react';
import StopwatchTime from "./StopwatchTime.jsx";
import StopwatchControls from "./StopwatchControls.jsx";

function StopwatchMain({ onElapsedTimeUpdate, timeAddedEvent, receivedTimeAddedEvent }) {
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

  const startTimeRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    const startTime = localStorage.getItem('stopwatchStartTime');
    if (startTime && isRunning) {
      startTimeRef.current = parseInt(startTime);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stopwatchRunning', isRunning);
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      localStorage.setItem('stopwatchStartTime', startTimeRef.current);
      const getStartTimeRef = () => startTimeRef.current;
      intervalIdRef.current = setInterval(() => {
        const updatedTime = Date.now() - getStartTimeRef();
        setElapsedTime(updatedTime);
      }, 1000);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    onElapsedTimeUpdate(elapsedTime);
  }, [elapsedTime]);

  useEffect(() => {
    if (timeAddedEvent) {
      reset();
    }
    receivedTimeAddedEvent();
  }, [timeAddedEvent]);

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
    if (isRunning) {
      startTimeRef.current = Date.now();
      localStorage.setItem('stopwatchStartTime', Date.now());
    } else {
      localStorage.removeItem('stopwatchRunning');
      localStorage.removeItem('stopwatchStartTime');
    }
    localStorage.removeItem('stopwatchPauseTime');
  }

  return (
    <div className="stopwatch-main">
      <h3>Current Time</h3>
      <StopwatchTime
        elapsedTime={elapsedTime}
      />
      <StopwatchControls
        onStart={start}
        onPause={pause}
        onReset={reset}
        isRunning={isRunning}
      />
    </div>

  )
}

export default StopwatchMain;