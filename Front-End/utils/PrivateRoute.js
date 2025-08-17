import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode } from 'jwt-decode';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    // Check if token exists and is valid
    let isAuthenticated = false;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            // console.log('Decoded Token:', decodedToken); // Log the decoded token
            isAuthenticated = true; // Add checks for token expiration here if necessary
        } catch (error) {
            console.error('Invalid token:', error);
        }
    } else {
        console.log('No token found in localStorage');
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
