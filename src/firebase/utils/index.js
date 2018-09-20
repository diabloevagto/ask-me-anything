import app from '../initializeFirebase';

const { db } = app;

export const getDocAndRef = async (collectionName, docName) => {
  try {
    const ref = await db.collection(collectionName).doc(docName);
    const data = (await ref.get()).data();

    return { ref, data };
  } catch (error) {
    return error;
  }
};

export const addDoc = async (collectionName, payload) => {
  try {
    const timestamp = new Date().getTime();

    await db
      .collection(collectionName)
      .add(Object.assign({}, payload, { timestamp: timestamp }));

    return true;
  } catch (error) {
    return error;
  }
};
