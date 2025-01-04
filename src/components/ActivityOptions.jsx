import React, { useState } from "react";

import ActivityOptionsSubheader from "./ActivityOptionsSubheader.jsx";

function ActivityOptions() {
  const [option, setOption] = useState(null);

  return (
    <div className="activity-options">
      {/* <div className="activity-filter">
        <input type="text" placeholder="Filter activities" />
        <button>Clear</button>
      </div> */}
      <div className="activity-options-buttons">
        {option === null ? (
          <>
            <button onClick={() => setOption("add")}>+</button>
            <button onClick={() => setOption("edit")}>Edit</button>
          </>
        ) : (
          <button onClick={() => setOption(null)}>Cancel</button>
        )}
      </div>
      <ActivityOptionsSubheader 
        option={option}
      />
    </div>
  );
}

export default ActivityOptions;