// src/data/careers.list.js

const careers = [
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
          reasons.push("High long-term discipline capability");
  
        if (signals.RISK < 60)
          reasons.push("High competition risk — backups advised");
  
        reasons.push("Delayed income, long study duration");
  
        return reasons;
      }
    },
  
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
          reasons.push("Good logical and problem-solving ability");
  
        if (signals.NUMERACY >= 55)
          reasons.push("Sufficient quantitative comfort");
  
        if (signals.DISCIPLINE < 50)
          reasons.push("Consistency improvement required");
  
        reasons.push("Multiple entry paths and exit options");
  
        return reasons;
      }
    },
  
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
  
      explain: (signals) => [
        "Faster entry to job market",
        "Lower financial risk",
        "Self-discipline is critical"
      ]
    }
  ];
  
  export default careers;
  