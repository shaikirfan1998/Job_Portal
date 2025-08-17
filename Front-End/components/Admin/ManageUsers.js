import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import UserService from '../../services/UserService';

const ManageStudents = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    email: '',
    password: '',   // Optional field for password reset
    dateOfBirth: '',
  });

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UserService.getAllUsers();  // Fetch all users
        // Filter only users with role 'job_seeker'
        const filteredUsers = usersData.filter(user => user.role === 'job_seeker');
        setUsers(filteredUsers); // Set filtered users in state
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      await UserService.deleteUser(userId);
      setUsers(users.filter((user) => user.userId !== userId)); // Remove deleted user from state
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Open modal and pre-fill with user data
  const handleEdit = (user) => {
    console.log(user);
    setSelectedUser(user);
    setUpdatedUser({
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
    });
    setShowModal(true);
  };

  // Close modal
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handle input changes in the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Save changes (update user)
  const handleSaveChanges = async () => {
    try {
      // Step 1: Build the full user object with all fields
      const userToUpdate = {
        ...selectedUser,          // Include original full user object
        ...updatedUser,           // Overwrite only updated fields (username, dateOfBirth, etc.)
      };

      // Step 2: Remove the password if it's empty (do not update password if the user doesn't provide one)
      if (!userToUpdate.password) {
        delete userToUpdate.password;  // Remove password from the object if not provided
      }

      // Step 3: Send the complete user object to the backend
      await UserService.updateUser(selectedUser.userId, userToUpdate);
      
      // Step 4: Update the user in the state
      setUsers(
        users.map((user) =>
          user.userId === selectedUser.userId ? { ...user, ...updatedUser } : user
        )
      );
      
      setShowModal(false); // Close modal after successful update
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Show loading spinner or error message
  if (loading) return <Spinner animation="border" />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Manage Students</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.userId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit User Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={updatedUser.dateOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageStudents;
