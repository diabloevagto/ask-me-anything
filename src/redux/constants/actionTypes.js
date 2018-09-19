const createRequestTypes = baseType => ({
  REQUEST: `${baseType}_REQUEST`,
  SUCCESS: `${baseType}_SUCCESS`,
  FAILURE: `${baseType}_FAILURE`,
});

const questions = {
  addQuestion: createRequestTypes('addQuestion'),
  addLike: createRequestTypes('addLike'),
  triggerStar: createRequestTypes('triggerStar'),
  triggerDone: createRequestTypes('triggerDone'),
};

export default {
  questions,
};
