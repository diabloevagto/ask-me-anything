import produce from 'immer';
import { handleActions } from 'redux-actions';

import types from '../constants/actionTypes';

const initialState = {
  questions: [],
};

export default handleActions(
  {
    [types.questions.firestoreUpdate]: produce((draft, { payload }) => {
      draft.questions = payload;
    }),
  },
  initialState,
);
