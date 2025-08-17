import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import JobService from '../../services/JobService';  // Make sure the correct API path is used
import { useAuth } from '../../context/AuthContext';
import ProfileService from '../../services/ProfileService';

const ManageJobs = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);  // To store jobs posted by the company
  const [showModal, setShowModal] = useState(false);  // To toggle the modal visibility
  const [selectedJob, setSelectedJob] = useState(null);  // To store selected job for editing
  const [updatedJobDetails, setUpdatedJobDetails] = useState({
    jobTitle: '',
    jobDescription: '',
    location: '',
    experience: '',
    payScale: '',
    responsibilities: '',
    skills: ''
  });  // To store the updated job details

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchJobs = async () => {
      try {
        const response = await JobService.getAllJobs(); // Use JobService to fetch jobs
        console.log(response);
        const filteredJobs = response.data.filter(job => job.company?.companyId === currentUser.companyId);
        setJobs(filteredJobs); // Set the jobs state with the filtered jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs(); // Call the async function inside useEffect
  }, []); // Dependency array ensures this runs when companyId changes


  const handleEdit = async (jobId) => {
    const response = await ProfileService.getCompanyProfile(currentUser?.companyId);
    const jobToEdit = jobs.find((job) => job.jobId === jobId);
    if (jobToEdit) {
      setSelectedJob(jobToEdit);
      setUpdatedJobDetails({
        jobId: jobToEdit.jobId,
        jobTitle: jobToEdit.jobTitle,
        jobDescription: jobToEdit.jobDescription,
        location: jobToEdit.location,
        experience: jobToEdit.experience,
        payScale: jobToEdit.payScale,
        responsibilities: jobToEdit.responsibilities,
        skills: jobToEdit.skills,
        company: response,
      });
      setShowModal(true); // Show modal for editing job
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await JobService.deleteJob(jobId);
        setJobs(jobs.filter(job => job.jobId !== jobId)); // Remove deleted job from state
        alert('Job deleted successfully!');
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job.');
      }
    }
  };

  const handleUpdateJob = async () => {
    try {
      await JobService.updateJob(selectedJob.jobId, updatedJobDetails);  // Update job via JobService
      setJobs(jobs.map(job => job.jobId === selectedJob.jobId ? { ...job, ...updatedJobDetails } : job));
      setShowModal(false); // Close the modal after successful update
      alert('Job updated successfully!');
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job.');
    }
  };

  const handleInputChange = (e) => {
    setUpdatedJobDetails({
      ...updatedJobDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mt-5">
      <h2>Manage Jobs</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Pay Scale</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.jobId}>
              <td>{job.jobId}</td>
              <td>{job.jobTitle}</td>
              <td>{job.location}</td>
              <td>{job.experience}</td>
              <td>{job.payScale}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(job.jobId)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(job.jobId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Job Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job Posting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={updatedJobDetails.jobTitle}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                name="jobDescription"
                rows={4}
                value={updatedJobDetails.jobDescription}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={updatedJobDetails.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience (Years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={updatedJobDetails.experience}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pay Scale</Form.Label>
              <Form.Control
                type="text"
                name="payScale"
                value={updatedJobDetails.payScale}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Responsibilities</Form.Label>
              <Form.Control
                as="textarea"
                name="responsibilities"
                rows={3}
                value={updatedJobDetails.responsibilities}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control
                type="text"
                name="skills"
                value={updatedJobDetails.skills}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateJob}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageJobs;
