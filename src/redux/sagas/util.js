/**
 * 依據 payload 是否有 message 判斷 api 正確或是有錯誤
 * 因為firebase api 有錯誤都會有 message 帶入錯誤訊息
 *
 * @param {*} actionType action 名稱，經過 createRequestTypes 被包裝過的
 * @param {*} payload 要帶入的 payload
 */
export const checkErrorMessageReturnAction = (actionType, payload = {}) => {
  const action = actionType[payload.message ? 'FAILURE' : 'SUCCESS'];
  return action(payload);
};
