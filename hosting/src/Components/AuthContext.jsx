import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Creating an initial context with null user
const AuthContext = createContext({ user: null });

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect hook to listen for authentication state changes
  useEffect(() => {
    const auth = getAuth(); // Getting Firebase auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state on authentication state change
      setLoading(false); // Set loading to false once authentication state is received
    });

    return unsubscribe; // Cleanup function
  }, []);

  // Providing AuthContext with user value once loading is complete
  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children} {/* Render children only when loading is false */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
