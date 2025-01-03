
function AddCurrentTimeButton({ myID, addTimeToActivity }) {
  return (
    <button onClick={() => addTimeToActivity(myID)}>
      + Current Time
    </button>
  );
}

export default AddCurrentTimeButton;