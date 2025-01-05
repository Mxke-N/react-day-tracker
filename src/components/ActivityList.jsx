import { useActivity } from "../contexts/ActivityContext.jsx";
import ActivityListItem from "./ActivityListItem.jsx";

function ActivityList() {
  const { activities, view } = useActivity();

  const sortedActivities = [...activities].sort((a, b) => b[`${view}Time`] - a[`${view}Time`]);

  return (
    <div className="activity-list">
      {sortedActivities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
        />
      ))}
    </div>
  )
}

export default ActivityList;