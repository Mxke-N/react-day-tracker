import { useActivity } from "../contexts/ActivityContext.jsx";

function AddCurrentTimeButton({ myID }) {
  const { addTimeToActivity } = useActivity();
  
  return (
    <button onClick={() => addTimeToActivity(myID)}>
      + Current Time
    </button>
  );
}

export default AddCurrentTimeButton;