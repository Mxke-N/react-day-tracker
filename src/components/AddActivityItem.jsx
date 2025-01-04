import React, { useState } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";

function AddActivityItem() {
  const { addNewActivity } = useActivity();
  const [activityName, setActivityName] = useState("");

  function handleOnChange(e) {
    setActivityName(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key !== "Enter") return;
    submit();
  }

  function submit() {
    if (activityName.trim() === "") return;
    addNewActivity(activityName.trim());
    setActivityName("");
  }
  return (
    <div className="add-activity">
      <input 
        type="text" 
        value={activityName} 
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
        placeholder="Enter activity name" />
      <p>0h 0m 0s</p>
      <button
        onClick={submit}
      >
        Add New Activity
      </button>
    </div>
  );
}

export default AddActivityItem;