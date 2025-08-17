import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppNavbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated
  const isAuthenticated = !!currentUser; // Assuming currentUser is available when logged in
  console.log(currentUser);
  // Check the role of the current user (e.g., seeker or manager)
  const userRole = currentUser?.role;

  const handleLogout = async () => {
    try {
      await logout(); // Perform logout (e.g., clear tokens, etc.)
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid ms-5 me-5">
        <Link className="navbar-brand" to="/">JobPortal</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {localStorage.getItem('token') ? (
              userRole === 'job_seeker' ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/view-jobs">View Jobs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/applied-jobs">Applied Jobs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/track-application-status">Track Application</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/edit-profile">Edit Profile</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : userRole === 'ROLE_COMPANY' ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/post-job">Post Jobs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manage-jobs">Manage Jobs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/view-applications">View Applications</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : userRole === 'advisor' ? ( // Check if the role is 'advisor'
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/verify-students">Verify Students</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : userRole === 'admin' ? ( // Check if the role is 'advisor'
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manage-students">Manage Students</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : null // You can add more roles here or handle errors
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
