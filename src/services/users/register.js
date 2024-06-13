const user = require('../users/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const registerService = async (req) => {
  try {
    const existingUser = await user.getUserByField('email', req.body.email);

    if (existingUser) {
      throw new Error('User already registered');
    }
    const newUser = {
      email: req.body.email,
      fullName: req.body.fullName,
      favArticles: [],
      password: await bcrypt.hash(req.body.password, 10),
      passwordChangedAt: Date.now(),
      passwordResetToken: '',
      passwordResetTokenExpiry: '',
      predictions: [],
      profpicLink: '',
      reminders: [],
      userId: crypto.randomUUID()
    }
    return await user.createUser(newUser);
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error
  }
}

module.exports = registerService;