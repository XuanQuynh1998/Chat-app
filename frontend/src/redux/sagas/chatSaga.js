import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

const getConversation = async (userId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://localhost:4000/conversations/${userId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const setConversation = async ({ name, arrayMembers }) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:4000/conversations",
      data: { name, arrayMembers },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getMessages = async ({ conversationId, messages }) => {
  try {
    if (messages) {
      return messages;
    }
    const res = await axios({
      method: "GET",
      url: `http://localhost:4000/messages/${conversationId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getLastestMessages = async (socketMessage) => {
  try {
    if (socketMessage) {
      return socketMessage;
    }
    const res = await axios({
      method: "GET",
      url: "http://localhost:4000/messages/lastest_messages",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const sendMessages = async (messages) => {
  try {
    const res = await axios({
      method: "POST",
      data: messages,
      url: "http://localhost:4000/messages",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getAllMediaFiles = async (conversationId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://localhost:4000/messages/all_media_files/${conversationId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

function* getConversationWorker(action) {
  try {
    const getConversationRes = yield call(getConversation, action.payload);
    yield put({
      type: "GET_CONVERSATION_SUCCESS",
      conversation: getConversationRes,
    });
  } catch (err) {
    yield put({ type: "GET_CONVERSATION_FAILED", message: err.message });
  }
}

function* setConversationWorker(action) {
  try {
    const setConversationRes = yield call(setConversation, action.payload);
    yield put({
      type: "SET_CONVERSATION_SUCCESS",
      conversation: setConversationRes,
    });
  } catch (err) {
    yield put({ type: "SET_CONVERSATION_FAILED", message: err.message });
  }
}

function* getMessagesWorker(action) {
  try {
    const getMessagesRes = yield call(getMessages, action.payload);
    yield put({
      type: "GET_MESSAGES_SUCCESS",
      messages: getMessagesRes.messages,
    });
  } catch (err) {
    yield put({ type: "GET_MESSAGES_FAILED", message: err.message });
  }
}

function* getLastestMessagesWorker(action) {
  try {
    const getLastestMessagesRes = yield call(getLastestMessages, action.payload);
    yield put({
      type: "GET_LASTEST_MESSAGES_SUCCESS",
      lastestMessages: getLastestMessagesRes,
    });
  } catch (err) {
    yield put({ type: "GET_LASTEST_MESSAGES_FAILED", message: err.message });
  }
}

function* sendMessagesWorker(action) {
  try {
    const sendMessagesRes = yield call(sendMessages, action.payload);
    yield put({
      type: "SEND_MESSAGES_SUCCESS",
      messages: sendMessagesRes.messages,
    });
    yield put({
      type: "GET_MESSAGES_SUCCESS",
      messages: sendMessagesRes.messages,
    });
  } catch (err) {
    yield put({ type: "SEND_MESSAGES_FAILED", message: err.message });
  }
}

function* getAllMediaFilesWorker(action) {
  try {
    const getAllMediaFilesRes = yield call(getAllMediaFiles, action.payload);
    yield put({
      type: "GET_ALL_MEDIA_FILES_SUCCESS",
      files: getAllMediaFilesRes,
    });
  } catch (err) {
    yield put({ type: "GET_ALL_MEDIA_FILES_FAILED", message: err.message });
  }
}

export function* getConversationWatcher() {
  yield takeLatest("GET_CONVERSATION_REQUESTED", getConversationWorker);
}

export function* setConversationWatcher() {
  yield takeLatest("SET_CONVERSATION_REQUESTED", setConversationWorker);
}

export function* getMessagesWatcher() {
  yield takeLatest("GET_MESSAGES_REQUESTED", getMessagesWorker);
}

export function* getLastestMessagesWatcher() {
  yield takeLatest("GET_LASTEST_MESSAGES_REQUESTED", getLastestMessagesWorker);
}

export function* sendMessagesWatcher() {
  yield takeLatest("SEND_MESSAGES_REQUESTED", sendMessagesWorker);
}

export function* getAllMediaFilesWatcher() {
  yield takeLatest("GET_ALL_MEDIA_FILES_REQUESTED", getAllMediaFilesWorker);
}
