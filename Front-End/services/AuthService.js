import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const API_URL = 'http://localhost:8080/auth/'; // Adjust this URL to your backend

const COMPANY_API_URL = 'http://localhost:8080/auth/companies/';

const register = async (userData) => {
  return await axios.post(API_URL + 'register', userData);
};

const login = async (credentials) => {
  // return await axios.post(API_URL + 'login', credentials);
  const response = await axios.post(API_URL + 'login', credentials);
  
      const token = response.data.jwtToken; // Access the JWT token from the response

      // Store the token in localStorage
      localStorage.setItem('token', token);
    const userDetails = jwtDecode(token);
    console.log(userDetails);
    if(userDetails.role=="ROLE_COMPANY") {
      localStorage.setItem('role','manager');
    }
    else{
      localStorage.setItem('role','seeker');
    }
    return userDetails; // Return the user data
};

const registerCompany = async (companyData) => {
  const response = await axios.post(`http://localhost:8080/companies/register`, companyData);
  return response.data; // Return the registered company data
};

// New login method for companies (hiring managers)
const loginCompany = async (credentials) => {
  // Log in as a hiring manager (Company)
  const response = await axios.post(COMPANY_API_URL + 'login', credentials);
  const token = response.data.jwtToken; // Access the JWT token from the response

  // Store the token in localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('role','manager');
  const companyDetails = jwtDecode(token); // Decode the company details from the JWT token
  return companyDetails; // Return the company data
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

const getCurrentUser = async () => {
  return await axios.get(API_URL + 'current-user');
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  registerCompany,
  loginCompany
};

export default AuthService;
