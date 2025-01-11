import { useState, useEffect } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";
import ActivityListItem from "./ActivityListItem.jsx";

function ActivityList() {
  const { activities, view } = useActivity();
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    setTotalTime(activities.reduce((acc, activity) => acc + activity[`${view}Time`], 0));
  }, [activities]);

  const sortedActivities = [...activities].sort((a, b) => b[`${view}Time`] - a[`${view}Time`]);

  return (
    <>
      <div className="activity-list">
      {sortedActivities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          totalTime={totalTime}
        />
      ))}
    </div>
    </>
  )
}

export default ActivityList;