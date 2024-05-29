const db = require('../../app/firestore.js');

async function getHistoryData() {
    const buffer = await db.collection('predictions').get();
    const data = [];

    buffer.forEach(document => {
        const currentData = {
            id: document.id,
            data: document.data()
        };

        if (currentData.data.userId === '45UfRMvU5PK6zNXmcyVP') {
            data.push(currentData);
        }
    });

    return data;
}

module.exports = getHistoryData;