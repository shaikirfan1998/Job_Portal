import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ViewUserApplications = ({ companyId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Fetch job applications for a specific company
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/job-applications/company/${currentUser?.companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data);
      } catch (error) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [companyId]);

  // Handler for Shortlist action
  const handleShortlist = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8080/job-applications/${applicationId}/update-status?status=shortlisted`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update local state with new status
      setApplications(prevApps =>
        prevApps.map(app =>
          app.applicationId === applicationId ? { ...app, status: { statusName: 'Shortlisted' } } : app
        )
      );
    } catch (error) {
      alert('Failed to shortlist the application');
    }
  };

  // Handler for Reject action
  const handleReject = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8080/job-applications/${applicationId}/update-status?status=rejected`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update local state with new status
      setApplications(prevApps =>
        prevApps.map(app =>
          app.applicationId === applicationId ? { ...app, status: { statusName: 'Rejected' } } : app
        )
      );
    } catch (error) {
      alert('Failed to reject the application');
    }
  };

  // Render loading state, error, or table with applications
  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>View User Applications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>User Name</th>
            <th>Resume Version</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Applied At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.applicationId}>
              <td>{application.applicationId}</td>
              <td>{application.jobSeeker.username}</td> {/* Assuming the job seeker name is available */}
              <td>{application.resume.resumeVersion}</td> {/* Assuming resume version is available */}
              <td>{application.job.jobTitle}</td> {/* Assuming job title is available */}
              <td>{application.status.statusName}</td> {/* Assuming status is available */}
              <td>{application.appliedAt}</td> {/* Display applied date */}
              <td>
                <Button
                  variant="success"
                  className="me-2"
                  disabled="application.status.statusName!='applied'"
                  onClick={() => handleShortlist(application.applicationId)}
                >
                  Shortlist
                </Button>
                <Button
                  variant="danger"
                  disabled="application.status.statusName!='applied'"
                  onClick={() => handleReject(application.applicationId)}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewUserApplications;
