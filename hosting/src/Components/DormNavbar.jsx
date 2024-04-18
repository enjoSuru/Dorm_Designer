import { Link, Outlet } from "react-router-dom";
import "./DormNavbar.css";

export default function DormNavbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "rgb(23,23,21)" }}
      >
        <div className="container-fluid">
          <Link
            to="/dorms"
            className="navbar-brand"
            style={{ paddingLeft: "25rem", paddingRight: "1rem" }}
          >
            Dorms
          </Link>
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
