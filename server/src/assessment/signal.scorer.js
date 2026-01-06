// assessment/signal.scorer.js

import questionnaireDefinition from "./questionnaire.definition.js";

/**
 * Builds raw signal scores from answers
 * Output format:
 * {
 *   COGNITIVE: { score, max },
 *   NUMERACY: { score, max },
 *   ...
 * }
 */
export const scoreSignals = (answers) => {
  const rawSignals = {};

  // Initialize signal buckets
  questionnaireDefinition.forEach((q) => {
    if (!rawSignals[q.section]) {
      rawSignals[q.section] = { score: 0, max: 0 };
    }

    rawSignals[q.section].max += 1;
  });

  // Score answers
  questionnaireDefinition.forEach((q) => {
    const userAnswer = answers[q.id];
    if (userAnswer === undefined) return;

    if (q.type === "mcq") {
      if (userAnswer === q.correctOption) {
        rawSignals[q.section].score += 1;
      }
    }

    if (q.type === "preference" || q.type === "scenario") {
      const selected = q.options[userAnswer];
      if (selected?.score !== undefined) {
        rawSignals[q.section].score += selected.score;
      }
    }
  });

  return rawSignals;
};
