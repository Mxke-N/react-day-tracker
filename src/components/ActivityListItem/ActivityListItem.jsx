import React, { useState, useEffect } from 'react';

function ActivityListItem({ myActivity, addTimeToActivity, isEditing, updateActivityName }) {
    const [activityName, setActivityName] = useState(myActivity.name);

    useEffect(() => {
        if (isEditing) {
            setActivityName(myActivity.name);
        } else if (activityName !== myActivity.name) {
            updateActivityName(activityName, myActivity.name);
        }
    }, [isEditing]);

    function handleNameChange(e) {
        setActivityName(e.target.value);
    }

    function handleOnKeyUp(e) {
        if (e.key !== "Enter") return;
        e.target.blur();
    }

    function formatActivityTime(activity) {
        const hours = Math.floor(activity.totalTime / (1000 * 60 * 60));
        const minutes = Math.floor((activity.totalTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((activity.totalTime % (1000 * 60)) / 1000);
        
        const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

        return formattedTime;
    }

    return (
        <div className="activity-item">
            { isEditing ? 
                <input 
                    type="text" 
                    value={activityName} 
                    onChange={handleNameChange}
                    onKeyUp={handleOnKeyUp}
                />
                :
                <h3>{myActivity.name}</h3>
            }   

            <p>{formatActivityTime(myActivity)}</p>

            { isEditing ? 
                <button>
                    Delete Activity
                </button>
                :
                <button onClick={() => addTimeToActivity(myActivity.name)}>
                    + Current Time
                </button>
            }
        </div>
    );
}

export default ActivityListItem;