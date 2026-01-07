import StudentProfile from "../models/StudentProfile.model.js";
import { scoreSignals } from "../assessment/signal.scorer.js";
import { normalizeSignals } from "../assessment/signal.normalizer.js";
import { assessCareers } from "../assessment/assessmentEngine.js";
import { generateBackups } from "../assessment/backup.generator.js";
import { generateAssessmentReport } from "../services/report.generator.js";
import careerList from "../data/careers.list.js";

export const runAssessment = async (req, res) => {
  try {
    const { studentId, profileData, answers } = req.body;

    if (!studentId || !profileData || !answers) {
      return res.status(400).json({
        success: false,
        error: "Missing assessment data"
      });
    }

    const rawSignals = scoreSignals(answers);
    const normalizedSignals = normalizeSignals(rawSignals);

    const financeCompatible = true;

    const result = assessCareers({
      normalizedSignals,
      careerList,
      financeCompatible
    });

    const backups = generateBackups(normalizedSignals);

    const studentProfile = await StudentProfile.create({
      studentId,
      ...profileData,
      assessmentSignals: normalizedSignals,
      globalScore: result.Global_Normalized_Score
    });

    const pdfPath = generateAssessmentReport({
      studentProfile,
      careers: result.careers,
      backups
    });

    res.json({
      success: true,
      careers: result.careers,
      backups,
      pdfPath
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Career assessment failed"
    });
  }
};
