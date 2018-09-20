import { combineReducers } from 'redux';

import event from './event';
import questions from './questions';

export default combineReducers({
  event,
  questions,
});
