import { fork, all } from 'redux-saga/effects';

import eventSaga from './eventSaga';
import questionsSaga from './questionsSaga';

const Watchers = [eventSaga, questionsSaga];

export default function*() {
  yield all(Watchers.map(el => fork(el)));
}
