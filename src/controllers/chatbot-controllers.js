const { chatbotService } = require('../services/chatbots/chatbot');

async function chatbotController(req, res) {
  try {
    const responseText = await chatbotService(req);
    return res.status(200).json({
      success: true,
      message: 'Success get response from chatbot',
      data: {
        response: responseText
      }
    });
  } catch (error) {
    return res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message,
      });
  }
}

module.exports = { chatbotController };