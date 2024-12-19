export const calculateScore = (
  pairs: number,
  attempts: number,
  time: number,
) => {
  const score = pairs * 1000 - attempts * 10 - time * 2;

  return Math.max(score);
};
