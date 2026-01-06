// assessment/scoring.constants.js

export const SIGNAL_WEIGHTS = {
  RISK: 0.20,
  DISCIPLINE: 0.18,
  ACADEMIC: 0.18,
  COGNITIVE: 0.15,
  FINANCE: 0.15,
  VERBAL: 0.07,
  INTEREST: 0.07 // HARD CAPPED
};

export const HARD_BLOCKS = {
  ACADEMIC: 40,
  RISK: 35,
  DISCIPLINE: 35
};

// Interest safety cap (non-negotiable)
export const INTEREST_CAP = 70; // even if user scores 100
