const loginService = require('../service/user/login');
const registerService = require('../service/user/register');
const generateToken = require('../utils/generate-token');

const loginController = async (req, res) => {
  try {
    const token = await loginService(req);
    res.status(200).json({
      success: true,
      messsage: 'User logged in successfully',
      data: {
        token: token
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to log in user: ' + error.message
    });
  }
}

const registerController = async (req, res) => {
  try {
    const user = await registerService(req);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to register user: ' + error.message
    });
  }
}

const googleOauthController = async (req, res) => {

  // If user is false or not authenticated using Google OAuth, return error response
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Failed to authenticate user using Google OAuth:'
    });
  }

  // If user is authenticated using Google OAuth, generate token and send token in response
  const token = generateToken(req.user.userId);
  return res.status(200).json({
    success: true,
    message: 'User authenticated using Google OAuth successfully',
    data: {
      token: token
    },
  });
}

module.exports = { loginController, registerController, googleOauthController }