import { put, call, takeLatest } from 'redux-saga/effects';

import actions from '../actions';
import types from '../constants/actionTypes';
import { login, logout } from '../../firebase/auth';
import { checkErrorMessageReturnAction } from './util';

function* LoginSaga() {
  const user = yield call(login);
  const action = checkErrorMessageReturnAction(actions.auth.AUTH_LOGIN, user);
  yield put(action);
}

function* LogoutSaga() {
  yield call(logout);
  const action = checkErrorMessageReturnAction(actions.auth.AUTH_LOGOUT);
  yield put(action);
}

export default function* watchGetTasksSaga() {
  yield takeLatest(types.auth.AUTH_LOGIN.REQUEST, LoginSaga);
  yield takeLatest(types.auth.AUTH_LOGOUT.REQUEST, LogoutSaga);
}
