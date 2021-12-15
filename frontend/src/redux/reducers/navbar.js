import * as types from "../types/otherTypes.js";

const activeComponent = (state = "chats", action) => {
  switch (action.type) {
    case types.ACTIVE_COMPONENTS:
      return action.payload;
    default:
      return state;
  }
};

const activeConversation = (state = null, action) => {
  switch (action.type) {
    case types.ACTIVE_CONVERSATIONS:
      return action.payload;
    default:
      return state;
  }
};

const activeFriend = (state = null, action) => {
  switch (action.type) {
    case types.ACTIVE_FRIENDS:
      return action.payload;
    default:
      return state;
  }
};

export { activeComponent, activeConversation, activeFriend };
