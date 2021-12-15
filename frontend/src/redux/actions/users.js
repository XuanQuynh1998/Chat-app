import * as types from "../types/userTypes.js";

export function loginAction(username, password) {
  return {
    type: types.LOGIN_REQUESTED,
    payload: { username: username, password: password },
  };
}

export function authenticateAction() {
  return {
    type: types.AUTHENTICATE_REQUESTED,
  };
}

export function getUserAction(userId) {
  return {
    type: types.GET_USER_REQUESTED,
    payload: userId,
  };
}

export function updateProfileAction(profileInfo) {
  return {
    type: types.UPDATE_PROFILE_REQUESTED,
    payload: profileInfo,
  };
}

export function addFriendsAction(friendEmail) {
  return {
    type: types.ADD_FRIENDS_REQUESTED,
    payload: { friendEmail },
  };
}

export function addFriendsOperationAction({ action, friendEmail }) {
  return {
    type: types.ADD_FRIENDS_OPERATION_REQUESTED,
    payload: { action, friendEmail },
  };
}

export function getInvitedFriendsAction(reqFriendSocket = null) {
  return {
    type: types.GET_INVITED_FRIENDS_REQUESTED,
    payload: reqFriendSocket,
  };
}

export function getFriendsAction() {
  return {
    type: types.GET_FRIENDS_REQUESTED,
  };
}

export function logoutAction() {
  return {
    type: types.LOGOUT_REQUESTED,
  };
}
