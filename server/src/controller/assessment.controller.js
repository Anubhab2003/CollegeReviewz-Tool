// controller/assessment.controller.js
import StudentProfile from "../models/StudentProfile.model.js";
import { scoreSignals } from "../assessment/signal.scorer.js";
import { normalizeSignals } from "../assessment/signal.normalizer.js";
import { assessCareers } from "../assessment/assessmentEngine.js";
import careersMaster from "../data/careers.list.js";
import { generateAssessmentReport } from "../services/report.generator.js";

export const runAssessment = async (req, res) => {
  try {
    const { studentId, profileData, answers } = req.body;

    if (!studentId || !profileData || !answers) {
      return res.status(400).json({ success: false });
    }

    const rawSignals = scoreSignals(answers);
    const normalizedSignals = normalizeSignals(rawSignals);

    const engineResult = assessCareers({
      normalizedSignals,
      careerList: careersMaster,
      studentStream: profileData.stream
    });

    // 🔗 ENRICH CAREERS (CRITICAL)
    const enrichedCareers = engineResult.careers.map((c) => {
      const full = careersMaster.find(fc => fc.id === c.careerId);

      if (!full) {
        return {
          name: "Foundational Career Path",
          tier: c.tier,
          compatibilityScore: c.compatibilityScore,
          examplesIndia: ["General degree", "Skill programs"],
          exams: [],
          roadmap: [
            "Strengthen fundamentals",
            "Explore interests",
            "Skill-based learning"
          ],
          whyRecommended: ["Safe starting point"],
          whyNotRecommended: []
        };
      }

      return {
        ...full,
        tier: c.tier,
        compatibilityScore: c.compatibilityScore
      };
    });

    const studentProfile = await StudentProfile.create({
      studentId,
      ...profileData,
      assessmentSignals: normalizedSignals,
      globalScore: engineResult.Global_Normalized_Score
    });

    const reportPath = generateAssessmentReport({
      studentProfile,
      signals: normalizedSignals,
      careers: enrichedCareers
    });

    res.json({
      success: true,
      reportPath,
      careers: enrichedCareers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
