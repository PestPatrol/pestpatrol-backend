const db = require("../../app/firestore");

async function getLikedArticles(userId) {
  const usersCollection = db.collection('users');
  const userDoc = await usersCollection.doc(userId).get();

  const favArticlesId = userDoc.data().favArticles;
  console.log(`favArticlesId is ${favArticlesId}`);

  const data = [];

  for (const articleId of favArticlesId) {
    const articlesCollection = db.collection('articles');
    const articleDoc = await articlesCollection.doc(articleId).get();
    const articleData = articleDoc.data();

    data.push(articleData);
  }

  return data;
}

module.exports = getLikedArticles;