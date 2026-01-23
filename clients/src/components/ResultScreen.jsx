import { useState, useEffect } from "react";
import Header from "../components/Header";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";
import ProfileForm from "../components/ProfileForm";
import Questionnaire from "../components/Questionnaire";
import ResultScreen from "../components/ResultScreen";
import Loader from "../components/Loader";
import { fetchQuestionnaire, runAssessment } from "../api/assessment.api";
import { buildPayload } from "../utils/payloadBuilder";

export default function AssessmentPage() {
  const [step, setStep] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleProfileSubmit = async (profile) => {
    setLoading(true);
    setProfileData(profile);

    const res = await fetchQuestionnaire(profile.currentClass);
    setQuestions(res.data.questions);
    setStep("questions");
    setLoading(false);
  };

  const handleAssessmentSubmit = async (answers) => {
    setLoading(true);
    const payload = buildPayload({ profileData, answers });
    const res = await runAssessment(payload);
    setResult(res.data);
    setStep("result");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {loading && <Loader />}

      <AnimatedPageWrapper>
        {step === "profile" && (
          <ProfileForm onSubmit={handleProfileSubmit} />
        )}

        {step === "questions" && (
          <Questionnaire
            questions={questions}
            onSubmit={handleAssessmentSubmit}
          />
        )}

        {step === "result" && <ResultScreen data={result} />}
      </AnimatedPageWrapper>
    </div>
  );
}
