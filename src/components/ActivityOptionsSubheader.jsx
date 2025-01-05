import { useActivity } from "../contexts/ActivityContext.jsx";
import AddActivityMenu from "./AddActivityMenu.jsx";

function ActivityOptionsSubheader() {
  const { option } = useActivity();

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