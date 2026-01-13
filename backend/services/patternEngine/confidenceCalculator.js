export const calculateConfidence = (matchedCount, totalEvents) => {
  if (totalEvents === 0) return 0;
  return Number((matchedCount / totalEvents).toFixed(2));
};
