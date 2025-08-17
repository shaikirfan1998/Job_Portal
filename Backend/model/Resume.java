package com.web.JobPortal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String resumeVersion;

    @Lob
    private byte[] resumeFile; // Or a path

    @Column(name = "uploaded_at", updatable = false)
    private LocalDateTime uploadedAt = LocalDateTime.now();

	public Long getResumeId() {
		return resumeId;
	}

	public void setResumeId(Long resumeId) {
		this.resumeId = resumeId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(LocalDateTime uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

    // Getters and Setters
    
}
