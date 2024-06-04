const db = require("../app/firestore");

async function setImageUrl(collection, imageUrl, documentId) {
  const collection = db.collection(collection);

  try {
    if (collection === 'users') await collection.doc(documentId).update({
      profpicLink: imageUrl
    });
    else if (collection === 'predictions') await collection.doc(documentId).update({
      leafPictureLink: imageUrl
    });
    else if (collection === 'articles') await collection.doc(documentId).update({
      pictureLink: imageUrl
    });

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = setImageUrl;