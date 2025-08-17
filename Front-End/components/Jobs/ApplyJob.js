import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobService from '../../services/JobService';

const ApplyJob = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [application, setApplication] = useState({
    workExperience: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      const result = await JobService.getJob(jobId);
      setJob(result.data);
    };
    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await JobService.applyToJob(jobId, application);
    alert('Application submitted!');
  };

  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Apply for {job.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Work Experience</label>
          <input
            type="text"
            name="workExperience"
            value={application.workExperience}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Apply</button>
      </form>
    </div>
  );
};

export default ApplyJob;
