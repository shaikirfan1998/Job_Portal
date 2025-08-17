import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';  // Assuming you have AuthService to interact with your backend API
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterCompany = () => {
  const [company, setCompany] = useState({
    companyName: '',
    companyEmail: '',
    password: '',
    location: '',
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the registerCompany API
      await AuthService.registerCompany(company);
      navigate('/manager-login');  // Redirect to login page after successful registration
    } catch (err) {
      console.error('Error registering company:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register as Hiring Manager</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            name="companyName"
            value={company.companyName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="companyEmail"
            value={company.companyEmail}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={company.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={company.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;
