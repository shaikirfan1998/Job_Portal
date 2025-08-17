import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService'; // Importing the AuthService directly
import 'bootstrap/dist/css/bootstrap.min.css'; // Using Bootstrap for styling

const LoginCompany = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call the loginCompany method from AuthService
      const companyDetails = await AuthService.loginCompany({ email, password });
      console.log(companyDetails); // Optionally, log the company details

      // Redirect to the company dashboard after successful login
      navigate('/company-dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 login">
      <h2 className="text-center mb-4">Hiring Manager Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>} {/* Show error if any */}
        {loading && <div className="alert alert-info">Loading...</div>} {/* Show loading message */}

        <button type="submit" className="btn viewBtn w-100" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginCompany;
