const { time } = require('@tensorflow/tfjs-node');
const db = require('../../app/firestore');
const remindersCollection = db.collection('reminders');
const { getUserById, saveReminderIdByUserId} = require('../users/user');

async function getRemindersById(reminderId){
  
  try{
    const remindersDoc = await remindersCollection.doc(reminderId).get()
    if (remindersDoc.empty){
      return null;
    } 
    return remindersDoc.data();
  } 
  catch (error){
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

async function saveReminders(req) {
    const newReminder = {
      isActive: req.body.isActive,
      repeatEvery: req.body.repeatEvery,
      time: req.body.time,
      title: req.body.title,
      type: req.body.type,
    }
    const userId = req.user.userId;
    try{
      const newReminderDocRef = await remindersCollection.add(newReminder);
      const newReminderDocRefId = newReminderDocRef.id;
      saveReminderIdByUserId(userId, newReminderDocRefId);
      return newReminder;
    } catch (error){
      console.error('Error creating reminder:', error);
      throw new Error('Failed to create reminder in Firestore');
    }
}


module.exports = { getRemindersById, getRemindersByUserId, saveReminders };
