// assessment/explainability.builder.js

export const buildExplainability = ({
    signals,
    career,
    blockedReason
  }) => {
    if (blockedReason) {
      return {
        summary: "This career is not recommended at this stage.",
        reasons: [blockedReason],
        advice: [
          "Consider lower-risk alternatives",
          "Improve foundational readiness first"
        ]
      };
    }
  
    const strengths = [];
    const concerns = [];
  
    if (signals.DISCIPLINE >= 60)
      strengths.push("Strong consistency and discipline");
  
    if (signals.RISK < 50)
      concerns.push("High uncertainty tolerance required");
  
    if (signals.ACADEMIC < career.minSignals.ACADEMIC)
      concerns.push("Academic readiness needs improvement");
  
    return {
      summary: "This career aligns with your current profile.",
      strengths,
      concerns,
      advice: concerns.length
        ? ["Backup options are strongly advised"]
        : ["Proceed with structured preparation"]
    };
  };
  