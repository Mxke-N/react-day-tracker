import React, { useState, useEffect } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";
import AddCurrentTimeButton from "./AddCurrentTimeButton.jsx";

function ActivityListItem({ activity }) {
  const { option, updateActivityName } = useActivity();
  const [activityName, setActivityName] = useState(activity.name);

  useEffect(() => {
    if (option === "edit") {
      setActivityName(activity.name);
    } else if (activityName !== activity.name) {
      updateActivityName(activity.id, activityName);
    }
  }, [option]);

  function handleNameChange(e) {
    setActivityName(e.target.value);
  }

  function handleOnKeyUp(e) {
    if (e.key !== "Enter") return;
    e.target.blur();
  }

  function formatTime(totalTime) {
    const hours = Math.floor(totalTime / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

    return formattedTime;
  }

  return (<>
    {option === "edit" ? (
      <div className="activity-list-item">
        <input
          name={activity.id}
          type="text"
          value={activityName}
          onChange={handleNameChange}
          onKeyUp={handleOnKeyUp}
        />
        <p>{formatTime(activity.totalTime)}</p>
        <div className="edit-activity-buttons">
          <button>Reset Activity Time</button>
          <button>Delete Activity</button>
        </div>
      </div>
    ) : (
      <div className="activity-list-item">
        <h3>{activity.name}</h3>
        <p>{formatTime(activity.totalTime)}</p>
        <AddCurrentTimeButton myID={activity.id} />
      </div>
    )}
  </>)
}

export default ActivityListItem;