package com.web.JobPortal.service;

import com.web.JobPortal.model.Resume;
import com.web.JobPortal.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    public Resume uploadResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    public Optional<Resume> getResumeById(Long resumeId) {
        return resumeRepository.findById(resumeId);
    }

    public List<Resume> getResumesByUserId(Long userId) {
        return resumeRepository.findAllByUserUserId(userId);
    }

    public void deleteResume(Long resumeId) {
        resumeRepository.deleteById(resumeId);
    }
}
