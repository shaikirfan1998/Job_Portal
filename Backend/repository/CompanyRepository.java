package com.web.JobPortal.repository;

import com.web.JobPortal.model.Company;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

	Company findByCompanyEmail(String email);
}
