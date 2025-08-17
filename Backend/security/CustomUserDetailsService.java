package com.web.JobPortal.security;

import com.web.JobPortal.model.User;
import com.web.JobPortal.model.Company;
import com.web.JobPortal.repository.UserRepository;
import com.web.JobPortal.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // First check if the email belongs to a company or a user
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // User found, return user details
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getEmail())
                    .password(user.getPassword())
                    .roles("USER") // Assign roles based on the user type
                    .build();
        }

        Company company = companyRepository.findByCompanyEmail(email);
        if (company != null) {
            // Company found, return company details
            return org.springframework.security.core.userdetails.User.builder()
                    .username(company.getCompanyEmail())
                    .password(company.getPassword())
                    .roles("COMPANY") // Assign roles based on the company type
                    .build();
        }

        // If no user or company found, throw exception
        throw new UsernameNotFoundException("User or company not found with email: " + email);
    }
}
