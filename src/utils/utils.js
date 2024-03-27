export const roundOffUptoTwo = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100;
