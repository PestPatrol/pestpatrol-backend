const db = require('../../app/firestore');

// Define the user collection
const userCollection = db.collection('users');

// Create a new user
const createUser = async (newUserData) => {
  try {
    await userCollection.doc(newUserData.userId).set(newUserData);
    return newUserData;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user in Firestore');
  }
};

// Get a user by ID
const getUserById = async (userId) => {
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

const getUserByEmail = async (email) => {
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
const updateUserById = async (userId, updatedUserData) => {
  try {
    await userCollection.doc(userId).update(updatedUserData);
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

// Delete a user by ID
const deleteUserById = async (userId) => {
  try {
    await userCollection.doc(userId).delete();
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};