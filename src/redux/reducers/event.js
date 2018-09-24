import produce from 'immer';
import { handleActions } from 'redux-actions';

import types from '../constants/actionTypes';

const initialState = {
  eventId: '',
  uuid: null,
  isAdmin: false,
};

export default handleActions(
  {
    [types.event.setEventId]: produce((draft, { payload }) => {
      draft.eventId = payload;
    }),
    [types.event.getUUID.SUCCESS]: produce((draft, { payload }) => {
      draft.uuid = payload.uuid;
      draft.isAdmin = payload.isAdmin;
    }),
  },
  initialState,
);
