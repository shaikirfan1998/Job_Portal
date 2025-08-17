package com.web.JobPortal.service;

import com.web.JobPortal.model.Company;
import com.web.JobPortal.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Company registerCompany(Company company) {
        // Encode the password before saving
        String encodedPassword = passwordEncoder.encode(company.getPassword());
        company.setPassword(encodedPassword);

        // Save the company with the encoded password
        return companyRepository.save(company);
    }

    public Optional<Company> getCompanyById(Long companyId) {
        return companyRepository.findById(companyId);
    }

    public void deleteCompany(Long companyId) {
        companyRepository.deleteById(companyId);
    }

    public Company updateCompany(Company company) {
        return companyRepository.save(company);
    }
}
