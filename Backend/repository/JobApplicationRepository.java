package com.web.JobPortal.repository;

import com.web.JobPortal.model.JobApplication;
import com.web.JobPortal.model.JobPosting;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

	List<JobApplication> findAllByJobSeekerUserId(Long jobSeekerId);

	List<JobApplication> findAllByJobIn(List<JobPosting> jobPostings);
}
