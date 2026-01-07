// src/data/careers.list.js

const careers = [
  // ───────── MEDICAL ─────────
  {
    id: "MBBS",
    name: "Doctor (MBBS)",
    minSignals: {
      ACADEMIC: 65,
      DISCIPLINE: 60,
      RISK: 55,
      COGNITIVE: 60,
      FINANCE: 65
    },
    durationYears: 6,
    costLevel: "HIGH",

    explain: (signals) => {
      const reasons = [];
      if (signals.ACADEMIC >= 70)
        reasons.push("Strong science academic foundation");
      if (signals.DISCIPLINE >= 60)
        reasons.push("High long-term discipline and patience");
      if (signals.RISK < 60)
        reasons.push("Very high competition — backups essential");
      reasons.push("Delayed income with long training period");
      return reasons;
    }
  },

  // ───────── ENGINEERING ─────────
  {
    id: "ENGINEERING",
    name: "Engineering (B.Tech)",
    minSignals: {
      COGNITIVE: 60,
      NUMERACY: 55,
      DISCIPLINE: 50,
      RISK: 45,
      FINANCE: 50
    },
    durationYears: 4,
    costLevel: "MEDIUM",

    explain: (signals) => {
      const reasons = [];
      if (signals.COGNITIVE >= 65)
        reasons.push("Strong logical problem-solving ability");
      if (signals.NUMERACY >= 55)
        reasons.push("Adequate quantitative comfort");
      if (signals.DISCIPLINE < 55)
        reasons.push("Consistency improvement recommended");
      reasons.push("Multiple specialization and exit options");
      return reasons;
    }
  },

  // ───────── SKILL TECH ─────────
  {
    id: "SKILL_TECH",
    name: "Skill-Based Tech (Web / Data / Cloud)",
    minSignals: {
      COGNITIVE: 55,
      DISCIPLINE: 50,
      RISK: 35,
      FINANCE: 35
    },
    durationYears: 1,
    costLevel: "LOW",

    explain: () => [
      "Faster entry into job market",
      "Low financial burden",
      "Requires self-discipline and continuous learning"
    ]
  },

  // ───────── COMMERCE ─────────
  {
    id: "COMMERCE_GENERAL",
    name: "Commerce (B.Com / Accounting)",
    minSignals: {
      ACADEMIC: 50,
      NUMERACY: 50,
      DISCIPLINE: 45,
      FINANCE: 40
    },
    durationYears: 3,
    costLevel: "LOW",

    explain: () => [
      "Stable academic pathway",
      "Lower competition pressure",
      "Good base for CA / MBA / Finance roles"
    ]
  },

  // ───────── CA / CFA ─────────
  {
    id: "CHARTERED_ACCOUNTANT",
    name: "Chartered Accountant (CA)",
    minSignals: {
      ACADEMIC: 65,
      DISCIPLINE: 65,
      RISK: 60,
      NUMERACY: 60,
      FINANCE: 45
    },
    durationYears: 5,
    costLevel: "LOW",

    explain: () => [
      "High failure rate — resilience is critical",
      "Long preparation with delayed rewards",
      "Strong financial and audit career payoff"
    ]
  },

  // ───────── GOVERNMENT ─────────
  {
    id: "GOVT_EXAMS",
    name: "Government Exams (SSC / Banking / State PSC)",
    minSignals: {
      ACADEMIC: 50,
      DISCIPLINE: 60,
      RISK: 55,
      FINANCE: 40
    },
    durationYears: 3,
    costLevel: "LOW",

    explain: () => [
      "Uncertain timelines and high competition",
      "Stable career if cleared",
      "Backups strongly recommended"
    ]
  },

  // ───────── MANAGEMENT ─────────
  {
    id: "MBA",
    name: "Management (MBA)",
    minSignals: {
      COGNITIVE: 55,
      VERBAL: 55,
      DISCIPLINE: 50,
      FINANCE: 60,
      RISK: 45
    },
    durationYears: 2,
    costLevel: "HIGH",

    explain: () => [
      "Strong communication and leadership required",
      "ROI depends on institute quality",
      "Networking plays major role"
    ]
  },

  // ───────── CREATIVE ─────────
  {
    id: "CREATIVE_FIELDS",
    name: "Creative Fields (Design / Media / Content)",
    minSignals: {
      INTEREST: 65,
      RISK: 55,
      DISCIPLINE: 45,
      FINANCE: 40
    },
    durationYears: 3,
    costLevel: "MEDIUM",

    explain: () => [
      "Portfolio matters more than degrees",
      "Income instability initially",
      "High upside for persistent creators"
    ]
  },

  // ───────── ENTREPRENEURSHIP ─────────
  {
    id: "ENTREPRENEURSHIP",
    name: "Entrepreneurship / Startup",
    minSignals: {
      RISK: 70,
      DISCIPLINE: 60,
      COGNITIVE: 55,
      FINANCE: 50
    },
    durationYears: 0,
    costLevel: "VARIABLE",

    explain: () => [
      "High uncertainty and failure risk",
      "Self-motivation is non-negotiable",
      "Strong learning-by-doing path"
    ]
  }
];

export default careers;
