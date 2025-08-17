package com.web.JobPortal.dto;

public class ResumeDTO {
    private Integer userId;
    private String resumeVersion;
    private byte[] resumeFile;  // This can be replaced with a String file path if preferred

    public ResumeDTO() {}

    public ResumeDTO(Integer userId, String resumeVersion, byte[] resumeFile) {
        this.userId = userId;
        this.resumeVersion = resumeVersion;
        this.resumeFile = resumeFile;
    }

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getResumeVersion() {
		return resumeVersion;
	}

	public void setResumeVersion(String resumeVersion) {
		this.resumeVersion = resumeVersion;
	}

	public byte[] getResumeFile() {
		return resumeFile;
	}

	public void setResumeFile(byte[] resumeFile) {
		this.resumeFile = resumeFile;
	}

    // Getters and Setters
    
}
