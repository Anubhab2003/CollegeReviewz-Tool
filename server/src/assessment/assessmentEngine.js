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

const failsHardRules = (signals, financeCompatible) => {
  if (signals.ACADEMIC < HARD_BLOCKS.ACADEMIC)
    return "Low academic readiness";
  if (signals.RISK < HARD_BLOCKS.RISK)
    return "Low risk tolerance";
  if (signals.DISCIPLINE < HARD_BLOCKS.DISCIPLINE)
    return "Low discipline stability";
  if (!financeCompatible)
    return "Financial incompatibility";
  return null;
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
  financeCompatible
}) => {
  const gns = computeGNS(normalizedSignals);

  const hardFail = failsHardRules(normalizedSignals, financeCompatible);
  if (hardFail) {
    return {
      blocked: true,
      Global_Normalized_Score: gns,
      careers: []
    };
  }

  const results = [];

  for (const career of careerList) {
    const ccs = computeCCS(normalizedSignals, career);
    if (ccs === 0) continue;

    let tier = "RED";
    if (ccs >= 1.05) tier = "GREEN";
    else if (ccs >= 0.9) tier = "YELLOW";

    results.push({
      name: career.name,
      tier,
      compatibilityScore: Number(ccs.toFixed(2)),
      explanation: career.explain(normalizedSignals)
    });
  }

  // 🚨 CRITICAL FIX — NEVER RETURN EMPTY
  if (results.length === 0) {
    results.push({
      name: "Foundational Career Path",
      tier: "YELLOW",
      compatibilityScore: 0.75,
      explanation: [
        "Your current profile does not align with high-risk careers.",
        "A general pathway with skill-building is recommended."
      ]
    });
  }

  return {
    blocked: false,
    Global_Normalized_Score: gns,
    careers: results
  };
};
