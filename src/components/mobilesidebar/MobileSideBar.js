import "./MobileSideBar.css";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { GiHamburgerMenu } from "react-icons/gi";

const MobileSideBar = ({ isOpen, toggleDrawer, user, setTab, tab }) => {
  const handleTabChange = (tab, e) => {
    setTab(tab);
  };
  return (
    <Drawer size="var(--drawer-size)" open={isOpen} onClose={toggleDrawer} direction="right" overlayOpacity="0.8" lockBackgroundScroll={true} className="drawer">
      <div className="sidebar">
        <div className="sidebar-top">
          <GiHamburgerMenu className="ham-btn" onClick={toggleDrawer} color="#fff" />
        </div>
        {user && (
          <div className="mobile-links">
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
    </Drawer>
  );
};

export default MobileSideBar;
