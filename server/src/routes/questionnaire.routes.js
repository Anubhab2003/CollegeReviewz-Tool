import express from "express";
import { selectQuestionnaire } from "../assessment/questionnaire.selector.js";

const router = express.Router();

/**
 * GET /api/questionnaire/:currentClass
 * Example: /api/questionnaire/Class%209
 */
router.get("/:currentClass", (req, res) => {
  try {
    const { currentClass } = req.params;

    if (!currentClass) {
      return res.status(400).json({
        success: false,
        error: "currentClass is required"
      });
    }

    const questions = selectQuestionnaire(currentClass);

    if (!questions || !Array.isArray(questions)) {
      return res.status(404).json({
        success: false,
        error: "No questionnaire found for this class"
      });
    }

    res.json({
      success: true,
      class: currentClass,
      totalQuestions: questions.length,
      questions
    });

  } catch (err) {
    console.error("QUESTIONNAIRE ROUTE ERROR:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch questionnaire"
    });
  }
});

export default router;
