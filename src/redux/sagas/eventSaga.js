import { put, call, takeLatest } from 'redux-saga/effects';

import actions from '../actions';
import types from '../constants/actionTypes';
import { getAdminUUID } from '../../firebase/event';

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
  const adminUUID = yield call(getAdminUUID);

  localStorage.setItem('uuid', uuid);

  yield put(
    actions.event.getUUID.SUCCESS({
      uuid,
      isAdmin: adminUUID.indexOf(uuid) !== -1,
    }),
  );
}

export default function* watchGetTasksSaga() {
  yield takeLatest(types.event.getUUID.REQUEST, getUUID);
}
