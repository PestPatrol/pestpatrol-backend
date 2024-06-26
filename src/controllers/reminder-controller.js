const {
  getReminderHistoryByUserId
} = require('../services/reminders/reminder-history');

const {
  getRemindersById,
  getRemindersByUserId,
  saveReminder,
  deleteReminder,
  finishReminder
} = require('../services/reminders/reminders');

async function getRemindersController(req, res) {
  try {
    const remindersData = await getRemindersByUserId(req.user.userId);
    res.status(200)
      .json({
      success: true,
      message: 'Reminders fetched successfully',
      data: remindersData
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Error when fetching reminders data: ' + error.message
    });
  }
}

async function getReminderHistoryController(req, res) {
  try {
    const reminderHistoryData = await getReminderHistoryByUserId(req.user.userId);
    res.status(200)
      .json({
        success: true,
        message: 'Reminder history fetched successfully',
        data: reminderHistoryData
      });
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: 'Error when fetching reminder history: ' + error.message
      });
  }
}

async function getReminderDetailController(req, res) {
  try {
    const reminderData = await getRemindersById(req.user.userId, req.params.reminderId);
    res.status(200)
      .json({
        success: true,
        message: 'Reminder detail fetched successfully',
        data: reminderData
      });
  } catch (error) {
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: 'Error when fetching reminder detail: ' + error.message
      });
  }
}

async function saveReminderController(req, res) {
  try {
    const reminderData = await saveReminder(req);
    console.log('Request method: ', req.method);
    const statusCode = (req.method === 'POST') ? 201 : 200;
    res.status(201)
      .json({
        success: true,
        message: 'Reminder created/edited successfully',
        data: reminderData
      });
  } catch(error) {
    res.status(error.statusCode || 500)
      .json({
      success: false,
      message: 'Error when creating/editing new reminder: ' + error.message
    });
  }
}

async function deleteReminderController(req, res) {
  try {
    await deleteReminder(req);
    res.status(200)
      .json({
        success: true,
        message: 'Reminder deleted succcessfully'
      });
  } catch (error) {
    console.error('Error deleting reminder: ', error);
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: 'Error when deleting reminder: ' + error.message
      });
  }
}

async function finishReminderController(req, res) {
  try {
    const reminderData = await finishReminder(req);
    res.status(200)
      .json({
        success: true,
        message: 'Reminder finished successfully',
        data: reminderData
      });
  } catch (error) {
    console.error('Error finishing reminder: ', error);
    res.status(error.statusCode || 500)
      .json({
        success: false,
        message: 'Error when finishing reminder: ' + error.message
      });
  }
}

module.exports = {
  getRemindersController,
  getReminderHistoryController,
  getReminderDetailController,
  saveReminderController,
  deleteReminderController,
  finishReminderController
};