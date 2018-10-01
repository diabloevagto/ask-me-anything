import { put, call, takeLatest, select } from 'redux-saga/effects';

import actions from '../actions';
import types from '../constants/actionTypes';
import { checkErrorMessageReturnAction } from './util';

import { addQuestion, addLike, triggerStar, triggerDone } from '../../api';

const getEvent = state => state.event;

function* addQuestionSaga({ payload }) {
  const event = yield select(getEvent);
  const result = yield call(addQuestion, event, payload);

  yield put(
    checkErrorMessageReturnAction(actions.questions.addQuestion, result),
  );
}

function* addLikeSaga({ payload }) {
  const event = yield select(getEvent);
  const result = yield call(addLike, event, payload);

  yield put(checkErrorMessageReturnAction(actions.questions.addLike, result));
}

function* triggerStarSaga({ payload }) {
  const event = yield select(getEvent);
  const result = yield call(triggerStar, event, payload);

  yield put(
    checkErrorMessageReturnAction(actions.questions.triggerStar, result),
  );
}

function* triggerDoneSaga({ payload }) {
  const event = yield select(getEvent);
  const result = yield call(triggerDone, event, payload);

  yield put(
    checkErrorMessageReturnAction(actions.questions.triggerDone, result),
  );
}

export default function* watchGetTasksSaga() {
  yield takeLatest(types.questions.addQuestion.REQUEST, addQuestionSaga);
  yield takeLatest(types.questions.addLike.REQUEST, addLikeSaga);
  yield takeLatest(types.questions.triggerStar.REQUEST, triggerStarSaga);
  yield takeLatest(types.questions.triggerDone.REQUEST, triggerDoneSaga);
}
