// const { GoogleGenerativeAI } = require('./google-generative-ai');
// require('dotenv').config();

// async function chatbotController(req, res) {
//   const { message } = req.body;
//   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
//   const model = genAI.getModel('tunedModels/pestpatrol-aq4pa5hsyvo7');
//   const result = await model.generateContent(message);
  
//   const responseText = await result.response.text;

//   return res.status(200).json({
//     success: true,
//     message: 'Success get response from chatbot',
//     data: {
//       response: responseText
//     }
//   });
// }

// module.exports = { chatbotController };