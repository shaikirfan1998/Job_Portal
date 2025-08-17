import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';  // Import react-select
import AuthService from '../../services/AuthService';
import SkillService from '../../services/SkillService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'job_seeker', // Job Seeker by default
    dateOfBirth: '',
    skillIds: [], // Changed from string to array
  });
  const [skills, setSkills] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available skills from the backend
    SkillService.getSkills().then((response) => {
      // Transform the skills into a format suitable for react-select
      const skillOptions = response.data.map((skill) => ({
        value: skill.skillId,
        label: skill.skillName
      }));
      setSkills(skillOptions);
    });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (selectedOptions) => {
    // Set selected skills (array of skill ids)
    const selectedSkills = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setUser({ ...user, skillIds: selectedSkills }); // Update skillIds instead of skills
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert skills array to a comma-separated string
      const skillsIds = user.skillIds.join(','); // Use skillIds
      await AuthService.register({ ...user, skillsIds }); // Pass skillsIds
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register as Job Seeker</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
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
            value={user.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Skill Selection for Job Seekers */}
        {user.role === 'job_seeker' && (
          <div className="form-group mb-3">
            <label>Skills</label>
            <Select
              isMulti
              name="skills"
              value={skills.filter(skill => user.skillIds.includes(skill.value))}  // Set selected skills
              onChange={handleSkillChange}
              options={skills}  // Options fetched from backend
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select skills"
            />
          </div>
        )}

        <button type="submit" className="btn viewBtn w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
