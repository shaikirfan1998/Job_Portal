package com.web.JobPortal.service;

import com.web.JobPortal.model.Skill;
import com.web.JobPortal.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public void deleteSkill(Long skillId) {
        skillRepository.deleteById(skillId);
    }
}
