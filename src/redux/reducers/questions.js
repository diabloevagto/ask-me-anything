import produce from 'immer';
import { handleActions, combineActions } from 'redux-actions';

import types from '../constants/actionTypes';

const initialState = {
  questions: [],
};

export default handleActions(
  {
    [combineActions(
      types.questions.addQuestion.SUCCESS,
      types.questions.addLike.SUCCESS,
      types.questions.triggerStar.SUCCESS,
      types.questions.triggerDone.SUCCESS,
    )]: produce((draft, { payload }) => {
      draft.questions = payload;
    }),
  },
  initialState,
);
