import * as types from "../types/otherTypes.js";

export function activeCallAction({ callType, show, members, roomId, calleeInfo, receivingInfo }) {
  return {
    type: types.ACTIVE_CALL,
    payload: { callType, show, members, roomId, calleeInfo, receivingInfo },
  };
}
