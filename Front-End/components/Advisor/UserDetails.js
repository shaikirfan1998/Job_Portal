import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import ResumeService from '../../services/ResumeService';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch the user details
        const userData = await UserService.getUserById(userId);
        setUser(userData);

        // Fetch the user's resumes
        const userResumes = await ResumeService.getResumes(userId);
        setResumes(userResumes.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);
  console.log(resumes);

  const handleDownloadResume = async (resumeId) => {
    try {
        // Make the request to the backend for the resume
        const response = await ResumeService.downloadResume(resumeId);

        // Create a URL for the Blob (binary data)
        const url = window.URL.createObjectURL(response.data);

        // Create an <a> element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `resume_${resumeId}.pdf`);  // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  // Clean up after the click

        // Release the Blob URL after download
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Error downloading resume:', err);
    }
};


  if (loading) return <Spinner animation="border" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>User Details</h2>
      {user && (
        <Card>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Date of Birth:</strong> {user.dateOfBirth}</ListGroup.Item>
              <ListGroup.Item><strong>Skills:</strong> {user.skillsIds}</ListGroup.Item>
              <ListGroup.Item><strong>Created At:</strong> {user.createdAt}</ListGroup.Item>
              <ListGroup.Item><strong>Updated At:</strong> {user.updatedAt}</ListGroup.Item>
            </ListGroup>

            <h5 className="mt-4">Resumes</h5>
            {resumes.length > 0 ? (
              resumes.map((resume) => (
                <div key={resume.resumeId} className="mb-3">
                  <Button
                    variant="link"
                    onClick={() => handleDownloadResume(resume.resumeId)}
                  >
                    Download Resume ({resume.resumeVersion})
                  </Button>
                </div>
              ))
            ) : (
              <p>No resumes available</p>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default UserDetails;
