const db = require('../../app/firestore');

// Define the user collection
const userCollection = db.collection('users');

// Create a new user
async function createUser(newUserData) {
  try {
    await userCollection.doc(newUserData.userId).set(newUserData);
    return newUserData;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user in Firestore');
  }
};

// Get a user by ID
async function getUserById(userId) {
  try {
    const userDoc = await userCollection.doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Failed to get user by id from Firestore');
  }
};

async function getUserByEmail(email) {
  try {
    const querySnapshot = await userCollection.where('email', '==', email).get();
    const userDoc = querySnapshot.docs[0];
    if (userDoc) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Failed to get user by email from Firestore');
  }
};

// Update a user by ID
async function updateUserById(userId, updatedUserData) {
  try {
    await userCollection.doc(userId).update({ ...updatedUserData });
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

// Delete a user by ID
async function deleteUserById(userId) {
  try {
    await userCollection.doc(userId).delete();
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

async function addReminderIdByUserId(userId, reminderId){
  try{
    const userDoc = await userCollection.doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      userData.reminders.push(reminderId);
      await userCollection.doc(userId).update({ reminders: userData.reminders });
      return true;
    } else {
      throw new Error('User not found');
    }
  } catch (error){
    throw new Error('Failed to add new reminder');
  }
}

async function addPredictionIdByUserId(userId, predictionId){
  try{
    const userRef = userCollection.doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const predictionList = userData.predictions || [];
      predictionList.push(predictionId);
      
      await userRef.update({ predictions: predictionList });
      return true;
    } else {
      throw new Error('User not found');
    }
  } catch (error){
    throw new Error(error.message || 'Failed to add new prediction');
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  addReminderIdByUserId,
  addPredictionIdByUserId
};