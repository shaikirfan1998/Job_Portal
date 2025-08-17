package com.web.JobPortal.controller;

import com.web.JobPortal.model.Company;
import com.web.JobPortal.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

 // Endpoint to register a company (hiring manager)
    @PostMapping("/register")
    public ResponseEntity<Company> registerCompany(@RequestBody Company company) {
        // Optionally, you could add validation or other logic here
        Company registeredCompany = companyService.registerCompany(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredCompany);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompany(@PathVariable Long id) {
        Optional<Company> company = companyService.getCompanyById(id);
        return company.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company updatedCompany) {
        return ResponseEntity.ok(companyService.updateCompany(updatedCompany));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }
}
