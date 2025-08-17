package com.web.JobPortal.dto;

public class SkillDTO {
    private String skillName;

    public SkillDTO() {}

    public SkillDTO(String skillName) {
        this.skillName = skillName;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}
