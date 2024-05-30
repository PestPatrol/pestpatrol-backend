const db = require('../../app/firestore.js');
const ResponseError = require('../../error/response-error.js');

async function getHistoryData(userId) {
    const buffer = await db.collection('predictions').get();
    const data = [];

    buffer.forEach(document => {
        const currentData = {
            id: document.id,
            data: document.data()
        };

        if (currentData.data.userId === userId) {
            data.push(currentData);
        }
    });

    if (data[0]) return data;
    else throw new ResponseError(404, 'History not found!');
}

module.exports = getHistoryData;