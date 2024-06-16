const db = require('../../app/firestore');
const ResponseError = require('../../errors/response-error');

async function likeOrDislikeArticle(articleId, userId) {
  // Check if articleId exists
  const articleDocument = await db.collection('articles').doc(articleId).get();
  if (!articleDocument.exists) throw new ResponseError('Article not found', 404);

  const usersCollection = db.collection('users');
  const userDocument = await usersCollection.doc(userId).get();
  const data = userDocument.data();

  if (!data.favArticles) {
    data.favArticles = [];
  }

  const isAlreadyLiked = data.favArticles.includes(articleId);
  if (isAlreadyLiked) {
    data.favArticles = data.favArticles.filter(id => id !== articleId);
  } else {
    data.favArticles.push(articleId);
  }

  await usersCollection.doc(userId).update({ ...data });

  return {
    ...data
  };
}

module.exports = likeOrDislikeArticle