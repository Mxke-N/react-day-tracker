import React, { useState } from 'react'

import ActivityListHeader from "../ActivityListHeader/ActivityListHeader.jsx";
import ActivityListItem from "../ActivityListItem/ActivityListItem.jsx";

function ActivityList({ activities, addTimeToActivity, addNewActivity, updateActivityName }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleIsEditing() {
        setIsEditing(!isEditing);
    }

    return (
        <div className="activity-list">
            <ActivityListHeader 
                addNewActivity={addNewActivity}
                isEditing={isEditing}
                handleIsEditing={handleIsEditing}
            />
            {activities.map((activity, index) => (
                <ActivityListItem
                    key={index}
                    myActivity={activity} 
                    addTimeToActivity={addTimeToActivity}
                    isEditing={isEditing} 
                    updateActivityName={updateActivityName}
                />
            ))}
        </div>
    );
}

export default ActivityList;