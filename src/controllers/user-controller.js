const loginService = require('../services/users/login');
const registerService = require('../services/users/register');
const generateToken = require('../utils/generate-token');

const {
  forgotPassword,
  resetPassword
} = require('../services/users/password');

async function loginController(req, res) {
  try {
    const token = await loginService(req);
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        token: token
      }
    });
  } catch (error) {
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || 'Failed to login'
      });
  }
}

async function registerController(req, res) {
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
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || 'Failed to register user'
      });
  }
}

async function googleOauthController(req, res) {
  // If user is false or not authenticated using Google OAuth, return error response
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Failed to authenticate user using Google OAuth'
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

async function forgotPasswordController(req, res) {
  try {
    const {
      resetToken,
      resetTokenExpiry
    } = await forgotPassword(req);

    res.status(201)
      .json({
        success: true,
        message: 'Password reset link sent to email successfully',
        data: {
          resetToken: resetToken,
          resetTokenExpiry: resetTokenExpiry
        }
      });
  } catch (error) {
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || 'Failed in generating reset token'
      });
  }
}

async function resetPasswordController(req, res) {
  try {
    // TODO: Call service function for resetting password
    await resetPassword(req);
    res.status(200)
      .json({
        success: true,
        message: 'Password reset successfully'
      });
  } catch (error) {
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || 'Failed in resetting password'
      });
  }
}

module.exports = {
  loginController,
  registerController,
  googleOauthController,
  forgotPasswordController,
  resetPasswordController
};