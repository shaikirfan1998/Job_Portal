import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path   

const RoleBasedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { currentUser } = useAuth(); // Assuming currentUser contains the user role

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          // User is not logged in, redirect to login page
          return <Navigate to="/login" />;
        }

        if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
          // User is logged in but does not have the right role, redirect to unauthorized page or home
          return <Navigate to="/unauthorized" />;
        }

        // User is authenticated and has the right role
        return <Component {...props} />;
      }}
    />
  );
};

export default RoleBasedRoute;