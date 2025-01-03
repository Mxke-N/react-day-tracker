
function ActivityListItem({ activity, addTimeToActivity }) {
  function formatTime(totalTime) {
    const hours = Math.floor(totalTime / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

    return formattedTime;
  }

  return (
    <div className="activity-list-item">
      <h3>{activity.name}</h3>
      <p>{formatTime(activity.totalTime)}</p>
      <button onClick={() => addTimeToActivity(activity.id)}>
        + Current Time
      </button>
    </div>
  )
}

export default ActivityListItem;