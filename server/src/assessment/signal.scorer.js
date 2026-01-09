// assessment/signal.scorer.js

import questionnaireDefinition from "./questionnaire.definition.js";

export const scoreSignals = (answers) => {
  const rawSignals = {};

  questionnaireDefinition.forEach((q) => {
    if (!rawSignals[q.section]) {
      rawSignals[q.section] = { score: 0, max: 0 };
    }

    if (q.type === "mcq") {
      const weight = q.difficulty || 1;
      rawSignals[q.section].max += weight;
    }

    if (q.type === "preference" || q.type === "scenario") {
      const maxOptionScore = Math.max(
        ...q.options.map((o) => o.score)
      );
      rawSignals[q.section].max += maxOptionScore;
    }
  });

  questionnaireDefinition.forEach((q) => {
    const userAnswer = answers[q.id];
    if (userAnswer === undefined) return;

    if (q.type === "mcq") {
      const weight = q.difficulty || 1;
      if (userAnswer === q.correctOption) {
        rawSignals[q.section].score += weight;
      }
    }

    if (q.type === "preference" || q.type === "scenario") {
      const selected = q.options[userAnswer];
      if (selected?.score) {
        rawSignals[q.section].score += selected.score;
      }
    }
  });

  return rawSignals;
};
