package com.web.JobPortal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private JobPosting job;

    @ManyToOne
    @JoinColumn(name = "job_seeker_id", nullable = false)
    private User jobSeeker;

    @ManyToOne
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(name = "applied_at", updatable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id", nullable = false)
    private Statuses status;

	public Long getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}

	public JobPosting getJob() {
		return job;
	}

	public void setJob(JobPosting job) {
		this.job = job;
	}

	public User getJobSeeker() {
		return jobSeeker;
	}

	public void setJobSeeker(User jobSeeker) {
		this.jobSeeker = jobSeeker;
	}

	public Resume getResume() {
		return resume;
	}

	public void setResume(Resume resume) {
		this.resume = resume;
	}

	public LocalDateTime getAppliedAt() {
		return appliedAt;
	}

	public void setAppliedAt(LocalDateTime appliedAt) {
		this.appliedAt = appliedAt;
	}

	public Statuses getStatus() {
		return status;
	}

	public void setStatus(Statuses status) {
		this.status = status;
	}
	
	

    // Getters and Setters
    
}
