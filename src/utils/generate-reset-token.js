const crypto = require('crypto');

function generateResetPasswordToken() {
	const resetToken = crypto.randomBytes(32).toString('hex');
	const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	const resetTokenExpiry = Date.now() + 10 * 60 * 1000;

	return {
		resetToken,
		hashedResetToken,
		resetTokenExpiry
	};
}

module.exports = {
	generateResetPasswordToken
};