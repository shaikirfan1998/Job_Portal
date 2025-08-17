import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement

const API_URL = 'http://localhost:8080/users/'; // Updated API URL for user endpoint

const COMPANY_URL = 'http://localhost:8080/companies/';

const getProfile = async () => {
  console.log("Hello");
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  const decodedToken = jwtDecode(token); // Decode the token
  const email = decodedToken.sub; // Extract email from the token

  // Fetch the user ID based on email
  try {
    const response = await axios.get(`${API_URL}find-by-email`, {
      params: { email }, // Send the email as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    });

    const userId = response.data.userId; // Assuming the response contains userId
    return axios.get(`${API_URL}${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    });
  } catch (error) {
    throw new Error('Error fetching user profile');
  }
};

const updateProfile = async (profileData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  const decodedToken = jwtDecode(token); // Decode the token
  const email = decodedToken.sub; // Extract email from the token

  // Fetch the user ID based on email
  try {
    const response = await axios.get(`${API_URL}find-by-email`, {
      params: { email }, // Send the email as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    });

    const userId = response.data.userId; // Assuming the response contains userId
    return axios.put(`${API_URL}${userId}`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    });
  } catch (error) {
    throw new Error('Error updating user profile');
  }
};


// Get company profile by ID
const getCompanyProfile = async () => {
  console.log("Fetching company profile");

  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  const decodedToken = jwtDecode(token); // Decode the token
  const companyId = decodedToken.companyId; // Assuming the companyId is stored in the token

  try {
    const response = await axios.get(`${COMPANY_URL}${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    });
    return response.data; // Return company profile data
  } catch (error) {
    throw new Error('Error fetching company profile');
  }
};

// Update company profile
const updateCompanyProfile = async (profileData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  const decodedToken = jwtDecode(token); // Decode the token
  const companyId = decodedToken.companyId; // Assuming the companyId is stored in the token

  try {
    const response = await axios.put(`${COMPANY_URL}${companyId}`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    });
    return response.data; // Return updated company profile data
  } catch (error) {
    throw new Error('Error updating company profile');
  }
};

export default { getProfile, updateProfile, getCompanyProfile, updateCompanyProfile };
