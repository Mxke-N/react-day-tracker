import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning])

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function pause() {
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60) % 24);
        let minutes = Math.floor(elapsedTime / (1000*60) % 60);
        let seconds = Math.floor(elapsedTime / (1000)%60);

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