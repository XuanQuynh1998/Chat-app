import * as types from "../types/chatTypes.js";

const getConversationAction = (userId) => {
  return {
    type: types.GET_CONVERSATION_REQUESTED,
    payload: userId,
  };
};

const setConversationAction = ({ name = null, arrayMembers }) => {
  return {
    type: types.SET_CONVERSATION_REQUESTED,
    payload: { name, arrayMembers },
  };
};

const getMessagesAction = (conversationId, messages) => {
  return {
    type: types.GET_MESSAGES_REQUESTED,
    payload: { conversationId, messages },
  };
};

const getLastestMessagesAction = (socketMessage = null) => {
  return {
    type: types.GET_LASTEST_MESSAGES_REQUESTED,
    payload: socketMessage,
  };
};

const sendMessagesAction = (messages) => {
  return {
    type: types.SEND_MESSAGES_REQUESTED,
    payload: messages,
  };
};

const getAllMediaFilesAction = (conversationId) => {
  return {
    type: types.GET_ALL_MEDIA_FILES_REQUESTED,
    payload: conversationId,
  };
};

export {
  getConversationAction,
  getMessagesAction,
  sendMessagesAction,
  getAllMediaFilesAction,
  getLastestMessagesAction,
  setConversationAction,
};
