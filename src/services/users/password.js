const ResponseError = require('../../errors/response-error');
const { generateResetPasswordToken } = require('../../utils/generate-reset-token');
const sendEmail = require('../../utils/send-email');
const { getUserByEmail, updateUserById } = require('./user');

async function forgotPassword(req) {
	try {
		const userData = await getUserByEmail(req.body.email);
		const userId = userData.userId;
	
		if (!userData) throw new ResponseError('Could not find user with given email', 404);

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
		const text = `<html>
			<body>
				<p>You are receiving this email because you (or someone else) have requested the reset of the password for your PestPatrol account.</p>
				<p>Please click on the following link, or paste this into your browser to complete the process:</p>
				<p><a href="${resetUrl}">${resetUrl}</a></p>
				<p>The link above is valid for 10 minutes. If you did not request this, please ignore this email and your password will remain unchanged.</p>
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
		console.log('Error in password.js:51');
		console.log(error);
		throw new ResponseError('Error generating reset token', 500);
	}
}

async function resetPassword() {
	
}

module.exports = {
	forgotPassword,
	resetPassword
}