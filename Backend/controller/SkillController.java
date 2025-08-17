package com.web.JobPortal.controller;

import com.web.JobPortal.model.Skill;
import com.web.JobPortal.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth/skills")
@CrossOrigin(origins = "http://localhost:3000")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Endpoint to add a new skill
    @PostMapping
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill) {
        Skill newSkill = skillService.addSkill(skill);
        return ResponseEntity.ok(newSkill);
    }

    // Endpoint to get all skills
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkills();
        return ResponseEntity.ok(skills);
    }

    // Endpoint to delete a skill by ID
    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long skillId) {
        skillService.deleteSkill(skillId);
        return ResponseEntity.noContent().build();
    }
}
