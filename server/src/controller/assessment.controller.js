import StudentProfile from "../models/StudentProfile.model.js";
import { scoreSignals } from "../assessment/signal.scorer.js";
import { normalizeSignals } from "../assessment/signal.normalizer.js";
import { assessCareers } from "../assessment/assessmentEngine.js";
import careerList from "../data/careers.list.js";

export const runAssessment = async (req, res) => {
  try {
    const { studentId, profileData, answers } = req.body;

    // 1️⃣ Score raw signals
    const rawSignals = scoreSignals(answers);

    // 2️⃣ Normalize to 0–100
    const normalizedSignals = normalizeSignals(rawSignals);

    // 3️⃣ Finance compatibility (temporary logic)
    const financeCompatible = true; // will improve next

    // 4️⃣ Career assessment
    const result = assessCareers({
      normalizedSignals,
      careerList,
      financeCompatible
    });

    // 5️⃣ Persist student profile
    const studentProfile = await StudentProfile.create({
      studentId,
      ...profileData,
      assessmentSignals: {
        cognitive: normalizedSignals.COGNITIVE,
        numeracy: normalizedSignals.NUMERACY,
        academic: normalizedSignals.ACADEMIC,
        verbal: normalizedSignals.VERBAL,
        interest: normalizedSignals.INTEREST,
        discipline: normalizedSignals.DISCIPLINE,
        risk: normalizedSignals.RISK,
        finance: 0 // computed later
      },
      globalScore: result.Global_Normalized_Score
    });

    return res.json({
      success: true,
      assessmentId: studentProfile._id,
      careers: result.careers,
      blocked: result.blocked,
      reason: result.reason || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Assessment failed" });
  }
};
