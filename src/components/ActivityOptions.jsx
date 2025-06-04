import { useActivity } from "../contexts/ActivityContext.jsx";


function ActivityOptions() {
  const { activities, option, setOption, view, setView, undoLastAddTime, canUndo } = useActivity();

  function getTotalViewTime() {
    const totalTime = activities.reduce((acc, activity) => acc + activity[`${view}Time`], 0);

    const hours = Math.floor(totalTime / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);
    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
    return formattedTime;
  }

  return (
    <div className="activity-options-container">
      <div className="activity-view-selection">
        <label htmlFor="views">view:</label>
        <select 
          name="views" 
          id="views"
          value={view}
          onChange={(event) => setView(event.target.value)}
        >
          <option value="total">All-time</option>
          <option value="year">Year</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Today</option>
        </select>
      </div> 
      <div className="view-total-time">
        <p>total: {getTotalViewTime()}</p>
      </div>
      <div className="activity-options-buttons">
        {option === null ? (
          <>
            {canUndo && <button onClick={undoLastAddTime}>↩</button>}
            <button onClick={() => setOption("add")}>+</button>
            <button onClick={() => setOption("edit")}>edit</button>
          </>
        ) : (
          <button onClick={() => setOption(null)}>cancel</button>
        )}
      </div>
    </div>
  );
}

export default ActivityOptions;