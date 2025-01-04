import React, { useState, useEffect, createContext, useContext } from 'react';

const ActivityContext = createContext();

export function ActivityProvider({ children, stopwatchTime, broadcastTimeAddedEvent }){
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities
      ? JSON.parse(savedActivities)
      : [
        { id: 1, name: "SLEEP", totalTime: 0 },
        { id: 2, name: "WORK", totalTime: 0 },
        { id: 3, name: "GYM", totalTime: 0 },
      ];
  });

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  function addTimeToActivity(activityId) {
    if (stopwatchTime === 0) return;

    setActivities(prevActivities =>
      prevActivities.map((activity) =>
        activity.id === activityId ? (
          {
            ...activity,
            totalTime: activity.totalTime + stopwatchTime
          }
        ) : (
          activity
        )
      )
    );

    broadcastTimeAddedEvent();
  }

  function addNewActivity(newActivityName) {
    const newActivity = {
      id: Date.now(),
      name: newActivityName,
      totalTime: 0
    };

    setActivities((prevActivities) => [...prevActivities, newActivity]);
  }

  return (
    <ActivityContext.Provider value={{ 
      stopwatchTime, 
      activities, 
      setActivities, 
      addTimeToActivity,
      addNewActivity 
    }}>
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity() {
  return useContext(ActivityContext);
}