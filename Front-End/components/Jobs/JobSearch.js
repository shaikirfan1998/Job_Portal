import React, { useState, useEffect } from 'react';
import JobService from '../../services/JobService';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    const results = await JobService.searchJobs(searchTerm);
    setJobs(results.data);
  };

  return (
    <div className="container mt-5">
      <h2>Search Jobs</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <ul className="list-group">
        {jobs.map((job) => (
          <li className="list-group-item" key={job.id}>
            {job.title} - {job.companyName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSearch;
