package com.web.JobPortal.dto;

import java.time.LocalDate;

public class UserDTO {
    private String username;
    private String email;
    private String password;
    private String role;
    private Integer skillId;
    private LocalDate dateOfBirth;

    public UserDTO() {}

    public UserDTO(String username, String email, String password, String role, Integer skillId, LocalDate dateOfBirth) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.skillId = skillId;
        this.dateOfBirth = dateOfBirth;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getSkillId() {
		return skillId;
	}

	public void setSkillId(Integer skillId) {
		this.skillId = skillId;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

    // Getters and Setters
    
}
