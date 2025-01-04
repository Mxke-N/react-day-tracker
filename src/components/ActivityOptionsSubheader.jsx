import AddActivityItem from "./AddActivityItem.jsx";

function ActivityOptionsSubheader({ option }) {
  return (
    <div className="activity-options-subheader">
      {option === "add" ? (
        <AddActivityItem />
      ) : (
        null
      )}
    </div>
  );
}

export default ActivityOptionsSubheader;