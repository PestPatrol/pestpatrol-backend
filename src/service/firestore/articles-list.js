const db = require("../../app/firestore");

async function getArticles(category) {
    const buffer = await db.collection('articles').get();
    const data = [];

    if (category) {
        if (category === '1') {
            buffer.forEach(document => {
                const currentData = {
                    articleId: document.id,
                    data: document.data()
                };
                
                if (currentData.data.category === 'News') data.push(currentData);
            });
        } else if (category === '2') {
            buffer.forEach(document => {
                const currentData = {
                    articleId: document.id,
                    data: document.data()
                };
    
                if (currentData.data.category === 'Care Tips') data.push(currentData);
            });
        }
    } else {
        buffer.forEach(document => {
            const currentData = {
                articleId: document.id,
                data: document.data()
            };

            data.push(currentData);
        });
    }

    return data;
}

module.exports = getArticles;