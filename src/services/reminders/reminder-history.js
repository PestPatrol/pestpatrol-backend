const db = require('../../app/firestore');
const remindersCollection = db.collection('reminders');
const { getUserById } = require('../users/user');

async function getReminderHistoryById(reminderId) {
	try {
		const reminderDoc = await remindersCollection.doc(reminderId).get();
		const reminderData = reminderDoc.data();

		return {
			reminderId: reminderId,
			...reminderData
		};
	} catch (error) {
		throw new Error('Failed getting reminder history data');
	}
}

async function getReminderHistoryByUserId(userId) {
	try {
		const user = await getUserById(userId);

		const reminderIdList = user.reminders;
		if (!reminderIdList) return null;

		const remindersDocList = [];

		for (const reminderId of reminderIdList) {
			const reminderDoc = await getReminderHistoryById(reminderId);
			if (reminderDoc) remindersDocList.push(reminderDoc);
		}

		return remindersDocList;
	} catch (error) {
		console.error('Error getting reminder history by user id', error);
		throw new Error('Failed to get user\'s reminder history')
	}
}

module.exports = {
	getReminderHistoryById,
	getReminderHistoryByUserId
};