import "./Navbar.css";
import { RiMovie2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom"; // Import Link from React Router
import ProfilePopup from "../profilepopup/ProfilePopup";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileSideBar from "../mobilesidebar/MobileSideBar";

const Navbar = ({ user, tab, setTab, showUserLists, setShowUserLists }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleTabChange = (tab, e) => {
    setTab(tab);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="nav-bar d-flex justify-content-between py-2 px-5">
        {user && <ProfilePopup showPopup={showPopup} />}
        <div className="nav-left d-flex align-items-center gap-5">
          <div className="logo">
            <RiMovie2Line />
            Cineboxd
          </div>
          {user && (
            <div className="nav-links d-flex gap-4">
              <a onClick={() => setTab("Home")} className={`${tab === "Home" ? "active-tab" : ""}`}>
                Home
              </a>
              <a onClick={() => handleTabChange("Lists")} className={`${tab === "Lists" ? "active-tab" : ""}`}>
                Lists
              </a>
              <a onClick={() => setTab("About")} className={`${tab === "About" ? "active-tab" : ""}`}>
                About
              </a>
              <a onClick={() => setTab("Contact")} className={`${tab === "Contact" ? "active-tab" : ""}`}>
                Contact
              </a>
            </div>
          )}
        </div>
        <div className="nav-right d-flex align-items-center gap-3">
          {user ? null : (
            <>
              <Link to="/login">
                <button className="mt-0">Login</button>
              </Link>
              <Link to="/signup">
                <button className="mt-0">Register</button>
              </Link>
            </>
          )}
          {user && (
            <div className="user-list-btn" onClick={() => setShowUserLists(true)}>
              My Lists
            </div>
          )}
          {user && (
            <div className="menu-icon d-flex align-items-center gap-2" onClick={() => toggleDrawer()}>
              <div>
                <GiHamburgerMenu />
              </div>
            </div>
          )}
          <div className="profile" onClick={() => setShowPopup((p) => !p)}>
            <CgProfile />
          </div>
        </div>
      </div>
      <div className={`mobile-sidebar ${!isOpen ? "hide-mobile-sidebar" : ""}`}>
        <MobileSideBar isOpen={isOpen} toggleDrawer={toggleDrawer} user={user} setTab={setTab} tab={tab} handleTabChange={handleTabChange} />;
      </div>
    </>
  );
};

export default Navbar;
