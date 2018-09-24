import { put, takeLatest } from 'redux-saga/effects';

import actions from '../actions';
import types from '../constants/actionTypes';

function uuid_v4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
}

function* getUUID() {
  var uuid = localStorage.getItem('uuid')
    ? localStorage.getItem('uuid')
    : uuid_v4();

  localStorage.setItem('uuid', uuid);

  yield put(actions.event.getUUID.SUCCESS(uuid));
}

export default function* watchGetTasksSaga() {
  yield takeLatest(types.event.getUUID.REQUEST, getUUID);
}
