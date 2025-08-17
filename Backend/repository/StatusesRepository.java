package com.web.JobPortal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.JobPortal.model.Statuses;

@Repository
public interface StatusesRepository extends JpaRepository<Statuses, Long> {

	Statuses findByStatus(String status);
}
