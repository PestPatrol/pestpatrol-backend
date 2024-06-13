const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(options) {
	const transporter = nodemailer.createTransport({
		servuce: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_APP_PASSWORD
		}
	});

	const emailOptions = {
		from: {
			name: 'PestPatrol Support',
			address: process.env.GMAIL_USER
		},
		to: options.email,
		subject: options.subject,
		text: 'This is an email from PestPatrol app',
		html: options.text
	};

	transporter.sendMail(emailOptions);
}

module.exports = sendEmail;