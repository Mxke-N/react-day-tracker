import { useActivity } from "../contexts/ActivityContext.jsx";
import ActivityListItem from "./ActivityListItem.jsx";

function ActivityList() {
  const { activities } = useActivity();

  return (
    <div className="activity-list">
      {activities.map((activity, index) => (
        <ActivityListItem
          key={activity.id}
          index={index}
          activity={activity}
          activitiesLength={activities.length}
        />
      ))}
    </div>
  )
}

export default ActivityList;