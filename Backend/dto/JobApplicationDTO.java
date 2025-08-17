package com.web.JobPortal.dto;

public class JobApplicationDTO {
    private Integer jobId;
    private Integer jobSeekerId;
    private Integer resumeId;

    public JobApplicationDTO() {}

    public JobApplicationDTO(Integer jobId, Integer jobSeekerId, Integer resumeId) {
        this.jobId = jobId;
        this.jobSeekerId = jobSeekerId;
        this.resumeId = resumeId;
    }

	public Integer getJobId() {
		return jobId;
	}

	public void setJobId(Integer jobId) {
		this.jobId = jobId;
	}

	public Integer getJobSeekerId() {
		return jobSeekerId;
	}

	public void setJobSeekerId(Integer jobSeekerId) {
		this.jobSeekerId = jobSeekerId;
	}

	public Integer getResumeId() {
		return resumeId;
	}

	public void setResumeId(Integer resumeId) {
		this.resumeId = resumeId;
	}

    // Getters and Setters
    
}
