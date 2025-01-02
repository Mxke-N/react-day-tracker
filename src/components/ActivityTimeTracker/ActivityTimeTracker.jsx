import React, { useState, useEffect, useRef } from 'react';
import Stopwatch from '../Stopwatch/Stopwatch.jsx';
import ActivityList from '../ActivityList/ActivityList.jsx';

function ActivityTimeTracker() {
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

    const [activities, setActivities] = useState(() => {
        const savedActivities = localStorage.getItem('activities');
        return savedActivities ? JSON.parse(savedActivities) : [
            { id: 1, name: "SLEEP", totalTime: 0 },
            { id: 2, name: "WORK", totalTime: 0 },
            { id: 3, name: "GYM", totalTime: 0 },
        ];
    });

    const startTimeRef = useRef(null);
    const intervalIdRef = useRef(null);

    // Initialize startTimeRef from localStorage if it was running before
    useEffect(() => {
        const startTime = localStorage.getItem('stopwatchStartTime');
        if (startTime && isRunning) {
            startTimeRef.current = parseInt(startTime);
        }
    }, []);

    // Handle timer and localStorage for running state
    useEffect(() => {
        localStorage.setItem('stopwatchRunning', isRunning);

        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;
            localStorage.setItem('stopwatchStartTime', startTimeRef.current);
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 1000);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    // Save activities to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);

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
    }  

    function addTimeToActivity(activityId) {
        if (elapsedTime === 0) return;

        setActivities(prevActivities =>
            prevActivities.map(activity =>
              activity.id === activityId
                ? { ...activity, totalTime: activity.totalTime + elapsedTime }
                : activity
            )
        );

        setElapsedTime(0);
        startTimeRef.current = Date.now();
        localStorage.setItem('stopwatchStartTime', Date.now());
        localStorage.removeItem('stopwatchPauseTime');
    }

    return (
        <div className='activity-time-tracker'>
            <Stopwatch 
                elapsedTime={elapsedTime}
                onStart={start}
                onPause={pause}
                onReset={reset}
            />
            <ActivityList 
                activities={activities} 
                addTimeToActivity={addTimeToActivity} 
            />
        </div>
    )
}

export default ActivityTimeTracker;