package com.web.JobPortal.dto;

import java.time.LocalDateTime;

public class JobPostingDTO {
    private String jobTitle;
    private Integer companyId;
    private String jobDescription;
    private String location;
    private String experience;
    private String payScale;
    private String responsibilities;
    private String skills;

    public JobPostingDTO() {}

    public JobPostingDTO(String jobTitle, Integer companyId, String jobDescription, String location, String experience,
                         String payScale, String responsibilities, String skills) {
        this.jobTitle = jobTitle;
        this.companyId = companyId;
        this.jobDescription = jobDescription;
        this.location = location;
        this.experience = experience;
        this.payScale = payScale;
        this.responsibilities = responsibilities;
        this.skills = skills;
    }

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getPayScale() {
		return payScale;
	}

	public void setPayScale(String payScale) {
		this.payScale = payScale;
	}

	public String getResponsibilities() {
		return responsibilities;
	}

	public void setResponsibilities(String responsibilities) {
		this.responsibilities = responsibilities;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

    // Getters and Setters
    
}
