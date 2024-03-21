import { auth, googleProvider } from "../firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import "../comp_styling/Auth.css";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Signed in with Google");
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up");
    } catch (err) {
      console.error(err);
    }
  };

  //Returns a div with inputs for username and password, a signIn button, a signInWithGoogle button, and a logOut button.
  //Should probably remove the logOut button and instead display a log out button on the NavBar when users are signed in.
  //Also, we need to add a button or link to create a new account.
  return (
    <div className="d-flex flex-column p-4 align-items-center">
      <input
        type="text"
        className="auth-input form-control"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth-input form-control"
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <div className="log-buttons">
        <button
          type="button"
          className="btn btn-outline-success signIn"
          onClick={signIn}
        >
          Sign In
        </button>
        <button
          type="button"
          className="btn btn-outline-primary signInGoogle"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
        <button
          type="button"
          className="btn btn-outline-primary signUp"
          onClick={signUp}
        >
          Sign Up
        </button>
      </div>
      <br></br>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
