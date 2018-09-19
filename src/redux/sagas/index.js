import { fork, all } from 'redux-saga/effects';

// import authSagas from './authSaga';

// const Watchers = [authSagas];
const Watchers = [];

export default function*() {
  yield all(Watchers.map(el => fork(el)));
}
