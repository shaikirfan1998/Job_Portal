import React, { useState } from 'react';
import JobService from '../../services/JobService';
import { Card, Button } from 'react-bootstrap';

const TrackApplicationStatus = () => {
  const [applications, setApplications] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (searchId.trim() !== '') {
      try {
        const result = await JobService.getApplicationStatusById(searchId);
        console.log(result);
        setApplications(result.data); // Show only the searched application
        setError(null);
      } catch (err) {
        setError(`Application with ID ${searchId} not found.`);
        setApplications(null);
      }
    } else {
      // If search is empty, fetch all applications
      const result = await JobService.getApplicationStatus();
      setApplications(result.data);
      setError(null);
    }
  };

  const getStatusColor = (statusName) => {
    switch (statusName.toLowerCase()) {
      case 'applied':
        return 'warning'; // Yellow for applied
      case 'rejected':
        return 'danger'; // Red for rejected
      case 'shortlisted':
        return 'success'; // Green for shortlisted
      default:
        return 'secondary'; // Default gray color
    }
  };

  return (
    <div className="container mt-5">
      <h2>Track Application Status</h2>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Application ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button className="mt-2" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      {applications && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Application Details</Card.Title>
            <Card.Text><strong>Job Title:</strong> {applications.job.jobTitle}</Card.Text>
            <Card.Text>
              <strong>Status:</strong>{' '}
              <span className={`badge bg-${getStatusColor(applications.status.statusName)}`}>
                {applications.status.statusName}
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default TrackApplicationStatus;
