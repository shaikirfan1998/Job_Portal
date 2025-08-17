import axios from 'axios';

const SKILL_API_BASE_URL = 'http://localhost:8080/auth/skills'; // Update the URL as needed

class SkillService {
  // Fetch all skills from the backend
  getSkills() {
    return axios.get(SKILL_API_BASE_URL);
  }
}

export default new SkillService();
