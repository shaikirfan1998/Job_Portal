package com.web.JobPortal.dto;

public class CompanyDTO {
    private String companyName;
    private String companyEmail;
    private String password;
    private String location;

    public CompanyDTO() {}

    public CompanyDTO(String companyName, String companyEmail, String password, String location) {
        this.companyName = companyName;
        this.companyEmail = companyEmail;
        this.password = password;
        this.location = location;
    }

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyEmail() {
		return companyEmail;
	}

	public void setCompanyEmail(String companyEmail) {
		this.companyEmail = companyEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

    // Getters and Setters
    
}
