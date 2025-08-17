import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'http://localhost:8080/job-applications/';
const token = localStorage.getItem('token'); // Retrieve token from local storage for authenticated requests

const JobService = {
   getAllJobs: async () => {
    console.log(token);
    try {
        const response = await axios.get('http://localhost:8080/job-postings', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response; // Return the response containing the data
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error; // Rethrow the error for handling elsewhere
    }},
    
  searchJobs: (searchTerm) => 
    axios.get(`${API_URL}search?term=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),

  getJob: (jobId) => 
    axios.get(`${API_URL}${jobId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),

  applyToJob: (jobId, application) => 
    axios.post(`${API_URL}${jobId}/apply`, application, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),


  postJob: (jobDetails) => 
    axios.post(`http://localhost:8080/job-postings`, jobDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),

  getAppliedJobs: async () => {
    const decodedToken = jwtDecode(localStorage.getItem('token')); // Decode the token
  const email = decodedToken.sub; // Extract email from the token

  // Fetch the user ID based on email
  try {
    const response = await axios.get(`http://localhost:8080/users/find-by-email`, {
      params: { email }, // Send the email as a query parameter
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header
      },
    });

    const userId = response.data.userId; // Assuming the response contains userId
    const appliedJobs = await axios.get(`${API_URL}job-seeker/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return appliedJobs;
  } catch (error) {
    throw new Error('Error updating user profile');
  }
    },

  getApplicationStatus: () => 
    axios.get(`${API_URL}status`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),

   getJobDetails: (jobId) => {
    return axios.get(`${API_URL}jobs/${jobId}/details`,  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }); // Modify to match your API endpoint
  },

   getApplicationStatusById(applicationId) {
    return axios.get(`${API_URL}status/${applicationId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }}); // Fetch by ID
  },

  updateJob: (jobId, jobDetails) => 
  axios.put(`http://localhost:8080/job-postings/${jobId}`, jobDetails, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),

deleteJob: (jobId) => 
  axios.delete(`http://localhost:8080/job-postings/${jobId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }),

};

export default JobService;
