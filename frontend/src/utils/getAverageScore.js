export function getAverageScore(idea) {
  if (!idea.judgments) return 0;

  const scores = Object.values(idea.judgments);

  if (scores.length === 0) return 0;

  let total = 0;
  let count = 0;

  scores.forEach((judgment) => {
    Object.values(judgment).forEach((score) => {
      total += score;
      count++;
    });
  });

  return count === 0 ? 0 : total / count;
}
