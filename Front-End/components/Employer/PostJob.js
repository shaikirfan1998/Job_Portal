import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import JobService from '../../services/JobService';
import ProfileService from '../../services/ProfileService';
import { useAuth } from '../../context/AuthContext';

const PostJob = () => {
  const { currentUser} = useAuth();
  console.log(currentUser?.companyId);
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    jobDescription: '',
    location: '',
    experience: '',
    payScale: '',
    responsibilities: '',
    skills: '',
    company: null,
  });

  const [company, setCompany] = useState(null); // Local state to store company details
  const [loading, setLoading] = useState(true); // For loading state while fetching company

  useEffect(() => {
  const fetchCompanyDetails = async () => {
    if (currentUser?.companyId) {
      try {
        const response = await ProfileService.getCompanyProfile(currentUser?.companyId); // Fetch company profile
        console.log(response);
        setCompany(response.data); // Store company data in local state
        setJobDetails((prevDetails) => ({
          ...prevDetails,  // Keep the existing job details
          company: response, // Add the company object to jobDetails
        }));
      } catch (error) {
        console.error('Error fetching company details:', error);
        alert('Failed to fetch company details.');
      } finally {
        setLoading(false); // Mark loading as finished
      }
    }
  };

  fetchCompanyDetails(); // Fetch company details on mount
}, [currentUser?.companyId]); // Re-run when companyId changes

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit jobDetails to the backend
      await JobService.postJob(jobDetails);
      alert('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Post Job Opening</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            name="jobTitle"
            value={jobDetails.jobTitle}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            as="textarea"
            name="jobDescription"
            rows={4}
            value={jobDetails.jobDescription}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Experience (Years)</Form.Label>
          <Form.Control
            type="number"
            name="experience"
            value={jobDetails.experience}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pay Scale</Form.Label>
          <Form.Control
            type="text"
            name="payScale"
            value={jobDetails.payScale}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Responsibilities</Form.Label>
          <Form.Control
            as="textarea"
            name="responsibilities"
            rows={3}
            value={jobDetails.responsibilities}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skills Required</Form.Label>
          <Form.Control
            type="text"
            name="skills"
            value={jobDetails.skills}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className='text-center'>
        <Button className="viewBtn mb-3" type="submit" variant="primary">Post Job</Button>
        </div>
      </Form>
    </div>
  );
};

export default PostJob;
