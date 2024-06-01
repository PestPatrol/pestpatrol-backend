const db = require('../../app/firestore');
const ResponseError = require('../../error/response-error');

async function getArticleDetail(articleId) {
  const document = await db.collection('articles').doc(articleId).get();

  const data = document.data();

  if (data) return {
    ...data,
    articleId: articleId
  };
  else throw new ResponseError(404, 'Article not found!');
}

module.exports = getArticleDetail;