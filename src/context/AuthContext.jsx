import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import your auth instance

// 1. Create the context. This is the object that components will use to access the user data.
const AuthContext = createContext();

// 2. Create a custom hook. This is a shortcut to make it easier to use the context.
//    Instead of typing `useContext(AuthContext)` in every component, we can just type `useAuth()`.
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the Provider component. This component will wrap our entire application.
export const AuthProvider = ({ children }) => {
  // This state holds the current user object from Firebase. It's `null` if no one is logged in.
  const [currentUser, setCurrentUser] = useState(null);
  // This state is used to show a loading indicator while Firebase checks the auth status.
  const [loading, setLoading] = useState(true);

  // useEffect is a React hook that runs code after the component renders.
  // The empty array `[]` at the end means it will only run ONCE, when the app first loads.
  useEffect(() => {
    // onAuthStateChanged is the Firebase listener. It returns an `unsubscribe` function.
    const unsubscribe = onAuthStateChanged(auth, user => {
      // This callback function runs whenever a user logs in or out.
      // 'user' will be the user object if logged in, or null if logged out.
      setCurrentUser(user); // We update our state with the current user.
      setLoading(false);    // We're done checking, so we can show the app.
    });

    // This is a cleanup function. When the app closes, it unsubscribes from the listener.
    return unsubscribe;
  }, []);

  // We create a 'value' object to pass down to all child components.
  const value = {
    currentUser,
  };

  // We render the AuthContext.Provider and pass it the value.
  // Any component inside this provider can now access `currentUser`.
  // We don't render the children until the initial loading is complete to avoid UI flicker.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
