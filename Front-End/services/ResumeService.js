import axios from 'axios';

const API_URL = 'http://localhost:8080/';
const token = localStorage.getItem('token');

const ResumeService = {
  getResumes: (userId) => axios.get(`${API_URL}resumes/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  uploadResume: (formData) => axios.post(`${API_URL}resumes/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  deleteResume: (resumeId) => axios.delete(`${API_URL}resumes/${resumeId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  downloadResume: (resumeId) => axios.get(`${API_URL}resumes/${resumeId}/download`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    responseType: 'blob',  // Ensure the response is a blob (binary data)
  }),
};

export default ResumeService;
