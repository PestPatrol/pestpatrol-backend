const {
	getObjectPublicUrl,
	deleteObject
} = require('../app/gcs');

const {
	getUserById,
	updateUserById,
	getUserByField
} = require('../services/users/user');

async function getProfileController(req, res) {
	try {
		const userData = await getUserById(req.user.userId);

		res.status(200)
			.json({
				success: true,
				message: 'Profile fetched successfully',
				data: {
					userId: userData.userId,
					email: userData.email,
					fullName: userData.fullName,
					profpicLink: userData.profpicLink
				}
			});
	} catch (error) {
		res.status(500)
			.json({
				success: false,
				message: 'Error when fetching profile: ' + error.message
			});
	}
}

async function editProfileController(req, res) {
	try {
		const userId = req.user.userId;

		const receivedImage = (req.file) ? true : false;
		
		let imagePath, imageUrl;
		if (receivedImage) {
			imagePath = req.file.path;
			imageUrl = await getObjectPublicUrl(imagePath);
		}

		const oldUserData = {
			...await getUserById(userId)
		};
		const oldProfpicUrl = oldUserData.profpicLink;

		const updatedUserData = {
			...req.body,
			profpicLink: (receivedImage) ? imageUrl : (oldUserData.profpicLink || '')
		};

		// If received 'email', check if it's already taken
		if (updatedUserData.email) {
			const existingUser = await getUserByField('email', updatedUserData.email);
			if (existingUser && existingUser.userId !== userId) {
				(receivedImage) && await deleteObject(imageUrl);

				return res.status(400)
					.json({
						success: false,
						message: 'Email is already taken'
					});
			}
		}

		const status = await updateUserById(userId, updatedUserData);
		(receivedImage && oldProfpicUrl) && await deleteObject(oldProfpicUrl);

		res.status(200)
			.json({
				success: status,
				message: 'Profile edited successfully'
			});
	} catch (error) {
		console.log(error);
		res.status(500)
			.json({
				success: false,
				message: 'Error when editing profile: ' + error.message
			});
	}
}

module.exports = {
	getProfileController,
	editProfileController
};