const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function chatbotController(req, res) {
  const { message } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  const result = await model.generateContent(message);

  const responseText = await result.response;
  console.log(responseText);
  console.log(result)
  return res.status(200).json({
    success: true,
    message: 'Success get response from chatbot',
    data: {
      response: responseText
    }
  });
}

module.exports = { chatbotController };