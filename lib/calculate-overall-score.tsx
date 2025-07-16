
export const calculateOverallScore = (dimensions: any[]) => {
  const totalRatings = dimensions.reduce(
    (acc, dim) => acc + Number(dim.rating),
    0
  );
  const averageScore = totalRatings / dimensions.length;
  return averageScore.toFixed(1);
};