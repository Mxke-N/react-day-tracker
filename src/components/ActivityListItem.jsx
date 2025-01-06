import React, { useState, useEffect } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";

function ActivityListItem({ activity }) {
  const { option, updateActivityName, addTimeToActivity, deleteActivity, resetActivityTime, updateActivityColor, view } = useActivity();
  const [activityName, setActivityName] = useState(activity.name);
  const [activityColor, setActivityColor] = useState(activity.color);

  useEffect(() => {
    if (option === "edit") {
      setActivityName(activity.name);
    }
  }, [option]);

  useEffect(() => {
    if (activityName.trim() !== activity.name) {
      updateActivityName(activity.id, activityName);
    }
  }, [activityName]);

  useEffect(() => {
    if (activityColor !== activity.color) {
      updateActivityColor(activity.id, activityColor);
    }
  }, [activityColor]);

  function handleNameChange(e) {
    setActivityName(e.target.value);
  }

  function handleColorChange(e) {
    setActivityColor(e.target.value);
  }

  function handleOnKeyUp(e) {
    if (e.key !== "Enter") return;
    e.target.blur();
  }

  function formatTime() {
    const viewTime = activity[`${view}Time`];
    const hours = Math.floor(viewTime / (1000 * 60 * 60));
    const minutes = Math.floor((viewTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((viewTime % (1000 * 60)) / 1000);

    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

    return formattedTime;
  }

  function onAddCurrentTimeClick() {
    addTimeToActivity(activity.id);
  }

  function onDeleteActivityClick() {
    deleteActivity(activity.id);
  }

  function onResetActivityTimeClick() {
    resetActivityTime(activity.id);
  }

  return (
    <div className="activity-list-item">
      {option === "edit" ? (
        <>
          <input
            name={activity.id}
            type="text"
            value={activityName}
            onChange={handleNameChange}
            onKeyUp={handleOnKeyUp}
          />
          <label for="activity-color">Set Color</label>
          <input 
            type="color" 
            id="activity-color" 
            name="activity-color" 
            value={activityColor} 
            onChange={handleColorChange}
          />
          <p>{formatTime()}</p>
          <div className="edit-activity-buttons">
            <button onClick={onResetActivityTimeClick}>
              {view === "total" ? "Reset" : "Remove"} Activity Time
            </button>
            <button onClick={onDeleteActivityClick}>Delete Activity</button>
          </div>
        </>
      ) : (
        <>
          <h3>{activity.name}</h3>
          <p>{formatTime()}</p>
          <button onClick={onAddCurrentTimeClick}>+ Current Time</button>
        </>
      )}
    </div>
  )
}

export default ActivityListItem;