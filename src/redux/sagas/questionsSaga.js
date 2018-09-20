import { put, call, takeLatest, select } from 'redux-saga/effects';

import actions from '../actions';
import types from '../constants/actionTypes';
import { checkErrorMessageReturnAction } from './util';
import {
  addQuestion,
  addLike,
  triggerStar,
  triggerDone,
} from '../../firebase/questions';

const getEventId = state => state.event.eventId;

function* addQuestionSaga({ payload }) {
  const eventId = yield select(getEventId);

  const result = yield call(addQuestion, eventId, {
    context: payload,
    star: false,
    done: false,
    like: 0,
  });

  yield put(
    checkErrorMessageReturnAction(actions.questions.addQuestion, result),
  );
}

function* addLikeSaga({ payload }) {
  const eventId = yield select(getEventId);
  const result = yield call(addLike, eventId, payload);

  yield put(checkErrorMessageReturnAction(actions.questions.addLike, result));
}

function* triggerStarSaga({ payload }) {
  const eventId = yield select(getEventId);
  const result = yield call(triggerStar, eventId, payload);

  yield put(
    checkErrorMessageReturnAction(actions.questions.triggerStar, result),
  );
}

function* triggerDoneSaga({ payload }) {
  const eventId = yield select(getEventId);
  const result = yield call(triggerDone, eventId, payload);

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
