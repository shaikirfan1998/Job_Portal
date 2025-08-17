import axios from 'axios';

const API_URL = 'http://localhost:8080/employer/';

const postJob = (jobDetails) => {
  return axios.post(API_URL + 'post', jobDetails);
};

const getPostedJobs = () => {
  return axios.get(API_URL + 'jobs');
};

const deleteJob = (jobId) => {
  return axios.delete(API_URL + `jobs/${jobId}`);
};

const getJobApplications = () => {
  return axios.get(API_URL + 'applications');
};

export default { postJob, getPostedJobs, deleteJob, getJobApplications };
