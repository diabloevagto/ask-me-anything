import { createAction } from 'redux-actions';

import types from '../constants/actionTypes';

// 依據 types 相同結構將 string 換成 createAction(string)
const createRequestActions = data => {
  return Object.entries(data).reduce((accumulator, [key, value]) => {
    if (typeof value === 'object') {
      accumulator[key] = createRequestActions(value, accumulator);
      return accumulator;
    }
    accumulator[key] = createAction(value);
    return accumulator;
  }, {});
};

export default createRequestActions(types);
