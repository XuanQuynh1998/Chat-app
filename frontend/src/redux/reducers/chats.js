import * as types from "../types/chatTypes.js";

const initialConversationState = {
  loading: false,
  success: null,
  error: null,
  conversations: null,
};

const initialGetMessagesState = {
  loading: false,
  success: null,
  error: null,
  messagesInfo: null,
  friendInfo: null,
};

const initialAllMediaFilesState = {
  loading: false,
  success: null,
  error: null,
  files: null,
};

const getConversation = (state = initialConversationState, action) => {
  switch (action.type) {
    case types.GET_CONVERSATION_REQUESTED:
      return { ...state, loading: true };

    case types.GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        conversations: action.conversation,
      };

    case types.GET_CONVERSATION_FAILED:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};

const setConversation = (state = initialConversationState, action) => {
  switch (action.type) {
    case types.SET_CONVERSATION_REQUESTED:
      return { ...state, loading: true };

    case types.SET_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        conversation: action.conversation,
      };

    case types.SET_CONVERSATION_FAILED:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};

const getMessages = (state = initialGetMessagesState, action) => {
  switch (action.type) {
    case types.GET_MESSAGES_REQUESTED:
      return { ...state, loading: true };

    case types.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        messagesInfo: action.messages,
      };

    case types.GET_MESSAGES_FAILED:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};

const getLastestMessages = (state = initialGetMessagesState, action) => {
  switch (action.type) {
    case types.GET_LASTEST_MESSAGES_REQUESTED:
      return { ...state, loading: true };

    case types.GET_LASTEST_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        messagesInfo: action.lastestMessages,
      };

    case types.GET_LASTEST_MESSAGES_FAILED:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};

const sendMessages = (state = initialGetMessagesState, action) => {
  switch (action.type) {
    case types.SEND_MESSAGES_REQUESTED:
      return { ...state, loading: true };

    case types.SEND_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        messagesInfo: action.messages,
      };

    case types.SEND_MESSAGES_FAILED:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};

const getAllMediaFiles = (state = initialAllMediaFilesState, action) => {
  switch (action.type) {
    case types.GET_ALL_MEDIA_FILES_REQUESTED:
      return { ...state, loading: true };

    case types.GET_ALL_MEDIA_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        files: action.files,
      };

    case types.GET_ALL_MEDIA_FILES_FAILED:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};

export {
  getConversation,
  getMessages,
  sendMessages,
  getLastestMessages,
  getAllMediaFiles,
  setConversation,
};
