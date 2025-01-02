import React, { useState } from "react";

function ActivityListHeader({ addNewActivity }) {
    const [activityName, setActivityName] = useState("");

    function handleOnChange(e) {
        setActivityName(e.target.value);
    }

    function handleOnClick() {
        if (activityName.trim() === "") return;
        addNewActivity(activityName);
        setActivityName("");
    }

    function handleKeyUp(e) {
        if (e.key !== "Enter") return;
        handleOnClick();
        e.target.blur();
    }

    return (
        <div className="activity-list-header">
            <h2>Activity Time</h2>
            <input 
                type="text" 
                value={activityName} 
                onChange={handleOnChange}
                onKeyUp={handleKeyUp}
                placeholder="Enter activity name" 
            />
            <button onClick={handleOnClick}>Add New Activity</button>
        </div>
    );
}

export default ActivityListHeader;