const db = require('../../app/firestore');
const remindersCollection = db.collection('reminders');
const {
  getUserById,
  saveReminderIdByUserId,
  updateUserById
} = require('../users/user');

async function getRemindersById(reminderId) {
  try {
    const remindersDoc = await remindersCollection.doc(reminderId).get()
    if (remindersDoc.empty) {
      return null;
    }
    return remindersDoc.data();
  }
  catch (error) {
    console.error('Error getting reminders:', error);
    throw new Error('Failed to get reminders by id from Firestore');
  }
}

async function getRemindersByUserId(userId) {
  try {
    const user = await getUserById(userId);
    const remindersIdList = user.reminders;
    const remindersDocList = [];

    for (const reminderId of remindersIdList) {
      const remindersDoc = await getRemindersById(reminderId);
      if (remindersDoc) {
        remindersDocList.push(remindersDoc);
      }
    }
    if (remindersDocList.empty) {
      return null;
    }
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
     * Check first if 'reminderId' is in request body

     * If so, then it's "editing" a certain reminder
     * If not, then it's "creating" a new reminder
     */
    let reminderId = req.body.reminderId;
    if (reminderId) {
      await remindersCollection.doc(reminderId).update(newReminderData);
    } else {
      // "Creating" a new reminder
      const reminderDoc = await remindersCollection.add(newReminderData);
      reminderId = reminderDoc.id;
      saveReminderIdByUserId(userId, reminderId);
    }

    return {
      reminderId: reminderId,
      ...newReminderData
    };
  } catch (error) {
    console.error('Error creating reminder:', error);
    throw new Error('Failed to create/edit reminder in Firestore');
  }
}

async function deleteReminder(req) {
  const reminderId = req.params.reminderId;

  try {
    await remindersCollection.doc(reminderId).delete();

    const userId = req.user.userId;
    let userData = await getUserById(userId);
    let reminderIdList = userData.reminders;
    reminderIdList = reminderIdList.filter(id => id !== reminderId);

    userData = {
      ...userData,
      reminders: reminderIdList
    };

    await updateUserById(userId, userData);
  } catch (error) {
    console.error('Error deleting reminder:', error);
    throw new Error('Failed to delete reminder from Firestore')
  }
}

module.exports = {
  getRemindersById,
  getRemindersByUserId,
  saveReminder,
  deleteReminder
};