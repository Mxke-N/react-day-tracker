import { useActivity } from "../contexts/ActivityContext.jsx";
import ActivityListItem from "./ActivityListItem.jsx";

function ActivityList() {
  const { activities } = useActivity();

  const sortedActivities = [...activities].sort((a, b) => b.totalTime - a.totalTime);

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