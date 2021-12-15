import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const login = async (loginInfo) => {
  try {
    const res = await axios({
      method: "POST",
      data: loginInfo,
      url: "http://localhost:4000/auth/login",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const authenticate = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:4000/auth/check_login",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getUserInfo = async (userId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://localhost:4000/api/user?userId=${userId}`,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (profileInfo) => {
  try {
    const res = await axios({
      method: "POST",
      data: profileInfo,
      url: "http://localhost:4000/profile/update_profile",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const addFriends = async (friendEmail) => {
  try {
    const res = await axios({
      method: "POST",
      data: friendEmail,
      url: "http://localhost:4000/profile/add_friends",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const addFriendsOperation = async ({ action, friendEmail }) => {
  try {
    const res = await axios({
      method: "GET",
      url: `http://localhost:4000/profile/add_friends_action/${action}?friendEmail=${friendEmail}`,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getInvitedFriends = async (reqFriendSocket) => {
  try {
    if (reqFriendSocket) {
      return reqFriendSocket;
    }
    const res = await axios({
      method: "GET",
      url: "http://localhost:4000/profile/get_invited_friends",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getFriends = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:4000/profile/get_friends",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:4000/auth/logout",
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

function* loginWorker(action) {
  try {
    const loginRes = yield call(login, action.payload);
    yield put({ type: "LOGIN_SUCCESS", loginRes: loginRes });
  } catch (err) {
    yield put({ type: "LOGIN_FAILED", message: err.message });
  }
}

function* authenticateWorker(action) {
  try {
    const authenticateRes = yield call(authenticate);
    yield put({ type: "LOGIN_SUCCESS", loginRes: authenticateRes });
    yield put({ type: "AUTHENTICATE_SUCCESS", loginRes: authenticateRes });
  } catch (err) {
    yield put({ type: "LOGIN_FAILED", message: err.message });
    yield put({ type: "AUTHENTICATE_FAILED", message: err.message });
  }
}

function* getUserWorker(action) {
  try {
    const user = yield call(getUserInfo, action.payload);
    yield put({ type: "GET_USER_SUCCESS", user: user });
  } catch (err) {
    yield put({ type: "GET_USER_FAILED", message: err.message });
  }
}

function* updateProfileWorker(action) {
  try {
    const updateProfileRes = yield call(updateProfile, action.payload);
    yield put({
      type: "UPDATE_PROFILE_SUCCESS",
      updateProfileRes: updateProfileRes,
    });
    yield put({ type: "AUTHENTICATE_SUCCESS", loginRes: updateProfileRes });
  } catch (err) {
    yield put({ type: "UPDATE_PROFILE_FAILED", message: err.message });
  }
}

function* addFriendsWorker(action) {
  try {
    const addFriendsRes = yield call(addFriends, action.payload);
    yield put({
      type: "ADD_FRIENDS_SUCCESS",
      addFriendsRes: addFriendsRes,
    });
  } catch (err) {
    yield put({ type: "ADD_FRIENDS_FAILED", message: err.message });
  }
}

function* addFriendsOperationWorker(action) {
  try {
    const addFriendsOperationRes = yield call(addFriendsOperation, action.payload);
    yield put({
      type: "ADD_FRIENDS_OPERATION_SUCCESS",
      addFriendsOperationRes: addFriendsOperationRes,
    });
  } catch (err) {
    yield put({ type: "ADD_FRIENDS_OPERATION_FAILED", message: err.message });
  }
}

function* getInvitedFriendsWorker(action) {
  try {
    const getInvitedFriendsRes = yield call(getInvitedFriends, action.payload);
    yield put({
      type: "GET_INVITED_FRIENDS_SUCCESS",
      getInvitedFriendsRes: getInvitedFriendsRes,
    });
  } catch (err) {
    yield put({ type: "GET_INVITED_FRIENDS_FAILED", message: err.message });
  }
}

function* getFriendsWorker(action) {
  try {
    const getFriendsRes = yield call(getFriends);
    yield put({
      type: "GET_FRIENDS_SUCCESS",
      getFriendsRes: getFriendsRes,
    });
  } catch (err) {
    yield put({ type: "GET_FRIENDS_FAILED", message: err.message });
  }
}

function* logoutWorker(action) {
  try {
    const logoutRes = yield call(logout);
    yield put({
      type: "AUTHENTICATE_SUCCESS",
      loginRes: logoutRes.authenticate,
    });
    yield put({ type: "LOGIN_SUCCESS", loginRes: logoutRes.authenticate });
  } catch (err) {
    yield put({ type: "AUTHENTICATE_FAILED", message: err.message });
  }
}

export function* loginWatcher() {
  yield takeEvery("LOGIN_REQUESTED", loginWorker);
}

export function* authenticateWatcher() {
  yield takeEvery("AUTHENTICATE_REQUESTED", authenticateWorker);
}

export function* getUserWatcher() {
  yield takeEvery("GET_USER_REQUESTED", getUserWorker);
}

export function* updateProfileWatcher() {
  yield takeEvery("UPDATE_PROFILE_REQUESTED", updateProfileWorker);
}

export function* addFriendsWatcher() {
  yield takeEvery("ADD_FRIENDS_REQUESTED", addFriendsWorker);
}

export function* addFriendsOperationWatcher() {
  yield takeEvery("ADD_FRIENDS_OPERATION_REQUESTED", addFriendsOperationWorker);
}

export function* getInvitedFriendsWatcher() {
  yield takeEvery("GET_INVITED_FRIENDS_REQUESTED", getInvitedFriendsWorker);
}

export function* getFriendsWatcher() {
  yield takeEvery("GET_FRIENDS_REQUESTED", getFriendsWorker);
}

export function* logoutWatcher() {
  yield takeEvery("LOGOUT_REQUESTED", logoutWorker);
}
