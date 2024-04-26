import { auth, googleProvider } from "../firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import "../comp_styling/Auth.css";

// Authentication component
export const Auth = () => {
  // State variables for email, password, and current user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Effect hook to handle user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe; // Cleanup function
  }, []);

  // Function to sign in with email and password
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Signed in with Google");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to sign up with email and password
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up");
    } catch (err) {
      console.error(err);
    }
  };

  // JSX for authentication form
  return (
    <div className="d-flex flex-column p-4 align-items-center">
      <input
        type="text"
        className="auth-input form-control"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)} // Update email state on change
      />
      <input
        className="auth-input form-control"
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)} // Update password state on change
      />
      <br></br>
      <div className="log-buttons">
        {/* Sign in button */}
        <button
          type="button"
          className="btn btn-outline-success signIn"
          onClick={signIn}
        >
          Sign In
        </button>
        {/* Sign in with Google button */}
        <button
          type="button"
          className="btn btn-outline-primary signInGoogle"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
        {/* Sign up button */}
        <button
          type="button"
          className="btn btn-outline-primary signUp"
          onClick={signUp}
        >
          Sign Up
        </button>
      </div>
      <br></br>
      {/* Display current user's email if signed in */}
      <div>
        <p className="auth-status">Signed in as: {user?.email || "No one"} </p>
      </div>
    </div>
  );
};
