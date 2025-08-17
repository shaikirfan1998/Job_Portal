import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ManageCompanies = () => {
  // Static companies data for demonstration
  const companies = [
    { companyId: 1, companyName: 'Apple', email: 'contact@apple.com', location: 'California, USA' },
    { companyId: 2, companyName: 'Google', email: 'contact@google.com', location: 'Mountain View, USA' },
    { companyId: 3, companyName: 'Microsoft', email: 'contact@microsoft.com', location: 'Redmond, USA' }
  ];

  const handleEdit = (companyId) => {
    // Handle edit action here
    alert(`Edit company with ID: ${companyId}`);
  };

  const handleDelete = (companyId) => {
    // Handle delete action here
    alert(`Delete company with ID: ${companyId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Companies</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Company ID</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.companyId}>
              <td>{company.companyId}</td>
              <td>{company.companyName}</td>
              <td>{company.email}</td>
              <td>{company.location}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(company.companyId)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(company.companyId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageCompanies;
