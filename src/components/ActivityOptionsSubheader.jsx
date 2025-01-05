import AddActivityMenu from "./AddActivityMenu.jsx";

function ActivityOptionsSubheader({ option }) {
  return (
    <>
      {option === "add" ? (
        <AddActivityMenu />
      ) : (
        null
      )}
    </>
  );
}

export default ActivityOptionsSubheader;