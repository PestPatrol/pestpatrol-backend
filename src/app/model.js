const tf = require('@tensorflow/tfjs-node');
require('dotenv').config();

let model;

async function getModel() {
  if (!model) {
    console.log('Loading model...');
    model = await tf.loadLayersModel(process.env.MODEL_URL);
    console.log('Model loaded.');
  }
  console.log('Model already loaded.');
  return model;
}

module.exports = { getModel }