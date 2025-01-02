import React, { useState } from "react";

const DUMMY_ACTIVITIES = [
    {
        id: 1,
        name: "SLEEP",
        totalTime: 0,
    },
    {
        id: 2,
        name: "WORK",
        totalTime: 0,
    },
    {
        id: 3,
        name: "GYM",
        totalTime: 0,
    },
];

function ActivityList() {
    const [activities, setActivities] = useState(DUMMY_ACTIVITIES);

    function formatActivityTime(activity) {
        const hours = Math.floor(activity.totalTime / (1000 * 60 * 60));
        const minutes = Math.floor((activity.totalTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((activity.totalTime % (1000 * 60)) / 1000);
        
        const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

        return formattedTime;
    }

    return (
        <div className="activity-list">
            {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                    <h3>{activity.name}</h3>
                    <p>{formatActivityTime(activity)}</p>
                    <button>+ Current Time</button>
                </div>
            ))}
        </div>
    );
}

export default ActivityList;