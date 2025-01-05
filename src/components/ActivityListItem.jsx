import React, { useState, useEffect } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";

function ActivityListItem({ index, activity, activitiesLength }) {
  const { option, updateActivityName, addTimeToActivity, deleteActivity, resetActivityTime, reorderActivities } = useActivity();
  const [activityName, setActivityName] = useState(activity.name);

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

  function handleNameChange(e) {
    setActivityName(e.target.value);
  }

  function handleOnKeyUp(e) {
    if (e.key !== "Enter") return;
    e.target.blur();
  }

  function formatTime() {
    const hours = Math.floor(activity.totalTime / (1000 * 60 * 60));
    const minutes = Math.floor((activity.totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((activity.totalTime % (1000 * 60)) / 1000);

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

  function onUpClick() {
    reorderActivities(index, index - 1);
  }

  function onDownClick() {
    reorderActivities(index, index + 1);
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
          <p>{formatTime()}</p>
          <div className="edit-activity-buttons">
            <button
              onClick={onUpClick}
              disabled={index === 0}
            >
              ▲
            </button>
            <button
              onClick={onDownClick}
              disabled={index === activitiesLength - 1}
            >
              ▼
            </button>
            <button onClick={onResetActivityTimeClick}>Reset Activity Time</button>
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