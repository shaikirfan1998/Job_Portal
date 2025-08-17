package com.web.JobPortal.service;

import com.web.JobPortal.model.JobPosting;
import com.web.JobPortal.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    public JobPosting createJobPosting(JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }

    public Optional<JobPosting> getJobPostingById(Long jobId) {
        return jobPostingRepository.findById(jobId);
    }

    public List<JobPosting> getAllJobPostings() {
        return jobPostingRepository.findAll();
    }

    public void deleteJobPosting(Long jobId) {
        jobPostingRepository.deleteById(jobId);
    }

    public JobPosting updateJobPosting(JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }
    
    public List<JobPosting> getJobPostingsByCompanyId(Long companyId) {
        return jobPostingRepository.findAllByCompanyCompanyId(companyId);
    }
}
