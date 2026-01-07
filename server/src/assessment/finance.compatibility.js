// assessment/finance.compatibility.js

const BUDGET_MAP = {
    "< 1 Lakh": 1,
    "1–3 Lakh": 2,
    "3–6 Lakh": 3,
    "6–10 Lakh": 4,
    "> 10 Lakh": 5
  };
  
  const CAREER_COST_LEVEL = {
    LOW: 2,
    MEDIUM: 3,
    HIGH: 4
  };
  
  export const isFinanceCompatible = ({
    familyAnnualBudget,
    educationLoanComfort,
    career
  }) => {
    const budgetScore = BUDGET_MAP[familyAnnualBudget];
    const required = CAREER_COST_LEVEL[career.costLevel];
  
    if (!budgetScore || !required) return false;
  
    // If budget sufficient → OK
    if (budgetScore >= required) return true;
  
    // If budget insufficient but loan allowed
    if (educationLoanComfort === "Yes") return true;
  
    return false;
  };
  