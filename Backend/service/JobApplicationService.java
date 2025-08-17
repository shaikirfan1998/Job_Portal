package com.web.JobPortal.service;

import com.web.JobPortal.model.JobApplication;
import com.web.JobPortal.model.JobPosting;
import com.web.JobPortal.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public JobApplication applyForJob(JobApplication jobApplication) {
        return jobApplicationRepository.save(jobApplication);
    }

    public Optional<JobApplication> getJobApplicationById(Long applicationId) {
        return jobApplicationRepository.findById(applicationId);
    }

    public List<JobApplication> getJobApplicationsByJobSeekerId(Long jobSeekerId) {
        return jobApplicationRepository.findAllByJobSeekerUserId(jobSeekerId);
    }

    public void deleteJobApplication(Long applicationId) {
        jobApplicationRepository.deleteById(applicationId);
    }
    
    public List<JobApplication> getApplicationsByJobPostings(List<JobPosting> jobPostings) {
        // Retrieve all job applications related to these job postings
        return jobApplicationRepository.findAllByJobIn(jobPostings);
    }

	public JobApplication updateJobApplication(JobApplication jobApplication) {
		return jobApplicationRepository.save(jobApplication);
	}
}
