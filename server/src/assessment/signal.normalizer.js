export const normalizeSignals = (rawSignals) => {
  const normalized = {};

  for (const key in rawSignals) {
    const { score, max } = rawSignals[key];
    normalized[key] = max === 0 ? 0 : (score / max) * 100;
  }

  return normalized;
};
