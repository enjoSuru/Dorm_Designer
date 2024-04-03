import React, { useState } from "react";
import { auth } from "../firebase-config.js";
import { deleteUser } from "firebase/auth";

const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const deleteAccount = (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user) {
      deleteUser(user)
        .then(() => {
          console.log("Account Deleted");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("No user signed in");
    }
  };

  return (
    <div className="delete-account-container">
      <form onSubmit={deleteAccount}>
        <h1>Delete Account</h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="delete-button" type="submit">
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
