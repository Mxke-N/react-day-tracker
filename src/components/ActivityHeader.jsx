import ActivityOptions from "./ActivityOptions.jsx";
import ActivityOptionsSubheader from "./ActivityOptionsSubheader.jsx";

function ActivityHeader() {
  return (
    <>
      <div className="activity-header">
        <h2>ACTIVITY TIME</h2>
        <ActivityOptions />
      </div>
      <ActivityOptionsSubheader />
    </>
  );
}

export default ActivityHeader;