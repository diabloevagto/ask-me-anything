const createRequestTypes = baseType => ({
  REQUEST: `${baseType}_REQUEST`,
  SUCCESS: `${baseType}_SUCCESS`,
  FAILURE: `${baseType}_FAILURE`,
});

const event = {
  setEventId: 'setEventId',
  getUUID: createRequestTypes('getUUID'),
};

const questions = {
  addQuestion: createRequestTypes('addQuestion'),
  addLike: createRequestTypes('addLike'),
  triggerStar: createRequestTypes('triggerStar'),
  triggerDone: createRequestTypes('triggerDone'),
  //
  firestoreUpdate: 'firestoreUpdate',
};

export default {
  event,
  questions,
};
