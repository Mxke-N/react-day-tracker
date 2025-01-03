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
      intervalIdRef.current = setInterval(() => {
        const updatedTime = Date.now() - startTimeRef.current;
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
      setElapsedTime(0);
      startTimeRef.current = Date.now();
      localStorage.setItem('stopwatchStartTime', Date.now());
      localStorage.removeItem('stopwatchPauseTime');
      receivedTimeAddedEvent();
    }
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
    setIsRunning(false);
    localStorage.removeItem('stopwatchRunning');
    localStorage.removeItem('stopwatchStartTime');
    localStorage.removeItem('stopwatchPauseTime');
  }

  return (
    <div className="stopwatch-main">
      <h4>Current Time</h4>
      <StopwatchTime
        elapsedTime={elapsedTime}
      />
      <StopwatchControls
        onStart={start}
        onPause={pause}
        onReset={reset}
      />
    </div>

  )
}

export default StopwatchMain;