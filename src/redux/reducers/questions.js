import produce from 'immer';
import { handleActions } from 'redux-actions';

import types from '../actions';

const initialState = {
  questions: [],
};

export default handleActions(
  {
    // [types.auth.AUTH_LOGIN.REQUEST]: produce(draft => {
    //   draft.isLoading = true;
    // }),
  },
  initialState,
);
