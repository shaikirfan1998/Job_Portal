package com.web.JobPortal.repository;

import com.web.JobPortal.model.Resume;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

	List<Resume> findAllByUserUserId(Long userId);
}
