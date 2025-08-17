package com.web.JobPortal.controller;

import com.web.JobPortal.model.JobApplication;
import com.web.JobPortal.model.JobPosting;
import com.web.JobPortal.model.Statuses;
import com.web.JobPortal.repository.StatusesRepository;
import com.web.JobPortal.service.JobApplicationService;
import com.web.JobPortal.service.JobPostingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/job-applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;
    
    @Autowired
    private JobPostingService jobPostingService;
    
    @Autowired
    private StatusesRepository statusesRepository;

    @PostMapping
    public ResponseEntity<JobApplication> applyForJob(@RequestBody JobApplication jobApplication) {
        return ResponseEntity.ok(jobApplicationService.applyForJob(jobApplication));
    }
    
    @PostMapping("/{jobId}/apply")
    public ResponseEntity<JobApplication> applyToJob(
            @PathVariable Long jobId, 
            @RequestBody JobApplication jobApplication) {
    	System.out.println("Job Seeker is " +jobApplication.getJobSeeker().getUserId());
        JobPosting jobPosting = jobPostingService.getJobPostingById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job posting not found"));

        jobApplication.setJob(jobPosting); // Set the job reference
        jobApplication.setAppliedAt(LocalDateTime.now());

        JobApplication savedApplication = jobApplicationService.applyForJob(jobApplication);
        return ResponseEntity.ok(savedApplication);
    }


    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getJobApplication(@PathVariable Long id) {
        Optional<JobApplication> jobApplication = jobApplicationService.getJobApplicationById(id);
        return jobApplication.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/job-seeker/{jobSeekerId}")
    public ResponseEntity<List<JobApplication>> getJobApplicationsByJobSeeker(@PathVariable Long jobSeekerId) {
        return ResponseEntity.ok(jobApplicationService.getJobApplicationsByJobSeekerId(jobSeekerId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobApplication(@PathVariable Long id) {
        jobApplicationService.deleteJobApplication(id);
        return ResponseEntity.noContent().build();
    }
    
    
    @GetMapping("/jobs/{jobId}/details")
    public ResponseEntity<Map<String, Object>> getJobDetails(@PathVariable Long jobId) {
        JobPosting jobPosting = jobPostingService.getJobPostingById(jobId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job posting not found"));

        // Fetch the list of job applications for the given job
        Optional<JobApplication> jobApplications = jobApplicationService.getJobApplicationById(jobId);

        Map<String, Object> response = new HashMap<>();
        response.put("jobPosting", jobPosting);
        response.put("jobApplications", jobApplications);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/status/{id}")
    public ResponseEntity<JobApplication> getApplicationById(@PathVariable Long id) {
        Optional<JobApplication> application = jobApplicationService.getJobApplicationById(id);
        return application.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<JobApplication>> getApplicationsByCompany(@PathVariable Long companyId) {
        // Get the list of job postings by the given company
        List<JobPosting> jobPostings = jobPostingService.getJobPostingsByCompanyId(companyId);

        // Retrieve job applications related to those job postings
        List<JobApplication> applications = jobApplicationService.getApplicationsByJobPostings(jobPostings);

        return ResponseEntity.ok(applications);
    }
    
    @PutMapping("/{applicationId}/update-status")
    public ResponseEntity<JobApplication> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {

        // Fetch the job application
        Optional<JobApplication> jobApplicationOpt = jobApplicationService.getJobApplicationById(applicationId);

        if (!jobApplicationOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        JobApplication jobApplication = jobApplicationOpt.get();

        // Retrieve the status from the database using the status name
        Statuses newStatus = statusesRepository.findByStatus(status); // Assuming `findByStatusName` is implemented

        if (newStatus == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null); // Return an error if status is not found
        }

        // Set the new status to the job application
        jobApplication.setStatus(newStatus);

        // Save and update the job application
        JobApplication updatedApplication = jobApplicationService.updateJobApplication(jobApplication);
        return ResponseEntity.ok(updatedApplication);
    }

}
