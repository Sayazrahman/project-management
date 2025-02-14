import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

interface HeaderProps {
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className={`header ${isSidebarOpen ? "expanded" : "collapsed"}`}>
      <div className="header-content">
        <Link to="/dashboard" className="navbar-brand mb-0 fw-bold">
          Dashboard
        </Link>
        <div>
          <Link to="/profile" className="btn btn-light me-2">
            Profile
          </Link>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
