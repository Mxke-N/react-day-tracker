import { useState, useEffect } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";
import ActivityListItem from "./ActivityListItem.jsx";

function ActivityList() {
  const { activities, view } = useActivity();
  const [totalTime, setTotalTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  useEffect(() => {
    setTotalTime(activities.reduce((acc, activity) => acc + activity[`${view}Time`], 0));
    setMaxTime(activities.reduce((acc, activity) => Math.max(acc, activity[`${view}Time`]), 0));
  }, [activities, view]);

  const alphabeticallySorted = [...activities].sort((a, b) => a.name.localeCompare(b.name));
  const sortedActivities = alphabeticallySorted.sort((a, b) => {
    const aTime = a[`${view}Time`];
    const bTime = b[`${view}Time`];

    if (aTime === 0 && bTime === 0) {
      return 0; 
    } else if (aTime !== 0 && bTime === 0) {
      return -1;
    } else if (aTime === 0 && bTime !== 0) {
      return 1;
    } else {
      return bTime - aTime;
    }
  });

  return (
    <>
      <div className="activity-list">
        {sortedActivities.map((activity) => (
          <ActivityListItem
            key={activity.id}
            activity={activity}
            totalTime={totalTime}
            maxTime={maxTime}
          />
        ))}
      </div>
    </>
  )
}

export default ActivityList;