const tf = require('@tensorflow/tfjs-node');
const ResponseError = require('../../errors/response-error');

async function predict(model, image) {
  try {
    const tensor = tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['BrownSpot', 'Healthy', 'Hispa', 'LeafBlast'];
    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const disease = classes[classResult];

    return { disease, confidenceScore };

  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message);
  }
}

module.exports = predict;