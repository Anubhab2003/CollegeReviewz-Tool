import { selectQuestionnaire } from "./questionnaire.selector.js";

export const scoreSignals = (answers, currentClass) => {
  if (!answers || typeof answers !== "object") {
    throw new Error("Invalid answers payload");
  }

  const questionnaire = selectQuestionnaire(currentClass);

  if (!Array.isArray(questionnaire) || questionnaire.length !== 60) {
    throw new Error(`Invalid questionnaire for class ${currentClass}`);
  }

  if (Object.keys(answers).length !== questionnaire.length) {
    throw new Error(
      `Answer count mismatch: expected ${questionnaire.length}, received ${Object.keys(answers).length}`
    );
  }

  const rawSignals = {};

  // 1️⃣ Max scores
  questionnaire.forEach((q) => {
    if (!rawSignals[q.section]) {
      rawSignals[q.section] = { score: 0, max: 0 };
    }

    if (q.type === "mcq") {
      rawSignals[q.section].max += q.difficulty || 1;
    }

    if (q.type === "preference" || q.type === "scenario") {
      rawSignals[q.section].max += Math.max(
        ...q.options.map(o => o.score)
      );
    }
  });

  // 2️⃣ Achieved scores
  questionnaire.forEach((q) => {
    const userAnswer = answers[q.id];
    if (userAnswer === undefined) return;

    if (q.type === "mcq") {
      if (userAnswer === q.correctOption) {
        rawSignals[q.section].score += q.difficulty || 1;
      }
    }

    if (q.type === "preference" || q.type === "scenario") {
      const selected = q.options[userAnswer];
      if (!selected) {
        throw new Error(`Invalid option index for ${q.id}`);
      }
      rawSignals[q.section].score += selected.score || 0;
    }
  });

  Object.values(rawSignals).forEach(Object.freeze);
  return Object.freeze(rawSignals);
};
