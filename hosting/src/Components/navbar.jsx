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
    //Basic Navbar. Will need to add an icon later, make the login button switch to logout when signed in, and also
    //make View Rooms invisible when not signed in.
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "rgb(23,23,21)" }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <Link
            to="/rooms"
            className="nav-item me-auto"
            style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
          >
            View Rooms
          </Link>
          <Link
            to="/account"
            className="nav-item"
            style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
          >
            Account
          </Link>
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
