import * as types from "../types/userTypes.js";

const initialLoginState = {
  loading: false,
  error: null,
  isAuthenticated: null,
  user: null,
};

const initialGetUserState = {
  loading: false,
  error: null,
  user: null,
};

const initialUpdateProfileState = {
  loading: false,
  error: null,
  success: null,
};

const initialFriendsState = {
  loading: false,
  error: null,
  success: null,
  friendsInfo: null,
};

const initialLogoutState = {
  loading: false,
  error: null,
};

export const login = (state = initialLoginState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: action.loginRes.authenticate,
        user: action.loginRes.userInfo,
      };

    case types.LOGIN_FAILED:
      return { ...state, isAuthenticated: false, loading: false };

    default:
      return state;
  }
};

export const authenticate = (state = initialLoginState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case types.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: action.loginRes.authenticate,
        user: action.loginRes.userInfo,
      };

    case types.AUTHENTICATE_FAILED:
      return { ...state, isAuthenticated: false, loading: false };

    default:
      return state;
  }
};

export const getUser = (state = initialGetUserState, action) => {
  switch (action.type) {
    case types.GET_USER_REQUESTED:
      return { ...state, loading: true };

    case types.GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.user };

    case types.GET_USER_FAILED:
      return state;

    default:
      return state;
  }
};

export const updateProfile = (state = initialUpdateProfileState, action) => {
  switch (action.type) {
    case types.UPDATE_PROFILE_REQUESTED:
      return { ...state, loading: true };

    case types.UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, success: true };

    case types.UPDATE_PROFILE_FAILED:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const addFriends = (state = initialFriendsState, action) => {
  switch (action.type) {
    case types.ADD_FRIENDS_REQUESTED:
      return { ...state, loading: true };

    case types.ADD_FRIENDS_SUCCESS:
      return { ...state, loading: false, success: true, friendsInfo: action.addFriendsRes };

    case types.ADD_FRIENDS_FAILED:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const addFriendsOperation = (state = initialFriendsState, action) => {
  switch (action.type) {
    case types.ADD_FRIENDS_OPERATION_REQUESTED:
      return { ...state, loading: true };

    case types.ADD_FRIENDS_OPERATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        friendsInfo: action.addFriendsOperationRes,
      };

    case types.ADD_FRIENDS_OPERATION_FAILED:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const getInvitedFriends = (state = initialFriendsState, action) => {
  switch (action.type) {
    case types.GET_INVITED_FRIENDS_REQUESTED:
      return { ...state, loading: true };

    case types.GET_INVITED_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        friendsInfo: action.getInvitedFriendsRes,
      };

    case types.GET_INVITED_FRIENDS_FAILED:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const getFriends = (state = initialFriendsState, action) => {
  switch (action.type) {
    case types.GET_FRIENDS_REQUESTED:
      return { ...state, loading: true };

    case types.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        friendsInfo: action.getFriendsRes,
      };

    case types.GET_FRIENDS_FAILED:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const logout = (state = initialLogoutState, action) => {
  switch (action.type) {
    case types.LOGOUT_REQUESTED:
      return { ...state, loading: true };
    default:
      return state;
  }
};
