package com.web.JobPortal.controller;

import com.web.JobPortal.model.Resume;
import com.web.JobPortal.model.User;
import com.web.JobPortal.service.ResumeService;
import com.web.JobPortal.service.UserService; // Assuming you have a service for fetching user details
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resumes")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private UserService userService;

    // Endpoint to upload a resume
    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(
            @RequestParam("resumeFile") MultipartFile file,
            @RequestParam("resumeVersion") String resumeVersion,
            @RequestParam("userId") Long userId) {

        try {
            // Fetch user by ID (assumes you have a UserService for this)
            Optional<User> userOptional = userService.getUserById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.badRequest().body("User not found.");
            }

            // Create and save the resume
            Resume resume = new Resume();
            resume.setResumeVersion(resumeVersion);
            resume.setUser(userOptional.get());
            resume.setResumeFile(file.getBytes()); // Storing file as a byte array
            
            resumeService.uploadResume(resume);

            return ResponseEntity.ok("Resume uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload resume.");
        }
    }

    // Endpoint to get all resumes for a user
    @GetMapping("/{userId}")
    public ResponseEntity<List<Resume>> getResumesByUserId(@PathVariable Long userId) {
        List<Resume> resumes = resumeService.getResumesByUserId(userId);
        System.out.println("Resume size is : ");
        System.out.println(resumes.size());
        return ResponseEntity.ok(resumes);
    }

    // Endpoint to delete a resume by ID
    @DeleteMapping("/{resumeId}")
    public ResponseEntity<String> deleteResume(@PathVariable Long resumeId) {
        Optional<Resume> resumeOptional = resumeService.getResumeById(resumeId);
        if (!resumeOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Resume not found.");
        }
        
        resumeService.deleteResume(resumeId);
        return ResponseEntity.ok("Resume deleted successfully.");
    }
    
    @GetMapping("/{resumeId}/download")
    public ResponseEntity<ByteArrayResource> downloadResume(@PathVariable Long resumeId) {
        try {
            Optional<Resume> resumeOpt = resumeService.getResumeById(resumeId);
            
            if (resumeOpt.isPresent()) {
                Resume resume = resumeOpt.get();
                
                // Get the resume file (byte array)
                byte[] resumeBytes = resume.getResumeFile();
                
                // Log the byte array length for debugging
                System.out.println("Retrieved resume file size: " + resumeBytes.length);  // Expected: 32836 bytes
                System.out.println("First 10 bytes: " + Arrays.toString(Arrays.copyOf(resumeBytes, Math.min(resumeBytes.length, 10))));
                System.out.println("Last 10 bytes: " + Arrays.toString(Arrays.copyOfRange(resumeBytes, Math.max(resumeBytes.length - 10, 0), resumeBytes.length)));
                
                // Wrap the byte array in ByteArrayResource (no stream needed)
                ByteArrayResource resource = new ByteArrayResource(resumeBytes);
                
                // Return the file with the appropriate headers
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)  // Generic binary type for any file
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"resume_" + resumeId + ".pdf\"")
                        .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(resumeBytes.length))  // Set content length header
                        .body(resource);
            } else {
                // If the resume is not found, return 404 Not Found
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            // Handle other exceptions
            System.err.println("Unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(500).body(null);  // Return 500 Internal Server Error
        }
    }

}
