const { getRemindersByUserId, saveReminders } = require('../services/reminders/reminders');


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
      message: error.message
    });
  }
}

async function saveReminderController(req, res) {
  try{
    const reminderData = await saveReminders(req);
    res.status(201)
      .json({
        success: true,
        message: 'Reminder created successfully',
        data: reminderData
      });
  } catch(error) {
    res.json({
      success: false,
      message: error.message
    });
  }
}

module.exports = { getRemindersController, saveReminderController };

