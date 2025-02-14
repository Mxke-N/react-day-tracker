import React, { useState, useEffect } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";

function ActivityListItem({ activity, totalTime, maxTime }) {
  const { option, updateActivityName, addTimeToActivity, deleteActivity, resetActivityTime, updateActivityColor, view } = useActivity();
  const [activityName, setActivityName] = useState(activity.name);
  const [activityColor, setActivityColor] = useState(activity.color);
  const [activityBarWidth, setActivityBarWidth] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      const storedActivities = JSON.parse(localStorage.getItem("activities"));
      if (storedActivities) {
        console.log("Activities loaded from local storage:", storedActivities);
      }
      setIsDataLoaded(true);
    };
  
    fetchData();
  }, []);

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

  useEffect(() => {
    if (!isDataLoaded) return;
    setActivityBarWidth(calculateBarWidth());
  }, [view, totalTime, isDataLoaded]);

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

  function calculateBarWidth() {
    const viewTime = activity[`${view}Time`];
    const widthPercentage = (viewTime / maxTime) * 100;
    return Math.min(widthPercentage, 100); 
  }

  return (
    <div 
      className="activity-list-item"
      style={{
        "--bar-width": `${activityBarWidth}%`,
        "--bar-color": activityColor,
      }}
    >
      {option === "edit" ? (
        <>
          <div className="acitivity-item-header">
            <input
              name={activity.id}
              type="text"
              value={activityName}
              onChange={handleNameChange}
              onKeyUp={handleOnKeyUp}
            />
            <input
              type="color"
              id="activity-color"
              name="activity-color"
              value={activityColor}
              onChange={handleColorChange}
            />
            <p>{formatTime()}</p>
          </div>
          <div className="activity-item-buttons">
            <button onClick={onResetActivityTimeClick}>
              {view === "total" ? "Reset" : "Remove"} Activity Time
            </button>
            <button onClick={onDeleteActivityClick}>Delete Activity</button>
          </div>
        </>
      ) : (
        <>
          <div className="activity-item-header">
            <h3>{activity.name}</h3>
            <p>{formatTime()}</p>
          </div>
          <div className="activity-item-buttons">
            <button onClick={onAddCurrentTimeClick}>+ Current Time</button>
          </div>
        </>
      )}
    </div>
  )
}

export default ActivityListItem;