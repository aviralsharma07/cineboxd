import { useState, useContext } from "react";
import "./CreateList.css";
import { FirebaseContext } from "../../context/Firebase";

const CreateList = ({ showPopup, onClose, userId }) => {
  const { createList } = useContext(FirebaseContext);
  const [listName, setListName] = useState("");
  const [visibility, setVisibility] = useState("private");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createList(userId, listName, visibility);
    onClose();
  };

  return (
    <div className={`create-list-popup ${showPopup ? "show" : "hide"}`}>
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Create New List</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="listName">List Name</label>
            <input type="text" id="listName" value={listName} onChange={(e) => setListName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Visibility</label>
            <div>
              <label>
                <input type="radio" value="public" checked={visibility === "public"} onChange={() => setVisibility("public")} />
                Public
              </label>
              <label>
                <input type="radio" value="private" checked={visibility === "private"} onChange={() => setVisibility("private")} />
                Private
              </label>
            </div>
          </div>
          <button type="submit">Create List</button>
        </form>
      </div>
    </div>
  );
};

export default CreateList;
