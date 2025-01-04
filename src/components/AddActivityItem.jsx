import React, { useState } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";

function AddActivityItem() {
  const { addNewActivity } = useActivity();
  const [inputText, setinputText] = useState("");

  function handleOnChange(e) {
    setinputText(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key !== "Enter") return;
    submit();
  }

  function submit() {
    if (inputText.trim() === "") return;
    addNewActivity(inputText.trim());
    setinputText("");
  }
  return (
    <div className="add-activity">
      <input 
        type="text" 
        value={inputText} 
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