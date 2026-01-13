// src/components/ProfileForm.jsx

import React from "react";

const ProfileForm = ({ profileData, setProfileData }) => {
  const handleChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h2>Student Profile</h2>

      <label>
        Age:
        <input
          type="number"
          value={profileData.age}
          onChange={e => handleChange("age", e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        Current Class:
        <select
          value={profileData.currentClass}
          onChange={e => handleChange("currentClass", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 11">Class 11</option>
          <option value="Class 12">Class 12</option>
        </select>
      </label>

      <br /><br />

      <label>
        Stream:
        <select
          value={profileData.stream}
          onChange={e => handleChange("stream", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Science">Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Arts">Arts</option>
        </select>
      </label>

      <br /><br />

      <label>
        Family Annual Budget:
        <select
          value={profileData.familyAnnualBudget}
          onChange={e => handleChange("familyAnnualBudget", e.target.value)}
        >
          <option value="">Select</option>
          <option value="1–3 Lakh">1–3 Lakh</option>
          <option value="3–6 Lakh">3–6 Lakh</option>
          <option value="6–10 Lakh">6–10 Lakh</option>
          <option value="> 10 Lakh">{"> 10 Lakh"}</option>
        </select>
      </label>

      <br /><br />

      <label>
        Education Loan Comfort:
        <select
          value={profileData.educationLoanComfort}
          onChange={e => handleChange("educationLoanComfort", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="Maybe">Maybe</option>
          <option value="No">No</option>
        </select>
      </label>

      <br /><br />

      <label>
        Coaching Affordable?
        <input
          type="checkbox"
          checked={profileData.coachingAffordability}
          onChange={e =>
            handleChange("coachingAffordability", e.target.checked)
          }
        />
      </label>
    </div>
  );
};

export default ProfileForm;
