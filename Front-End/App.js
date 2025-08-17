import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import JobSearch from './components/Jobs/JobSearch';
import ApplyJob from './components/Jobs/ApplyJob';
import AppliedJobs from './components/Jobs/AppliedJobs';
import TrackApplicationStatus from './components/Jobs/TrackApplicationStatus';
import EditProfile from './components/Profile/EditProfile';
import CompanyProfile from './components/Profile/CompanyProfile';
import PostJob from './components/Employer/PostJob';
import ManageJobs from './components/Employer/ManageJobs';
import ViewUserApplications from './components/Employer/ViewUserApplications';
import ManageUsers from './components/Admin/ManageUsers';
import ManageCompanies from './components/Admin/ManageCompanies';
import ViewJobs from './components/Jobs/ViewJobs';
import AppNavbar from './components/common/Navbar';
import RegisterCompany from './components/Auth/RegisterCompany';
import LoginCompany from './components/Auth/LoginCompany';
import UserList from './components/Advisor/UserList';
import UserDetails from './components/Advisor/UserDetails';
import './App.css'; // Import the custom CSS

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          {/* Header with NavBar */}
          
          <AppNavbar />
          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/manager-registration" element={<RegisterCompany />} />
              <Route path="/manager-login" element={<LoginCompany />} />
              
              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/jobs/apply/:id" element={<ApplyJob />} />
                <Route path="/applied-jobs" element={<AppliedJobs />} />
                <Route path="/track-application-status" element={<TrackApplicationStatus />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/company-profile" element={<CompanyProfile />} />
                <Route path="/post-job" element={<PostJob />} roles={['Employer']} />
                <Route path="/view-jobs" element={<ViewJobs />} />
                <Route path="/manage-jobs" element={<ManageJobs />} roles={['Employer']} />
                <Route path="/view-applications" element={<ViewUserApplications />} roles={['Employer']} />
                <Route path="/manage-students" element={<ManageUsers />} roles={['Admin']} />
                <Route path="/manage-companies" element={<ManageCompanies />} roles={['Admin']} />
                <Route path="/verify-students" element={<UserList />} />
                <Route path="/user/:userId" element={<UserDetails />} />
                <Route path="/" element={<JobSearch />} /> {/* Default to JobSearch */}
              </Route>
            </Routes>
          </div>

          {/* Footer */}
          <footer className="footer text-light text-center py-2 mt-auto">
            <Container>
              <p>&copy; 2024 JobPortal - All Rights Reserved</p>
            </Container>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
