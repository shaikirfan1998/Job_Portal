import axios from 'axios';

const API_URL = 'http://localhost:8080/users/';  // Your API URL for user-related requests
const token = localStorage.getItem('token');  // Get token from localStorage

// Function to get all users
const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add Bearer token to the request headers
      },
    });
    return response.data; // Return the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // You can handle this error as needed
  }
};

// Function to get user by ID (for viewing details)
const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data; // Return the user details
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Function to delete user by ID
const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Function to update user details
const updateUser = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}${userId}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export default {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
