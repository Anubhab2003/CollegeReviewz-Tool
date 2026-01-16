import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import questions from "../data/questions";
import { runAssessment } from "../api/assessment.api";
import { useNavigate } from "react-router-dom";
import { buildPayload } from "../utils/payloadBuilder";
import logo from "../assets/basiclogo1.png";

/* 🔹 SMOOTH PAGE TRANSITION (LESS BOUNCE) */
const fadeBounce = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25 },
  },
};

/* 🔹 SUBTLE BUTTON INTERACTION */
const buttonBounce = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
};

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true); // default dark
  const [step, setStep] = useState("profile");
  const [isMobile, setIsMobile] = useState(false);

  /** PROFILE DATA */
  const [profileData, setProfileData] = useState({
    age: "",
    currentClass: "",
    stream: "",
    familyAnnualBudget: "",
    educationLoanComfort: "",
    coachingAffordability: false,
  });

  const [answers, setAnswers] = useState({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  /** DARK MODE TOGGLE */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /** CHECK MOBILE VIEW */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** PROFILE HANDLER */
  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isProfileComplete = Object.entries(profileData).every(
    ([key, value]) =>
      key === "coachingAffordability"
        ? typeof value === "boolean"
        : value !== ""
  );


  /** ANSWER SELECT */
  const handleSelect = (qid, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: optionIndex,
    }));
  };

  /** SUBMIT */
  const handleSubmit = async () => {
    if (!isProfileComplete) {
      alert("Please complete profile");
      return;
    }
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions");
      return;
    }
    try {
      const payload = buildPayload({ profileData, answers });
      const res = await runAssessment(payload);
      navigate("/report", { state: res.data });
    } catch (err) {
      console.error("ASSESSMENT ERROR:", err.response?.data || err.message);
      alert("Assessment failed");
    }
  };

  const currentQuestion = questions[currentQuestionIdx];
  const questionSection = currentQuestion?.section;//for questions with sections
  const progress = ((currentQuestionIdx + 1) / questions.length) * 100;

  return (
    <div
      className={`min-h-screen transition-all duration-700
        ${darkMode ? "bg-slate-900 text-white" : "bg-gradient-to-br from-yellow-100 via-yellow-50 to-white text-black"}`}
    >*/
      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 backdrop-blur-lg border-b ${
          darkMode ? "bg-black/70 border-white/20" : "bg-white/80 border-black/20"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.img
              src={logo}
              alt="CollegeReviewZ Logo"
              className="w-10 h-10 rounded-xl"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <h1
              className="font-extrabold text-xl tracking-wide select-none"
              style={{
                color: darkMode ? "#fff" : "#000",
              }}
            >
              CollegeReview
              <span style={{ color: darkMode ? "#6366f1" : "#dc2626" }}>Z</span>
            </h1>
          </div>

          <motion.button
            {...buttonBounce}
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center justify-center text-xl transition-all duration-300 ${
              isMobile ? "w-12 h-12 rounded-full" : "px-6 py-3 rounded-2xl"
            }`}
            style={{
              background: darkMode
                ? "linear-gradient(135deg, #4f46e5, #6d28d9)"
                : "#facc15",
              color: darkMode ? "#fff" : "#111827",
              boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
              textShadow: darkMode
                ? "0 1px 2px rgba(0,0,0,0.4)"
                : "0 1px 2px rgba(255,255,255,0.3)",
            }}
          >
            {darkMode
              ? isMobile
                ? "☀️"
                : "☀️ Dark Mode"
              : isMobile
              ? "🌙"
              : "🌙 Light Mode"}
          </motion.button>
        </div>
      </header>

      <div className="h-28" />

      {/* PROFILE SECTION */}
      {step === "profile" && (
        <AnimatePresence>
          <motion.section
            {...fadeBounce}
            key="profile"
            className={`max-w-4xl mx-auto backdrop-blur-xl rounded-3xl shadow-2xl p-10 ${
              darkMode ? "bg-slate-900/80" : "bg-white/90"
            }`}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              🎓 Student Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.input
                {...buttonBounce}
                name="age"
                type="number"
                placeholder="Age"
                onChange={handleProfileChange}
                className={`p-4 rounded-2xl border-2 focus:ring-2 focus:ring-indigo-500 ${
                  darkMode
                    ? "border-indigo-600 bg-slate-800 text-white"
                    : "border-indigo-300 bg-white text-black"
                }`}
              />
              <motion.select
                {...buttonBounce}
                name="currentClass"
                onChange={handleProfileChange}
                className={`p-4 rounded-2xl border-2 ${
                  darkMode
                    ? "border-indigo-600 bg-slate-800 text-white"
                    : "border-indigo-300 bg-white text-black"
                }`}
              >
                <option value="">Current Class</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper">Dropper</option>
                <option value="Undergraduate">Undergraduate</option>
              </motion.select>
              <motion.select
                {...buttonBounce}
                name="stream"
                onChange={handleProfileChange}
                className={`p-4 rounded-2xl border-2 ${
                  darkMode
                    ? "border-indigo-600 bg-slate-800 text-white"
                    : "border-indigo-300 bg-white text-black"
                }`}
              >
                <option value="">Stream</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Undecided">Undecided</option>
              </motion.select>
              {/* KEEP ALL OTHER INPUTS EXACTLY THE SAME, JUST ADD DARK/LIGHT CLASSES */}
              <motion.select
                {...buttonBounce}
                name="familyAnnualBudget"
                onChange={handleProfileChange}
                className={`p-4 rounded-2xl border-2 ${
                  darkMode
                    ? "border-indigo-600 bg-slate-800 text-white"
                    : "border-indigo-300 bg-white text-black"
                }`}
              >
                <option value="">Family Annual Budget</option>
                <option value="< 1 Lakh">&lt; 1 Lakh</option>
                <option value="1–3 Lakh">1–3 Lakh</option>
                <option value="3–6 Lakh">3–6 Lakh</option>
                <option value="6–10 Lakh">6–10 Lakh</option>
                <option value="> 10 Lakh">&gt; 10 Lakh</option>
              </motion.select>

              <motion.select
                {...buttonBounce}
                name="educationLoanComfort"
                onChange={handleProfileChange}
                className={`p-4 rounded-2xl border-2 ${
                  darkMode
                    ? "border-indigo-600 bg-slate-800 text-white"
                    : "border-indigo-300 bg-white text-black"
                }`}
              >
                <option value="">Education Loan Comfort</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
                <option value="Yes">Yes</option>
              </motion.select>

              <motion.label
                {...buttonBounce}
                className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer ${
                  darkMode
                    ? "border-indigo-600 bg-slate-800 text-white"
                    : "border-indigo-300 bg-white text-black"
                }`}
              >
                <input
                  type="checkbox"
                  name="coachingAffordability"
                  onChange={handleProfileChange}
                />
                Can afford coaching?
              </motion.label>
            </div>

            <div className="flex justify-center mt-10">
              <motion.button
                {...buttonBounce}
                disabled={!isProfileComplete}
                onClick={() => setStep("questions")}
                className="px-10 py-4 bg-indigo-500 text-white font-bold text-lg rounded-2xl disabled:opacity-50 shadow-xl"
              >
                Save & Continue →
              </motion.button>
            </div>
          </motion.section>
        </AnimatePresence>
      )}

      {/* QUESTIONS SECTION */}
      {step === "questions" && (
        <div className="max-w-4xl mx-auto px-4 pb-24">
          <div className="h-3 bg-white/40 rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* QUESTION SECTION NAME */}
{questionSection && (
  <div className="flex justify-center mb-4">
    <span
      className={`px-6 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase
        ${
          darkMode
            ? "bg-indigo-900/40 text-indigo-300"
            : "bg-indigo-100 text-indigo-700"
        }`}
    >
      {questionSection}
    </span>
  </div>
)}


          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              {...fadeBounce}
              className={`p-8 rounded-3xl shadow-2xl border-4 ${
                darkMode
                  ? "bg-slate-900 border-indigo-600 text-white"
                  : "bg-white border-indigo-300 text-black"
              }`}
            >
              <p className="text-sm opacity-70 mb-2">
                Question {currentQuestionIdx + 1} of {questions.length}
              </p>

              <h3 className="text-xl font-bold mb-6">{currentQuestion.text}</h3>

              <div className="space-y-4">
                {currentQuestion.options.map((opt, idx) => {
                  const active = answers[currentQuestion.id] === idx;
                  return (
                    <motion.label
                      {...buttonBounce}
                      key={idx}
                      className={`flex p-4 rounded-2xl border-2 cursor-pointer ${
                        active
                          ? "bg-indigo-500 text-white border-indigo-700"
                          : darkMode
                          ? "bg-slate-800 border-indigo-600 text-white"
                          : "bg-white border-indigo-300 text-black"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={active}
                        onChange={() => handleSelect(currentQuestion.id, idx)}
                        className="hidden"
                      />
                      {typeof opt === "string" ? opt : opt.label}
                    </motion.label>
                  );
                })}
              </div>

              <div className="flex justify-between mt-10">
                <motion.button
                  {...buttonBounce}
                  onClick={() => setCurrentQuestionIdx((p) => Math.max(p - 1, 0))}
                  disabled={currentQuestionIdx === 0}
                  className={`px-6 py-3 rounded-xl font-bold ${
                    darkMode ? "bg-slate-700 text-white" : "bg-slate-200 text-black"
                  }`}
                >
                  Previous
                </motion.button>

                {currentQuestionIdx < questions.length - 1 ? (
                  <motion.button
                    {...buttonBounce}
                    onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                    disabled={answers[currentQuestion.id] === undefined}
                    className={`px-6 py-3 rounded-xl font-bold ${
                      answers[currentQuestion.id] !== undefined
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Next →
                  </motion.button>
                ) : (
                  <motion.button
                    {...buttonBounce}
                    onClick={handleSubmit}
                    disabled={answers[currentQuestion.id] === undefined}
                    className={`px-6 py-3 rounded-xl font-bold ${
                      answers[currentQuestion.id] !== undefined
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Submit Assessment
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <footer
        className={`text-center py-6 text-sm opacity-60 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        © 2026 @ CollegeReviewZ
      </footer>
    </div>
  );
};

export default AssessmentPage;