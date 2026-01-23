import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";
import ProfileForm from "../components/ProfileForm";
import Questionnaire from "../components/Questionnaire";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";
import { fetchQuestionnaire, runAssessment } from "../api/assessment.api";
import { buildPayload } from "../utils/payloadBuilder";

export default function AssessmentPage() {
  const [step, setStep] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  /* 🌙 Dark mode */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* STEP 1 */
  const handleProfileSubmit = async (profile) => {
    setLoading(true);
    setProfileData(profile);

    try {
      const res = await fetchQuestionnaire(profile.currentClass);
      setQuestions(res.data.questions);
      setStep("questions");
    } catch {
      setAlert("Failed to load questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* STEP 2 */
  const handleAssessmentSubmit = async (answers) => {
    setLoading(true);

    try {
      const payload = buildPayload({ profileData, answers });
      const res = await runAssessment(payload);

      navigate("/report", {
        state: { reportUrl: res.data.reportUrl },
      });
    } catch {
      setAlert("Assessment failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300
        ${
          darkMode
            ? "bg-gradient-to-br from-[#020617] to-[#0f172a]"
            : "bg-gradient-to-br from-slate-100 to-white"
        }`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <AlertBox message={alert} onClose={() => setAlert("")} />

      {loading && <Loader />}

      <AnimatedPageWrapper>
        {step === "profile" && (
          <ProfileForm onSubmit={handleProfileSubmit} setAlert={setAlert} />
        )}

        {step === "questions" && (
          <Questionnaire
            questions={questions}
            onSubmit={handleAssessmentSubmit}
          />
        )}
      </AnimatedPageWrapper>
    </div>
  );
}
