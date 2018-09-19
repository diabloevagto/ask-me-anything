import { put, call, takeLatest, select } from 'redux-saga/effects';
import produce from 'immer';

import actions from '../actions';
import types from '../constants/actionTypes';
import { checkErrorMessageReturnAction } from './util';

const getQuestion = state => state.questions.questions;

function* addQuestionSaga({ payload }) {
  const questions = yield select(getQuestion);

  yield put(
    actions.questions.addQuestion.SUCCESS(
      produce(questions, draft => {
        draft.push({
          context: payload,
          star: false,
          done: false,
          like: 0,
          timestamp: Date.now(),
        });
      }),
    ),
  );
}

function* addLikeSaga({ payload }) {
  const questions = yield select(getQuestion);
  const target = questions.findIndex(el => el.timestamp === payload);

  yield put(
    actions.questions.addLike.SUCCESS(
      produce(questions, draft => {
        draft[target].like++;
      }),
    ),
  );
}

function* triggerStarSaga({ payload }) {
  const questions = yield select(getQuestion);
  const target = questions.findIndex(el => el.timestamp === payload);

  yield put(
    actions.questions.triggerStar.SUCCESS(
      produce(questions, draft => {
        draft[target].star = !draft[target].star;
      }),
    ),
  );
}

function* triggerDoneSaga({ payload }) {
  const questions = yield select(getQuestion);
  const target = questions.findIndex(el => el.timestamp === payload);

  yield put(
    actions.questions.triggerStar.SUCCESS(
      produce(questions, draft => {
        draft[target].done = !draft[target].done;
      }),
    ),
  );
}

export default function* watchGetTasksSaga() {
  yield takeLatest(types.questions.addQuestion.REQUEST, addQuestionSaga);
  yield takeLatest(types.questions.addLike.REQUEST, addLikeSaga);
  yield takeLatest(types.questions.triggerStar.REQUEST, triggerStarSaga);
  yield takeLatest(types.questions.triggerDone.REQUEST, triggerDoneSaga);
}
