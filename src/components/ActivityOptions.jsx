import { useActivity } from "../contexts/ActivityContext.jsx";

import ActivityOptionsSubheader from "./ActivityOptionsSubheader.jsx";

function ActivityOptions() {
  const { option, setOption, view, setView } = useActivity();

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
          <option value="total">Total</option>
          <option value="year">Year</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Today</option>
        </select>
      </div> 
      <div className="activity-options-buttons">
        {option === null ? (
          <>
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