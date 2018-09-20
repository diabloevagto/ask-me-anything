import produce from 'immer';
import { handleActions } from 'redux-actions';

import types from '../constants/actionTypes';

const initialState = {
  eventId: '',
};

export default handleActions(
  {
    [types.event.setEventId]: produce((draft, { payload }) => {
      draft.eventId = payload;
    }),
  },
  initialState,
);
