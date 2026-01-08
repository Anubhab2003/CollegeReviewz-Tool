// assessment/assessmentEngine.js
import { SIGNAL_WEIGHTS, HARD_BLOCKS } from "./scoring.constants.js";

const clamp = (v, min = 0, max = 100) =>
  Math.max(min, Math.min(max, v));

const computeGNS = (signals) => {
  let total = 0;
  for (const key in SIGNAL_WEIGHTS) {
    total += (signals[key] || 0) * SIGNAL_WEIGHTS[key];
  }
  return clamp(Math.round(total));
};

const computeCCS = (signals, career) => {
  let total = 0;
  let count = 0;

  for (const key in career.minSignals) {
    const required = career.minSignals[key];
    const actual = signals[key] || 0;
    if (actual < required) return 0;
    total += actual / required;
    count++;
  }
  return total / count;
};

export const assessCareers = ({
  normalizedSignals,
  careerList,
  studentStream
}) => {
  const gns = computeGNS(normalizedSignals);
  const results = [];

  for (const career of careerList) {
    // 🚨 STREAM FILTER (CRITICAL FIX)
    if (
      !career.allowedStreams.includes("Any") &&
      !career.allowedStreams.includes(studentStream)
    ) {
      continue;
    }

    const ccs = computeCCS(normalizedSignals, career);
    if (ccs === 0) continue;

    let tier = "RED";
    if (ccs >= 1.05) tier = "GREEN";
    else if (ccs >= 0.9) tier = "YELLOW";

    results.push({
      careerId: career.id,
      tier,
      compatibilityScore: Math.round(ccs * 100)
    });
  }

  // SAFETY NET
  if (results.length === 0) {
    results.push({
      careerId: "FOUNDATIONAL",
      tier: "YELLOW",
      compatibilityScore: 70
    });
  }

  return {
    Global_Normalized_Score: gns,
    careers: results.sort(
      (a, b) => b.compatibilityScore - a.compatibilityScore
    )
  };
};
