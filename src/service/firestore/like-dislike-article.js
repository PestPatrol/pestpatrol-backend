const db = require('../../app/firestore');

async function likeOrDislikeArticle(articleId, userId) {
    const usersCollection = db.collection('users');
    const userDocument = await usersCollection.doc(userId).get();
    const data = userDocument.data();

    /*
     * Implement here
     */
    if (!data.favArticles) {
        data.favArticles = [];
    }

    const isAlreadyLiked = data.favArticles.includes(articleId);
    if (isAlreadyLiked) {
        data.favArticles = data.favArticles.filter(id => id !== articleId);
    } else {
        data.favArticles.push(articleId);
    }

    await usersCollection.doc(userId).set(data);

    return {
        ...data
    };
}

module.exports = likeOrDislikeArticle