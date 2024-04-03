import React, { useState } from "react";
import DeleteAccount from "./DeleteAccount";

const Account = () => {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  return (
    <div>
      <h1>Account</h1>
      <button onClick={() => setShowDeleteAccount(!showDeleteAccount)}>
        Delete Account
      </button>
      {showDeleteAccount && <DeleteAccount />}
    </div>
  );
};

export default Account;
