const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

app.use(cors());
app.use(bodyParser.json());

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const getFirestoreDocAndRef = async (collectionName, docName) => {
  try {
    const ref = await admin
      .firestore()
      .collection(collectionName)
      .doc(docName);
    const data = (await ref.get()).data();

    return { ref, data };
  } catch (error) {
    return error;
  }
};

app.post(
  '/:eventId/addQuestion',
  asyncMiddleware(async (req, res) => {
    const timestamp = new Date().getTime();
    const {
      params: { eventId },
      body: { context },
    } = req;

    const ret = await admin
      .firestore()
      .collection(eventId)
      .add(
        Object.assign(
          {},
          {
            context,
            star: false,
            done: false,
            like: [],
          },
          { timestamp: timestamp },
        ),
      );

    return res.send(ret);
  }),
);

app.patch(
  '/:eventId/:questionId/like',
  asyncMiddleware(async (req, res) => {
    const {
      params: { eventId, questionId },
      body: { uuid },
    } = req;

    const { ref, data } = await getFirestoreDocAndRef(eventId, questionId);

    const ret = ref.update({
      like: [...data.like, uuid],
    });

    return res.send(ret);
  }),
);

app.patch(
  '/:eventId/:questionId/star',
  asyncMiddleware(async (req, res) => {
    const {
      params: { eventId, questionId },
    } = req;

    const { ref, data } = await getFirestoreDocAndRef(eventId, questionId);

    const ret = ref.update({
      star: !data.star,
    });

    return res.send(ret);
  }),
);

app.patch(
  '/:eventId/:questionId/done',
  asyncMiddleware(async (req, res) => {
    const {
      params: { eventId, questionId },
    } = req;

    const { ref, data } = await getFirestoreDocAndRef(eventId, questionId);

    const ret = ref.update({
      done: !data.done,
    });

    return res.send(ret);
  }),
);

exports.questions = functions.https.onRequest(app);
