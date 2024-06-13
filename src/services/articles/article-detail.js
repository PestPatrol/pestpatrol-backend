const db = require('../../app/firestore');
const ResponseError = require('../../errors/response-error');

async function getArticleDetail(articleId) {
  const document = await db.collection('articles').doc(articleId).get();

  const data = document.data();

  if (data) return {
    ...data,
    articleId: articleId
  };
  else throw new ResponseError('Article not found!', 404);
}

module.exports = getArticleDetail;