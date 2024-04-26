import { Link, Outlet } from "react-router-dom";
import "./DormNavbar.css";

// Component for the dorm navigation bar
export default function DormNavbar() {
  return (
    <>
      {/* Navigation bar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "rgb(23,23,21)" }}
      >
        <div className="container-fluid">
          {/* Link to Dorms page */}
          <Link
            to="/dorms"
            className="navbar-brand"
            style={{ paddingLeft: "25rem", paddingRight: "1rem" }}
          >
            Dorms
          </Link>
          {/* Link to WhatToBring page */}
          <Link
            to="/WhatToBring"
            className="navbar-brand"
            style={{
              paddingLeft: "1rem",
              paddingRight: "25rem",
            }}
          >
            What to Bring
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
