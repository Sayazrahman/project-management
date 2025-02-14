import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import "./sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2 className="sidebar-title" onClick={toggleSidebar}>
        {isOpen ? "Admin Panel" : "AP"}
      </h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt className="icon" /> {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/">
            <FaSignOutAlt className="icon" /> {isOpen && "Logout"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
