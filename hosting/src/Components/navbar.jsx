import { Link, Outlet } from "react-router-dom";
import LoginPopup from "./loginPopup";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config.js";

export default function NavBar() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    // Navbar component that displays different links based on user authentication state
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "rgb(23,23,21)" }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <Link to="/dorms" className="navbar-brand">
            Dorm Info
          </Link>
          {user ? (
            <Link to="/rooms" className="nav-item">
              View Rooms
            </Link>
          ) : null}
          {user ? (
            <Link
              to="/account"
              className="nav-item"
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
            >
              Account
            </Link>
          ) : null}
          {user ? (
            <button>
              <Link
                to="/"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Log Out
              </Link>
            </button>
          ) : (
            <LoginPopup />
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
