import React, { useState } from 'react';
import ActivityHeader from "./ActivityHeader.jsx";
import ActivityList from "./ActivityList.jsx";

function ActivityMain({ stopwatchTime, broadcastTimeAddedEvent }) {
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('activities');
    return savedActivities ? JSON.parse(savedActivities) : [
      { id: 1, name: "SLEEP", totalTime: 0 },
      { id: 2, name: "WORK", totalTime: 0 },
      { id: 3, name: "GYM", totalTime: 0 },
    ];
  });

  // Save activities to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem('activities', JSON.stringify(activities));
  // }, [activities]);

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

  return (
    <>
      <ActivityHeader />
      <ActivityList
        activities={activities}
        addTimeToActivity={addTimeToActivity}
      />
    </>
  );
}

export default ActivityMain;