const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

/*
  NOTE: @google/generative-ai is still under development for managing permissions access to the tuned model.
  ISSUE: https://github.com/google-gemini/generative-ai-js/issues/100 
  TODO: Implement code to handle the tuned model once it becomes available
*/

async function chatbotService(req) {
  try{
    const { message } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);   
    const model = genAI.getGenerativeModel({ model: 'tunedModels/pestpatrol-aq4pa5hsyvo7' });
    const result = await model.generateContent(message);
    const responseText = result.response.candidates[0].content.parts[0].text;
    return preprocessMessage(responseText);
  } catch(error){
    console.log(error);
    throw new Error(error.message || 'Failed to get response from chatbot');
  }
}

function preprocessMessage(message){
  message = message.replace(/[\n\r\t\f\\"*#]/g, ' ');
  return message;
}

module.exports = { chatbotService };