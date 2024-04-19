import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase-config";
import DeleteAccount from "./DeleteAccount";

const Account = () => {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // this function sends a password reset email to the user
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent to your email address.");
    } catch (error) {
      setMessage("Error sending reset email: " + error.message);
    }
  };

  return (
    <div>
      <h1>Account</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}{" "}
      <button onClick={() => setShowDeleteAccount(!showDeleteAccount)}>
        Delete Account
      </button>
      {showDeleteAccount && <DeleteAccount />}
    </div>
  );
};

export default Account;
