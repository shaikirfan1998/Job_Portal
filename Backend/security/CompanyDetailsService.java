package com.web.JobPortal.security;

import com.web.JobPortal.model.Company;
import com.web.JobPortal.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


public class CompanyDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private CompanyRepository companyRepository;  // Company repository to access the database

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Load company by email
        Company company = companyRepository.findByCompanyEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Company not found with email: " + email));

        // Return UserDetails for Company (You can customize this part if needed)
        return User.builder()
            .username(company.getCompanyEmail())
            .password(company.getPassword())
            .roles("COMPANY")  // Assign role as 'COMPANY'
            .build();
    }
}
