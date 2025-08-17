import React, { useState, useEffect } from 'react';
import ProfileService from '../../services/ProfileService';
import SkillService from '../../services/SkillService';
import ResumeService from '../../services/ResumeService';
import { useAuth } from '../../context/AuthContext';
import Select from 'react-select';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    dateOfBirth: '',
    skillIds: [],
  });
  const [skills, setSkills] = useState([]);
  const [resumes, setResumes] = useState([]); // Resumes
  const [resumeFile, setResumeFile] = useState(null); // Resume file to upload
  const [error, setError] = useState(null);
  const { currentUser} = useAuth();

  const userRole = currentUser?.role;

  // Fetch profile and skills on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await ProfileService.getProfile();
        setProfile({
          ...result.data,
          skillIds: result.data.skillsIds || [],
        });
      } catch (err) {
        setError('Failed to fetch profile.');
      }
    };

    const fetchSkills = async () => {
      try {
        const skillResponse = await SkillService.getSkills();
        const skillOptions = skillResponse.data.map((skill) => ({
          value: skill.skillId,
          label: skill.skillName,
        }));
        setSkills(skillOptions);
      } catch (err) {
        setError('Failed to fetch skills.');
      }
    };

    fetchProfile();
    fetchSkills();
  }, []);

  // Fetch resumes when profile.userId is available
  useEffect(() => {
    if (profile.userId) {
      const fetchResumes = async () => {
        try {
          setError(null);
          const resumeResponse = await ResumeService.getResumes(profile.userId);
          setResumes(resumeResponse.data);
        } catch (err) {
          setError('Failed to fetch resumes.');
        }
      };

      fetchResumes();
    }
  }, [profile.userId]); // This will run once userId is available

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (selectedOptions) => {
    const selectedSkillIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setProfile({
      ...profile,
      skillIds: selectedSkillIds,
    });
  };

  const handleResumeFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleResumeUpload = async () => {
    const formData = new FormData();
    formData.append('resumeFile', resumeFile);
    formData.append('resumeVersion', `Version ${resumes.length + 1}`);
    formData.append('userId', profile.userId);

    try {
      setError(null);
      await ResumeService.uploadResume(formData);
      alert('Resume uploaded successfully!');
      // Refresh resume list
      const resumeResponse = await ResumeService.getResumes(profile.userId);
      setResumes(resumeResponse.data);
    } catch (err) {
      setError('Failed to upload resume.');
    }
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      await ResumeService.deleteResume(resumeId);
      alert('Resume deleted successfully!');
      // Refresh resume list
      const resumeResponse = await ResumeService.getResumes(profile.userId);
      setResumes(resumeResponse.data);
    } catch (err) {
      setError('Failed to delete resume.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillIdsString = profile.skillIds.join(',');
      await ProfileService.updateProfile({ ...profile, skillsIds: skillIdsString });
      alert('Profile updated successfully!');
    } catch (err) {
      console.log(err);
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            className="form-control"
            readOnly
          />
        </div>
        <div className="form-group mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        { userRole=='job_seeker' &&
        <div className="form-group mb-3">
          <label>Skills</label>
          <Select
            isMulti
            name="skills"
            value={skills.filter((skill) => profile.skillIds.includes(skill.value))}
            onChange={handleSkillChange}
            options={skills}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select skills"
          />
        </div>
  }
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>

      { userRole=='job_seeker' &&
      <div>
      <h3 className="mt-5">Resume Management</h3>
      <div className="form-group">
        <input type="file" onChange={handleResumeFileChange} className="form-control mb-3" />
        <button onClick={handleResumeUpload} className="btn btn-secondary">Upload Resume</button>
      </div>
      <ul className="list-group mt-3 mb-3">
        {resumes.map((resume) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={resume.resumeId}>
            {resume.resumeVersion}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteResume(resume.resumeId)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
      }
    </div>
  );
};

export default EditProfile;
