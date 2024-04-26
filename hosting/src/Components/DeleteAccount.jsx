import React, { useState } from "react";
import { auth } from "../firebase-config.js";
import { deleteUser } from "firebase/auth";

// Component for deleting user account
const DeleteAccount = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle account deletion
  const deleteAccount = (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user) {
      // Delete user account if user is signed in
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
        {/* Input field for email */}
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Input field for password */}
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Button to delete account */}
        <button className="delete-button" type="submit">
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
