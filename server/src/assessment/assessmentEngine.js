// assessment/assessmentEngine.js

/* ───────────────── STREAM ECOSYSTEM ───────────────── */

const STREAM_PRIORITY = {
  Science: [
    "ENGINEERING_TECH",
    "MEDICAL_HEALTH",
    "SCIENCE_RESEARCH",
    "AVIATION_MAINTENANCE",
    "ARMED_FORCES"
  ],

  Commerce: [
    "FINANCE_COMMERCE",
    "MANAGEMENT_BUSINESS",
    "ENTREPRENEURSHIP_STARTUP",
    "HOSPITALITY_HOTEL"
  ],

  Arts: [
    "HUMANITIES_SOCIAL",
    "CREATIVE_MEDIA",
    "LAW_LEGAL",
    "EDUCATION_TEACHING",
    "HOSPITALITY_HOTEL"
  ]
};

/* ───────────────── UTIL ───────────────── */

const clamp = (v, min = 0, max = 100) =>
  Math.max(min, Math.min(max, v));

const isNumber = (v) => typeof v === "number" && !Number.isNaN(v);

/* ───────────────── GLOBAL SCORE ───────────────── */

const computeGlobalScore = (s) => {
  const w = {
    COGNITIVE: 0.2,
    NUMERACY: 0.15,
    ACADEMIC: 0.2,
    DISCIPLINE: 0.15,
    RISK: 0.15,
    INTEREST: 0.1,
    VERBAL: 0.05
  };

  let total = 0;
  for (const k in w) {
    total += (isNumber(s[k]) ? s[k] : 0) * w[k];
  }

  return clamp(Math.round(total));
};

/* ───────────────── HARD SUBJECT GATES ───────────────── */
/**
 * ABSOLUTE GATES — cannot be bypassed
 */
const SUBJECT_GATES = {
  ENGINEERING_TECH: (s) =>
    isNumber(s.NUMERACY) && isNumber(s.COGNITIVE) &&
    s.NUMERACY >= 55 && s.COGNITIVE >= 55,

  MEDICAL_HEALTH: (s) =>
    isNumber(s.ACADEMIC) && isNumber(s.DISCIPLINE) &&
    s.ACADEMIC >= 60 && s.DISCIPLINE >= 60,

  SCIENCE_RESEARCH: (s) =>
    isNumber(s.ACADEMIC) && isNumber(s.COGNITIVE) &&
    s.ACADEMIC >= 70 && s.COGNITIVE >= 65,

  ARMED_FORCES: (s) =>
    isNumber(s.DISCIPLINE) && isNumber(s.RISK) &&
    s.DISCIPLINE >= 75 && s.RISK >= 70,

  AVIATION_MAINTENANCE: (s) =>
    isNumber(s.DISCIPLINE) && isNumber(s.RISK) &&
    s.DISCIPLINE >= 75 && s.RISK >= 65,

  FINANCE_COMMERCE: (s) =>
    isNumber(s.NUMERACY) && isNumber(s.DISCIPLINE) &&
    s.NUMERACY >= 70 && s.DISCIPLINE >= 65,

  MANAGEMENT_BUSINESS: (s) =>
    isNumber(s.VERBAL) && isNumber(s.COGNITIVE) &&
    s.VERBAL >= 60 && s.COGNITIVE >= 60,

  ENTREPRENEURSHIP_STARTUP: (s) =>
    isNumber(s.RISK) && isNumber(s.COGNITIVE) && isNumber(s.INTEREST) &&
    s.RISK >= 70 && s.COGNITIVE >= 60 && s.INTEREST >= 65,

  HUMANITIES_SOCIAL: (s) =>
    isNumber(s.VERBAL) && isNumber(s.INTEREST) &&
    s.VERBAL >= 65 && s.INTEREST >= 70,

  CREATIVE_MEDIA: (s) =>
    isNumber(s.INTEREST) && s.INTEREST >= 65,

  EDUCATION_TEACHING: (s) =>
    isNumber(s.VERBAL) && isNumber(s.DISCIPLINE) &&
    s.VERBAL >= 70 && s.DISCIPLINE >= 60,

  LAW_LEGAL: (s) =>
    isNumber(s.VERBAL) && isNumber(s.COGNITIVE) &&
    s.VERBAL >= 75 && s.COGNITIVE >= 65,

  HOSPITALITY_HOTEL: (s) =>
    isNumber(s.INTEREST) && isNumber(s.DISCIPLINE) &&
    s.INTEREST >= 55 && s.DISCIPLINE >= 40
};

/* ───────────────── CCS ───────────────── */

const computeCCS = (signals, career) => {
  let sum = 0;
  let count = 0;

  for (const key in career.minSignals) {
    const required = career.minSignals[key];
    const actual = signals[key];

    if (!isNumber(actual)) return 0;
    if (actual < required * 0.75) return 0;

    sum += Math.min(actual / required, 1.1);
    count++;
  }

  return count ? sum / count : 0;
};

/* ───────────────── MAIN ENGINE ───────────────── */

export const assessCareers = ({
  normalizedSignals,
  careerList,
  studentStream
}) => {
  const results = [];
  const primary = STREAM_PRIORITY[studentStream] || [];

  const globalScore = computeGlobalScore(normalizedSignals);

  for (const career of careerList) {
    /* STREAM BLOCK */
    if (
      career.allowedStreams &&
      !career.allowedStreams.includes("Any") &&
      !career.allowedStreams.includes(studentStream)
    ) continue;

    /* HARD GATE */
    if (SUBJECT_GATES[career.id]) {
      const pass = SUBJECT_GATES[career.id](normalizedSignals);
      if (pass !== true) continue;
    }

    /* COMPATIBILITY */
    let ccs = computeCCS(normalizedSignals, career);
    if (ccs === 0) continue;

    /* SECONDARY PENALTY */
    if (!primary.includes(career.id)) {
      ccs *= 0.7;
    }

    let tier = "RED";
    if (ccs >= 1.0) tier = "GREEN";
    else if (ccs >= 0.85) tier = "YELLOW";

    results.push({
      careerId: career.id,
      tier,
      compatibilityScore: clamp(Math.round(ccs * 100))
    });
  }

  /* SAFETY NET */
  if (results.length < 2 && primary.length) {
    primary.forEach((id, i) => {
      if (!results.find(r => r.careerId === id)) {
        results.push({
          careerId: id,
          tier: "RED",
          compatibilityScore: 55 - i * 5
        });
      }
    });
  }

  return {
    blocked: false,
    globalScore,
    careers: results.sort((a, b) => b.compatibilityScore - a.compatibilityScore)
  };
};
