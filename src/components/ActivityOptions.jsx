import { useActivity } from "../contexts/ActivityContext.jsx";

import ActivityOptionsSubheader from "./ActivityOptionsSubheader.jsx";

function ActivityOptions() {
  const { option, setOption } = useActivity();

  return (
    <div className="activity-options-container">
      {/* <div className="activity-view-selection">
        <label htmlFor="views">view:</label>
        <select name="views" id="views">
          <option value="alltime">all-time</option>
          <option value="daily">daily</option>
        </select>
      </div>  */}
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
      <ActivityOptionsSubheader 
        option={option}
      />
    </div>
  );
}

export default ActivityOptions;