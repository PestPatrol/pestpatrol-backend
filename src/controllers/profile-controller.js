const {
	getObjectPublicUrl,
	deleteObject
} = require('../app/gcs');

const {
	getUserById,
	updateUserById
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

		const imagePath = req.file.path;
		const imageUrl = await getObjectPublicUrl(imagePath);
		console.log('imageUrl is ', imageUrl);

		const oldUserData = {
			...await getUserById(userId)
		};
		const oldProfpicUrl = oldUserData.profpicLink;
		console.log('oldProfpicUrl is ', oldProfpicUrl);

		const updatedUserData = {
			...req.body,
			profpicLink: imageUrl
		};

		const status = await updateUserById(userId, updatedUserData);
		await deleteObject(oldProfpicUrl);

		res.status(200)
			.json({
				success: status,
				message: 'Profile edited successfully'
			});
	} catch (error) {
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