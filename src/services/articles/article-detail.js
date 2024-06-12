const db = require('../../app/firestore');

async function getArticleDetail(articleId) {
  const document = await db.collection('articles').doc(articleId).get();

  const data = document.data();

  if (data) return {
    ...data,
    articleId: articleId
  };
  else throw Error(404, 'Article not found!');
}

module.exports = getArticleDetail;