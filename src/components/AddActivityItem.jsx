import React, { useState, useEffect, useRef } from "react";
import { useActivity } from "../contexts/ActivityContext.jsx";

function AddActivityItem() {
  const { addNewActivity } = useActivity();
  const [inputText, setinputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
        placeholder="Enter activity name" />
      <button
        onClick={submit}
      >
        Add New Activity
      </button>
      <p>0h 0m 0s</p>
    </div>
  );
}

export default AddActivityItem;