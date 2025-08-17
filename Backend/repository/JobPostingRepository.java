package com.web.JobPortal.repository;

import com.web.JobPortal.model.JobPosting;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {

	List<JobPosting> findAllByCompanyCompanyId(Long companyId);
}
