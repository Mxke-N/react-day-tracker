import AddActivity from "../AddActivity/AddActivity.jsx";

function ActivityListHeader({ addNewActivity, isEditing, handleIsEditing }) {
    return (
        <>
            <div className="activity-list-header">
                <h2>Activity Time</h2>
                <div className="activity-list-header-edit">
                    <button onClick={handleIsEditing}>
                        { isEditing ? "Cancel" : "Edit" }
                    </button>
                </div>
            </div>
            { isEditing ? 
                <AddActivity addNewActivity={addNewActivity} /> 
                : null 
            }
        </>
    );
}

export default ActivityListHeader;