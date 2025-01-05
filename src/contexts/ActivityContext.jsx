import React, { useState, useEffect, createContext, useContext } from 'react';

const ActivityContext = createContext();

export function ActivityProvider({ children, stopwatchTime, broadcastTimeAddedEvent }) {
  const [option, setOption] = useState(null);

  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities
      ? JSON.parse(savedActivities)
      : [
        { id: 1, name: "SLEEP", totalTime: 9000000, yearTime: 0, monthTime: 0, weekTime: 0, dayTime: 0 },
        { id: 2, name: "HOMEWORK", totalTime: 600000, yearTime: 0, monthTime: 0, weekTime: 0, dayTime: 0 },
        { id: 3, name: "GYM", totalTime: 0, yearTime: 0, monthTime: 0, weekTime: 0, dayTime: 0 },
        { id: 4, name: "PHONE", totalTime: 0, yearTime: 0, monthTime: 0, weekTime: 0, dayTime: 0 },
        { id: 5, name: "NOTHING", totalTime: 0, yearTime: 0, monthTime: 0, weekTime: 0, dayTime: 0 },
      ];
  });

  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem("view");
    return savedView ? JSON.parse(savedView) : 'total';
  });

  useEffect(() => {
    const lastLoginTime = localStorage.getItem("lastLoginTime");
    const now = new Date();

    const getWeekNumber = (date) => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000 + 1;
      return Math.ceil(pastDaysOfYear / 7);
    };

    const resetConditions = {
      dayTime: now.getDate() !== new Date(lastLoginTime)?.getDate(),
      weekTime: getWeekNumber(now) !== getWeekNumber(new Date(lastLoginTime)),
      monthTime: now.getMonth() !== new Date(lastLoginTime)?.getMonth(),
      yearTime: now.getFullYear() !== new Date(lastLoginTime)?.getFullYear(),
    };

    if (lastLoginTime) {
      setActivities((prevActivities) =>
        prevActivities.map((activity) => {
          const updatedActivity = { ...activity };
          Object.keys(resetConditions).forEach((timeKey) => {
            if (resetConditions[timeKey]) {
              updatedActivity[timeKey] = 0;
            }
          });
          return updatedActivity;
        })
      );
    }

    localStorage.setItem("lastLoginTime", now.toISOString());
  }, []);


  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('view', JSON.stringify(view));
  }, [view]);

  function addTimeToActivity(activityId) {
    if (stopwatchTime === 0) return;

    const timeFields = ["total", "year", "month", "week", "day"]; // Defines cascading order
    setActivities(prevActivities =>
      prevActivities.map((activity) => {
        if (activity.id !== activityId) return activity;
        const updatedActivity = { ...activity };
        timeFields.forEach((timeField) => {
          updatedActivity[`${timeField}Time`] = activity[`${timeField}Time`] + stopwatchTime;
        });

        return updatedActivity;
      })
    );

    broadcastTimeAddedEvent();
  }

  function addNewActivity(newActivityName) {
    const newActivity = {
      id: Date.now(),
      name: newActivityName,
      totalTime: 0,
      yearTime: 0,
      monthTime: 0,
      weekTime: 0,
      dayTime: 0,
    };

    setActivities((prevActivities) => [newActivity, ...prevActivities]);
  }

  function updateActivityName(id, newName) {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? (
          {
            ...activity,
            name: newName
          }
        ) : (
          activity
        )
      )
    );
  }

  function deleteActivity(id) {
    setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== id));
  }

  function resetActivityTime(id) {
    const viewOrder = ["total", "year", "month", "week", "day"]; // Defines cascading hierarchy
    const currentViewIndex = viewOrder.indexOf(view);

    setActivities((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id !== id) return activity;
        const updatedActivity = { ...activity };
        for (let i = currentViewIndex; i < viewOrder.length; i++) {
          const field = `${viewOrder[i]}Time`;
          if (i === currentViewIndex) {
            for (let j = 0; j < currentViewIndex; j++) {
              const largerField = `${viewOrder[j]}Time`;
              updatedActivity[largerField] -= activity[field];
            }
          }
          updatedActivity[field] = 0;
        }

        return updatedActivity;
      })
    );
  }


  return (
    <ActivityContext.Provider value={{
      stopwatchTime,
      activities,
      setActivities,
      addTimeToActivity,
      addNewActivity,
      option,
      setOption,
      updateActivityName,
      deleteActivity,
      resetActivityTime,
      view,
      setView,
    }}>
      {children}
    </ActivityContext.Provider>
  )
}

export function useActivity() {
  return useContext(ActivityContext);
}