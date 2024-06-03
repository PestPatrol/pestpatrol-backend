function dummyPredict() {
  // Get prediction result
  const labels = ['BrownSpot', 'Healthy', 'Hispa', 'LeafBlast'];
  const index = Math.floor(Math.random() * 5);

  const disease = labels[index];
  const confidenceScore = Math.floor(Math.random() * 101);

  return { disease, confidenceScore };
}

module.exports = dummyPredict;