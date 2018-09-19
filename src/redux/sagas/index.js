import { fork, all } from 'redux-saga/effects';

import questionsSaga from './questionsSaga';

const Watchers = [questionsSaga];

export default function*() {
  yield all(Watchers.map(el => fork(el)));
}
