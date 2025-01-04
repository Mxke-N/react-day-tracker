import AddActivityMenu from "./AddActivityMenu.jsx";

function ActivityOptionsSubheader({ option }) {
  return (
    <div className="activity-options-subheader">
      {option === "add" ? (
        <AddActivityMenu />
      ) : (
        null
      )}

    </div>
  );
}

export default ActivityOptionsSubheader;