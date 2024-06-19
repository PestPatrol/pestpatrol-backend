const ResponseError = require('../../errors/response-error');
const { generateResetPasswordToken } = require('../../utils/generate-reset-token');
const sendEmail = require('../../utils/send-email');
const { getUserByField, updateUserById } = require('./user');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

async function forgotPassword(req) {
	try {
		const userData = await getUserByField('email', req.body.email);
		if (!userData) throw new ResponseError('Could not find user with given email', 404);
		const userId = userData.userId;

		const {
			resetToken,
			hashedResetToken,
			resetTokenExpiry
		} = generateResetPasswordToken();

		await updateUserById(userId, {
			passwordResetToken: hashedResetToken,
			passwordResetTokenExpiry: resetTokenExpiry
		});

		const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
		const text = `
		<html>
			<body>
				<p>You are receiving this email because you (or someone else) have requested the reset of the password for your PestPatrol account.</p>
				<p>Please click on the following link, or paste this into your browser to complete the process:</p>
				<p><a href="${resetUrl}">${resetUrl}</a></p>
				<p>The link above is valid for <b>10 minutes.</b> If you did not request this, please <b>ignore this email</b> and your password will remain unchanged.</p>
			</body>
		</html>`;

		try {
			await sendEmail({
				email: userData.email,
				subject: 'PestPatrol Password Reset',
				text: text
			});
		} catch (error) {
			// If email sending fails, clear the reset token and expiry in Firestore
			await updateUserById(userId, {
				passwordResetToken: '',
				passwordResetTokenExpiry: 0
			});
			throw new ResponseError('Error sending email. Please try again later', 500);
		}

		return {
			resetToken,
			resetTokenExpiry
		};
	} catch (error) {
		console.log(error);
		throw new ResponseError('Error generating reset token', 500);
	}
}

async function resetPassword(req) {
	try {
		const resetToken = req.params.resetToken;
		const {
			newPassword,
			confirmPassword
		} = req.body;
		const hashedNewPassword = await bcrypt.hash(newPassword, 10);
		const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

		const userData = await getUserByField('passwordResetToken', hashedResetToken);
		if (!userData) throw new ResponseError('Invalid reset token', 400);
		if (userData.passwordResetTokenExpiry < Date.now()) throw new ResponseError('Reset token has expired', 400);

		if (newPassword !== confirmPassword) throw new ResponseError('Passwords do not match', 400);
		

		await updateUserById(userData.userId, {
			password: hashedNewPassword,
			passwordResetToken: '',
			passwordResetTokenExpiry: 0,
			passwordChangedAt: Date.now()
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = {
	forgotPassword,
	resetPassword
}