import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// This component acts as a gatekeeper for our protected pages.
// It accepts one prop, `children`, which will be the page component we want to protect.
const ProtectedRoute = ({ children }) => {
  // We use our custom useAuth hook to get the currentUser object.
  const { currentUser } = useAuth();

  // If there is no currentUser (meaning the user is not logged in)...
  if (!currentUser) {
    // ...we use the <Navigate> component from react-router-dom to redirect them to the login page.
    // The `replace` prop is used to replace the current entry in the history stack,
    // so the user can't click the "back" button to get to the protected page.
    return <Navigate to="/login" replace />;
  }

  // If there is a currentUser, we simply render the children.
  // This means we show the page they were trying to access (e.g., the Profile page).
  return children;
};

export default ProtectedRoute;
