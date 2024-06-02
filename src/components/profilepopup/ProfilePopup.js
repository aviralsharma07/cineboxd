import "./ProfilePopup.css";
import { useContext } from "react";
import { FirebaseContext } from "../../context/Firebase";

const ProfilePopup = ({ showPopup }) => {
  const { logOut } = useContext(FirebaseContext); // Access logOut function from FirebaseContext

  const handleLogout = async () => {
    try {
      await logOut(); // Call logOut function from FirebaseContext
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className={`profile-popup ${showPopup ? "" : "hide-popup"}`}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePopup;
