const User = require('../users/user');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generate-token');

const loginService = async (req) =>{
  try {
    const user = await User.getUserByEmail(req.body.email);
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      throw new Error('Password incorrect');
    }

    const token = generateToken(user.userId);
    return token;

  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}


module.exports = loginService;

