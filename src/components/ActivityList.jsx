import ActivityListItem from "./ActivityListItem.jsx";

function ActivityList({ activities, addTimeToActivity }) {
  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          addTimeToActivity={addTimeToActivity}
        />
      ))}
    </div>
  )
}

export default ActivityList;