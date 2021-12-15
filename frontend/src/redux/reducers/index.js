import { rightbar, editProfile } from "./rightbar.js";
import { activeComponent, activeConversation, activeFriend } from "./navbar.js";
import {
  login,
  authenticate,
  getUser,
  updateProfile,
  addFriends,
  addFriendsOperation,
  getInvitedFriends,
  getFriends,
  logout,
} from "./users.js";
import {
  getConversation,
  setConversation,
  getMessages,
  getLastestMessages,
  sendMessages,
  getAllMediaFiles,
} from "./chats.js";
import { activeCall } from "./call.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  rightbar,
  editProfile,
  activeComponent,
  activeConversation,
  activeFriend,
  login,
  authenticate,
  addFriends,
  addFriendsOperation,
  getInvitedFriends,
  getFriends,
  logout,
  getUser,
  updateProfile,
  getConversation,
  setConversation,
  getMessages,
  getLastestMessages,
  sendMessages,
  getAllMediaFiles,
  activeCall,
});

export default rootReducer;
