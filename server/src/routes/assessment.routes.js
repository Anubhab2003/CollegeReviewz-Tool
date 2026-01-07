import express from "express";
import { runAssessment } from "../controllers/assessment.controller.js";

const router = express.Router();

/**
 * POST /api/assessment/run
 * Body:
 * {
 *   studentId,
 *   profileData,
 *   answers
 * }
 */
router.post("/run", runAssessment);

export default router;
