import React, { useState, useEffect } from 'react';
import ProfileService from '../../services/ProfileService';

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const result = await ProfileService.getProfile();
      setCompany(result.data); // Assuming the response contains the company data
    };
    fetchCompanyProfile();
  }, []);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ProfileService.updateProfile(company); // Use the appropriate service method
    alert('Company profile updated successfully!');
  };

  return (
    <div className="container mt-5">
      <h2>Edit Company Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Company Name</label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            name="description"
            value={company.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default CompanyProfile;
