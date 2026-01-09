const varianceBoost = (ratio) => {
  if (ratio > 0.85) return ratio * 1.05;
  if (ratio < 0.5) return ratio * 0.9;
  return ratio;
};

export const normalizeSignals = (rawSignals) => {
  const normalized = {};

  for (const key in rawSignals) {
    const { score, max } = rawSignals[key];
    if (max === 0) {
      normalized[key] = 0;
    } else {
      const ratio = varianceBoost(score / max);
      normalized[key] = Math.min(
        100,
        Number((ratio * 100).toFixed(2))
      );
    }
  }

  return normalized;
};
