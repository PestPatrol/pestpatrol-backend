const user = require('../users/user');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generate-token');
const ResponseError = require('../../errors/response-error');

async function loginService (req){
  try {
    const userData = await user.getUserByField('email', req.body.email);
    if (!userData) {
      throw new ResponseError('User not found', 404);
    }

    const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
    if (!passwordMatch) {
      throw new ResponseError('Incorrect password', 401);
    }

    const token = generateToken(userData.userId);
    return token;

  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}


module.exports = loginService;

