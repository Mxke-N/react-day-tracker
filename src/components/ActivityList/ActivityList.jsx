import ActivityListHeader from "../ActivityListHeader/ActivityListHeader.jsx";

function ActivityList({ activities, addTimeToActivity, addNewActivity }) {
    function formatActivityTime(activity) {
        const hours = Math.floor(activity.totalTime / (1000 * 60 * 60));
        const minutes = Math.floor((activity.totalTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((activity.totalTime % (1000 * 60)) / 1000);
        
        const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

        return formattedTime;
    }

    return (
        <div className="activity-list">
            <ActivityListHeader addNewActivity={addNewActivity} />
            {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                    <h3>{activity.name}</h3>
                    <p>{formatActivityTime(activity)}</p>
                    <button onClick={() => addTimeToActivity(activity.name)}>
                        + Current Time
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ActivityList;