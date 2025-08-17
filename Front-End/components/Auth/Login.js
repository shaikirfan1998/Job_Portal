import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Get the login function from the context
import 'bootstrap/dist/css/bootstrap.min.css'; // Using Bootstrap for styling

const Login = () => {
  const { currentUser, login, loading, error } = useAuth(); // Get login, loading, and error states from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const userRole = currentUser.role;
      console.log(userRole);

      if(userRole=='job_seeker') {
      navigate('/edit-profile');
    }
    else if(userRole=='admin'){
      navigate('/manage-students');
    }
    else if(userRole=='advisor'){
      navigate('/verify-students');
    }
    else {
      navigate('/post-job')
    }
    }
  }, [currentUser, navigate]); // Run when currentUser changes


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login({ email, password }); // Call login with email and password
    const userRole = currentUser?.role;
    console.log(userRole);
    // if(userRole=='job_seeker') {
    //   navigate('/edit-profile');
    // }
    // else if(userRole=='admin'){
    //   navigate('/manage-students');
    // }
    // else if(userRole=='advisor'){
    //   navigate('/verify-students');
    // }
    // else {
    //   navigate('/post-job')
    // }
    // navigate('/edit-profile'); // Redirect to the dashboard or home after successful login
  } catch (err) {
    // Error handling already managed in AuthContext, no need to handle here again
    console.error(err);
    // You might want to display an error message to the user if you don't rely solely on the context
  }
};

  return (
    <div className="container mt-5 login">
      <h2 className="text-center mb-4">Login</h2>
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

export default Login;
