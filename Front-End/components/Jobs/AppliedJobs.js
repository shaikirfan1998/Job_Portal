import React, { useState, useEffect } from 'react';
import JobService from '../../services/JobService';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const result = await JobService.getAppliedJobs();
        setAppliedJobs(result.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };
    fetchAppliedJobs();
  }, []);
  // console.log(appliedJobs);

  const handleViewJobClick = async (jobId) => {
    try {
      const result = await JobService.getJobDetails(jobId); // Fetch both job details and applications
      setJobDetails(result.data); // The result contains both jobPosting and jobApplications
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };
  console.log(jobDetails);

  const handleCloseModal = () => {
    setShowModal(false);
    setJobDetails(null); // Clear job details after closing modal
  };

  return (
    <Container className="mt-5">
      <h2>Applied Jobs</h2>
      <Row className="g-4">
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <Col key={job.id} md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
                  <Card.Text>
                    <strong>Status:</strong> Pending <br />
                    <strong>Applied on:</strong> {new Date(job.appliedAt).toLocaleDateString()}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleViewJobClick(job.job.jobId)}>
                    View Job
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No applied jobs found.</p>
        )}
      </Row>

      {/* Modal to show job details and job applications */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{jobDetails?.jobPosting?.title || 'Job Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {jobDetails ? (
            <div>
              <h4>Job Posting Details</h4>
              <p><strong>Company:</strong> {jobDetails.jobPosting.company.companyName}</p>
              <p><strong>Description:</strong> {jobDetails.jobPosting.jobDescription}</p>
              <p><strong>Location:</strong> {jobDetails.jobPosting.location}</p>

              <h5>Job Applications</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Applicant:</strong> {jobDetails.jobApplications.jobSeeker.username}<br />
                      <strong>Status:</strong> {jobDetails.jobApplications.status.statusName}<br />
                      <strong>Applied on:</strong> {new Date(jobDetails.jobApplications.appliedAt).toLocaleDateString()}
                    </li>
                </ul>
            </div>
          ) : (
            <p>Loading job details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppliedJobs;
