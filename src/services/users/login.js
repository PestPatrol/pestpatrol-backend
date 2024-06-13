const user = require('../users/user');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generate-token');

async function loginService (req){
  try {
    const userData = await user.getUserByField('email', req.body.email);
    if (!userData) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
    if (!passwordMatch) {
      throw new Error('Password incorrect');
    }

    const token = generateToken(userData.userId);
    return token;

  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


module.exports = loginService;

