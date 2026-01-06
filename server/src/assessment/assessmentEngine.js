// assessment/assessmentEngine.v2.js

import {
  SIGNAL_WEIGHTS,
  HARD_BLOCKS,
  INTEREST_CAP
} from "./scoring.constants.js";

/**
 * Clamp helper
 */
const clamp = (v, min = 0, max = 100) =>
  Math.max(min, Math.min(max, v));

/**
 * Global Normalized Score (hidden)
 */
const computeGNS = (signals) => {
  let total = 0;

  for (const key in SIGNAL_WEIGHTS) {
    let value = signals[key] || 0;

    // 🔒 Hard cap interest
    if (key === "INTEREST") {
      value = Math.min(value, INTEREST_CAP);
    }

    total += value * SIGNAL_WEIGHTS[key];
  }

  return clamp(Math.round(total));
};

/**
 * Global hard elimination
 */
const failsGlobalHardRules = (signals, financeCompatible) => {
  if (signals.ACADEMIC < HARD_BLOCKS.ACADEMIC)
    return "Low academic survivability";

  if (signals.RISK < HARD_BLOCKS.RISK)
    return "Low risk absorption";

  if (signals.DISCIPLINE < HARD_BLOCKS.DISCIPLINE)
    return "Low discipline stability";

  if (!financeCompatible)
    return "Financial incompatibility";

  return null;
};

/**
 * Career Compatibility Score (CCS)
 */
const computeCCS = (signals, career) => {
  let total = 0;
  let count = 0;

  for (const key in career.minSignals) {
    const required = career.minSignals[key];
    const actual = signals[key] || 0;

    if (actual < required) {
      return {
        passed: false,
        reason: `Below required ${key} threshold`
      };
    }

    total += actual / required;
    count++;
  }

  return {
    passed: true,
    score: total / count
  };
};

/**
 * Risk dampening (anti-overconfidence)
 */
const applyRiskDampening = (ccs, signals) => {
  if (signals.RISK < 50 || signals.DISCIPLINE < 50) {
    return ccs * 0.7;
  }
  return ccs;
};

/**
 * MAIN ENGINE
 */
export const assessCareers = ({
  normalizedSignals,
  careerList,
  financeCompatible
}) => {
  const results = [];

  const gns = computeGNS(normalizedSignals);

  const globalBlock = failsGlobalHardRules(
    normalizedSignals,
    financeCompatible
  );

  if (globalBlock) {
    return {
      blocked: true,
      reason: globalBlock,
      Global_Normalized_Score: gns,
      careers: []
    };
  }

  for (const career of careerList) {
    const ccsResult = computeCCS(normalizedSignals, career);

    if (!ccsResult.passed) {
      continue;
    }

    let finalScore = applyRiskDampening(
      ccsResult.score,
      normalizedSignals
    );

    let tier = "RED";
    if (finalScore >= 1.05) tier = "GREEN";
    else if (finalScore >= 0.9) tier = "YELLOW";

    results.push({
      careerId: career.id,
      name: career.name,
      tier,
      compatibilityScore: Number(finalScore.toFixed(2)),
      explanation: career.explain(normalizedSignals)
    });
  }

  return {
    blocked: false,
    Global_Normalized_Score: gns,
    careers: results.sort(
      (a, b) => b.compatibilityScore - a.compatibilityScore
    )
  };
};
