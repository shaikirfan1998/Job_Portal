import React, { useEffect, useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import JobService from '../../services/JobService';
import ResumeService from '../../services/ResumeService';
import ProfileService from '../../services/ProfileService';

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [profile, setProfile] = useState({
    userId: '',
    username: '',
    email: '',
    dateOfBirth: '',
    skillIds: [],
  });

  useEffect(() => {
    // Fetch all jobs when the component is mounted
    JobService.getAllJobs().then(response => setJobs(response.data));

    const fetchProfile = async () => {
      try {
        const result = await ProfileService.getProfile();
        setProfile({
          ...result.data,
          skillIds: result.data.skillsIds || [],
        });
      } catch (err) {
        console.log('Failed to fetch profile.');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    // Fetch user's resumes only after the profile has been fetched
    if (profile.userId) {
      ResumeService.getResumes(profile.userId).then(response => setResumes(response.data));
    }
  }, [profile.userId]);

  const handleEnrollClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleApply = () => {
    if (!selectedResume) {
      alert('Please select a resume version');
      return;
    }

    const application = {
      jobId: selectedJob.jobId,
      jobSeeker: {
        userId: profile.userId,
      },
      resume: {
        resumeId: parseInt(selectedResume),
      },
      status: {
        id : 1,
        status: 'applied'
      },
    };

    JobService.applyToJob(selectedJob.jobId, application)
      .then(() => {
        alert('Application submitted successfully!');
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error applying to job:', error);
        alert('Failed to apply for job.');
      });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Available Jobs</h3>
      <div className="row">
        {jobs.map((job) => (
          <div key={job.jobId} className="col-md-6 mb-4">
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="font-weight-bold">{job.jobTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.company.companyName} - {job.location}
                </Card.Subtitle>
                <Card.Text>
                  <strong className="jobText">Description:</strong> {job.jobDescription}<br />
                  <strong className="jobText">Experience:</strong> {job.experience} years<br />
                  <strong className="jobText">Pay Scale:</strong> {job.payScale}<br />
                  <strong className="jobText">Responsibilities:</strong> {job.responsibilities}<br />
                  <strong className="jobText">Required Skills:</strong> {job.skills}
                </Card.Text>
                <Button variant="btn viewBtn" onClick={() => handleEnrollClick(job)}>
                  Apply Now
                </Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Posted on: {new Date(job.createdAt).toLocaleDateString()}</small>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal for applying to the job */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply to {selectedJob?.jobTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Select Resume Version</label>
            <select
              className="form-control"
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
            >
              <option value="">Select a resume</option>
              {resumes.map((resume) => (
                <option key={resume.resumeId} value={resume.resumeId}>
                  {resume.resumeVersion}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewJobs;
