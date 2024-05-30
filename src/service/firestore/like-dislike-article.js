const db = require('../../app/firestore');

async function likeOrDislikeArticle(articleId) {
    const collection = db.collection('articles');
    const document = await collection.doc(articleId).get();
    const data = document.data();

    data.isLiked = (data.isLiked) ? false : true;
    await collection.doc(articleId).set(data);

    return {
        ...data,
        articleId: articleId
    };
}

module.exports = likeOrDislikeArticle