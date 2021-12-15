import * as types from "../types/otherTypes.js";

export function activeComponentAction(componentName) {
  return {
    type: types.ACTIVE_COMPONENTS,
    payload: componentName,
  };
}

export function activeConversationAction(conversationId) {
  return {
    type: types.ACTIVE_CONVERSATIONS,
    payload: conversationId,
  };
}

export function activeFriendAction(friendId) {
  return {
    type: types.ACTIVE_FRIENDS,
    payload: friendId,
  };
}
