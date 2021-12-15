import * as types from "../types/otherTypes.js";

const initialCallState = {
  callType: null,
  show: null,
  members: null,
  roomId: null,
  calleeInfo: null,
  receivingInfo: null,
};

const activeCall = (state = initialCallState, action) => {
  switch (action.type) {
    case types.ACTIVE_CALL:
      return action.payload;
    default:
      return state;
  }
};

export { activeCall };
