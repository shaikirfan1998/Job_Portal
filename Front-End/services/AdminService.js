import axios from 'axios';

const API_URL = 'http://localhost:8080/admin/';

const getAllUsers = () => {
  return axios.get(API_URL + 'users');
};

const deleteUser = (userId) => {
  return axios.delete(API_URL + `users/${userId}`);
};

const getAllCompanies = () => {
  return axios.get(API_URL + 'companies');
};

const deleteCompany = (companyId) => {
  return axios.delete(API_URL + `companies/${companyId}`);
};

export default { getAllUsers, deleteUser, getAllCompanies, deleteCompany };
