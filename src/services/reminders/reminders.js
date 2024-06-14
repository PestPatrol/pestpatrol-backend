const db = require('../../app/firestore');
const ResponseError = require('../../errors/response-error');
const remindersCollection = db.collection('reminders');

const {
  getUserById,
  addReminderIdByUserId,
  updateUserById
} = require('../users/user');

async function checkUserReminder(userId, reminderId) {
  // Checks if the reminderId is in the user's reminders list
  const userData = await getUserById(userId);
  return (userData.reminders.includes(reminderId)) ? true : false;
}

async function getRemindersById(userId, reminderId) {
  try {
    const isReminderValid = await checkUserReminder(userId, reminderId);
    if (!isReminderValid) throw new ResponseError('Could not find the reminder for this user', 404);

    // Get the reminder data
    const remindersDoc = await remindersCollection.doc(reminderId).get()
    if (remindersDoc.empty) throw new ResponseError(404, 'Reminder not found');
    return remindersDoc.data();
  }
  catch (error) {
    console.error('Error getting reminders:', error);
    throw error
  }
}

async function getRemindersByUserId(userId) {
  try {
    const user = await getUserById(userId);
    const remindersIdList = user.reminders;
    const remindersDocList = [];

    for (const reminderId of remindersIdList) {
      const reminderDoc = await getRemindersById(userId, reminderId);
      if (reminderDoc && reminderDoc.isActive) {
        remindersDocList.push(reminderDoc);
      }
    }

    if (remindersDocList.length === 0) return [];

    return remindersDocList;
  } catch (error) {
    console.error('Error getting reminders by user id:', error);
    throw new Error('Failed to get reminders by user id from Firestore');
  }
}

async function saveReminder(req) {
  const newReminderData = {
    isActive: req.body.isActive,
    repeatEvery: req.body.repeatEvery,
    time: req.body.time,
    title: req.body.title,
    activities: req.body.activities,
  }
  const userId = req.user.userId;

  try {
    /*
     * Check first if 'reminderId' is in request parameters

     * If so, then it's "editing" a certain reminder
     * If not, then it's "creating" a new reminder
     */
    let reminderId = req.params.reminderId;
    if (reminderId) {
      // Check if the reminderId is in the user's reminders list
      const isReminderValid = await checkUserReminder(userId, reminderId);
      if (!isReminderValid) throw new ResponseError('Could not find the reminder for this user', 404);

      await remindersCollection.doc(reminderId).update(newReminderData);
    } else {
      // "Creating" a new reminder
      const reminderDoc = await remindersCollection.add(newReminderData);
      reminderId = reminderDoc.id;
      addReminderIdByUserId(userId, reminderId);
    }

    return {
      reminderId: reminderId,
      ...newReminderData
    };
  } catch (error) {
    console.error('Error creating reminder:', error);
    throw error;
  }
}

async function deleteReminder(req) {
  const reminderId = req.params.reminderId;

  try {
    // Check if the reminderId is in the user's reminders list
    const userId = req.user.userId;
    const userData = await getUserById(userId);
    if (!userData.reminders.includes(reminderId)) throw new ResponseError('Could not find the reminder for this user', 404);

    // Delete the reminder
    await remindersCollection.doc(reminderId).delete();

    // Remove the reminderId from the user's reminders list
    let reminderIdList = userData.reminders;
    reminderIdList = reminderIdList.filter(id => id !== reminderId);

    const updatedUserData = {
      ...userData,
      reminders: reminderIdList
    };

    // Update the user's data with the new reminders list
    await updateUserById(userId, updatedUserData);
  } catch (error) {
    console.error('Error deleting reminder:', error);
    throw error;
  }
}

async function finishReminder(req) {
  try {
    // Check if the reminderId is in the user's reminders list
    const reminderId = req.params.reminderId;
    const userId = req.user.userId;
    const isReminderValid = await checkUserReminder(userId, reminderId);
    if (!isReminderValid) throw new ResponseError('Could not find the reminder for this user', 404);

    const reminderDocRef = remindersCollection.doc(reminderId);
    await reminderDocRef.update({ isActive: false });

    const reminderDoc = await reminderDocRef.get();
    const reminderData = reminderDoc.data();
    return {
      reminderData
    }
  } catch (error) {
    console.error('Error finishing reminder:', error);
    throw error;
  }
}

module.exports = {
  getRemindersById,
  getRemindersByUserId,
  saveReminder,
  deleteReminder,
  finishReminder
};