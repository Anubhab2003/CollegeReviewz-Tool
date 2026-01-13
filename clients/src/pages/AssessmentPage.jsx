// src/pages/AssessmentPage.jsx

import React, { useState } from "react";
import questions from "../data/questions";
import { runAssessment } from "../api/assessment.api";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import { buildPayload } from "../utils/payloadBuilder";

const AssessmentPage = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    age: "",
    currentClass: "",
    stream: "",
    familyAnnualBudget: "",
    educationLoanComfort: "",
    coachingAffordability: false
  });

  const [answers, setAnswers] = useState({});

  const handleSelect = (qid, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [qid]: optionIndex
    }));
  };

  const isProfileComplete = Object.values(profileData).every(
    v => v !== "" && v !== null && v !== undefined
  );

  const handleSubmit = async () => {
    if (!isProfileComplete) {
      alert("Please complete profile before assessment");
      return;
    }

    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions");
      return;
    }

    const payload = buildPayload({
      profileData,
      answers
    });

    try {
      const res = await runAssessment(payload);
      navigate("/report", { state: res.data });
    } catch (err) {
      console.error("ASSESSMENT ERROR:", err.response?.data || err.message);
      alert("Assessment failed — check console");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Career Assessment</h1>

      <ProfileForm
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <h2>Assessment Questions</h2>

      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: 25 }}>
          <p>
            <strong>
              {q.id}. {q.text}
            </strong>
          </p>

          {q.options.map((opt, idx) => {
            const label = typeof opt === "string" ? opt : opt.label;

            return (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === idx}
                  onChange={() => handleSelect(q.id, idx)}
                />
                {" "}{label}
              </label>
            );
          })}
        </div>
      ))}

      <button onClick={handleSubmit} style={{ padding: "12px 30px" }}>
        Submit Assessment
      </button>
    </div>
  );
};

export default AssessmentPage;
