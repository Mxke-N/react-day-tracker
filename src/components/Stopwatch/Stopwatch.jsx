import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
    // Initialize state from localStorage if available
    const [isRunning, setIsRunning] = useState(() => {
        const savedIsRunning = localStorage.getItem('stopwatchRunning');
        return savedIsRunning === 'true';
    });
    
    const [elapsedTime, setElapsedTime] = useState(() => {
        const savedStartTime = localStorage.getItem('stopwatchStartTime');
        const savedPauseTime = localStorage.getItem('stopwatchPauseTime');
        
        if (savedStartTime) {
            if (isRunning) { 
                return Date.now() - parseInt(savedStartTime); 
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
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);


    function start() {
        if (isRunning === false) {
            startTimeRef.current = Date.now() - elapsedTime;
            localStorage.setItem('stopwatchStartTime', startTimeRef.current);
            setIsRunning(true);
        }
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

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className='stopwatch-container'>
            <div className='display'>
                {formatTime()}
            </div>
            <div className='controls'>
                <button className='start-button' onClick={start}>Start</button>
                <button className='pause-button' onClick={pause}>Pause</button>
                <button className='reset-button' onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;