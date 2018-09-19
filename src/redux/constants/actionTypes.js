const createRequestTypes = baseType => ({
  REQUEST: `${baseType}_REQUEST`,
  SUCCESS: `${baseType}_SUCCESS`,
  FAILURE: `${baseType}_FAILURE`,
});

const questions = {
  // AUTH_LOGOUT: createRequestTypes('AUTH_LOGOUT'),
};

export default {
  questions,
};
