package com.web.JobPortal.controller;

import com.web.JobPortal.model.JobPosting;
import com.web.JobPortal.service.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/job-postings")
public class JobPostingController {

    @Autowired
    private JobPostingService jobPostingService;

    @PostMapping
    public ResponseEntity<JobPosting> createJobPosting(@RequestBody JobPosting jobPosting) {
        return ResponseEntity.ok(jobPostingService.createJobPosting(jobPosting));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPosting> getJobPosting(@PathVariable Long id) {
        Optional<JobPosting> jobPosting = jobPostingService.getJobPostingById(id);
        return jobPosting.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<JobPosting>> getAllJobPostings() {
        return ResponseEntity.ok(jobPostingService.getAllJobPostings());
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobPosting> updateJobPosting(@PathVariable Long id, @RequestBody JobPosting updatedJobPosting) {
        return ResponseEntity.ok(jobPostingService.updateJobPosting(updatedJobPosting));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobPosting(@PathVariable Long id) {
        jobPostingService.deleteJobPosting(id);
        return ResponseEntity.noContent().build();
    }
}
