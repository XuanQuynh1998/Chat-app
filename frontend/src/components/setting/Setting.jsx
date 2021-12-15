import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "../../components/editProfile/EditProfile";
import allActions from "../../redux/actions/index.js";
import "./setting.css";
import {
  Close,
  ArrowForwardIos,
  PersonOutlined,
  Edit,
  ExpandMore,
  Lock,
  Security,
  Help,
  Brightness1,
} from "@material-ui/icons";

const initialShowCardState = {
  showAbout: false,
  showPrivacy: false,
  showSecurity: false,
  showHelp: false,
};

const initialPrivacyState = {
  profilePhoto: false,
  status: false,
  groups: false,
};

const showCardReducer = (state, action) => {
  for (let index in initialShowCardState) {
    if (index === action.type) {
      return { ...initialShowCardState, [action.type]: !state[index] };
    }
  }
};

const privacyReducer = (state, action) => {
  for (let index in initialPrivacyState) {
    if (index === action.type) {
      return { ...initialPrivacyState, [action.type]: !state[index] };
    }
  }
};

export default function Setting() {
  const dispatch = useDispatch();

  const editProfileState = useSelector((state) => state.editProfile);
  const user = useSelector((state) => state.authenticate.user);

  const [showCardState, showCardDispatch] = useReducer(showCardReducer, initialShowCardState);
  const [privacyState, privacyDispatch] = useReducer(privacyReducer, initialPrivacyState);
  const [lastSeenCheckbox, setLastSeenCheckbox] = useState(false);
  const [readReceiptsCheckbox, setReadReceiptsCheckbox] = useState(false);
  const [securityCheckbox, setSecurityCheckbox] = useState(false);

  return (
    <div className="setting">
      <header className="setting-header">
        <div className="setting-header__text">Settings</div>
        <button
          className="setting-header__close-btn"
          onClick={() => dispatch(allActions.showSettings())}
        >
          <Close className="setting-header__close-btn-icon" />
        </button>
      </header>
      <div className="setting-body">
        <div className="setting-body__user">
          <div className="setting-body__user-avatar">
            <img src={user?.userInfo?.avatar} alt="" />
            <button className="setting-body__user--edit-avatar">
              <Edit className="setting-body__user--edit-avatar-icon" />
            </button>
          </div>
          <div className="setting-body__user-info">
            <h5>{user?.userInfo?.fullName ? user?.userInfo?.fullName : user?.username}</h5>
            <div className="setting-body__user-state">
              <button className="setting-body__user-current-state">
                <p>Available</p>
                <ExpandMore className="setting-body__user-current-state-icon" />
              </button>
              <div className="setting-body__user-list-state">
                <button>Available</button>
                <button>Busy</button>
              </div>
            </div>
          </div>
        </div>
        <div className="setting-body__card-container">
          <div className="setting-body__card">
            <div
              className="setting-body__card-header"
              onClick={() => showCardDispatch({ type: "showAbout" })}
            >
              <PersonOutlined className="setting-body__card-header-left-icon" />
              <div className="setting-body__card-header-text">Profile Infomation</div>
              <ArrowForwardIos className="setting-body__card-header-right-icon" />
            </div>
            <div className={`setting-body__card-body ${showCardState.showAbout ? "show" : ""}`}>
              <div className="setting-body__edit-profile">
                <button
                  className="card-body__btn"
                  onClick={() => dispatch(allActions.editProfile())}
                >
                  <Edit className="card-body__btn-icon" />
                  <span>Edit</span>
                </button>
                {editProfileState && <EditProfile />}
              </div>
              <div className="card-body__item">
                <span>Name</span>
                <h5>{user?.userInfo?.fullName ? user?.userInfo?.fullName : user?.username}</h5>
              </div>
              <div className="card-body__item">
                <span>Email</span>
                <h5>{user?.email}</h5>
              </div>
              <div className="card-body__item">
                <span>Phone</span>
                <h5>{user?.userInfo?.phone}</h5>
              </div>
              <div className="card-body__item">
                <span>Location</span>
                <h5>{user?.userInfo?.location}</h5>
              </div>
            </div>
          </div>
          <div className="setting-body__card">
            <div
              className="setting-body__card-header"
              onClick={() => showCardDispatch({ type: "showSecurity" })}
            >
              <Security className="setting-body__card-header-left-icon" />
              <div className="setting-body__card-header-text">Privacy</div>
              <ArrowForwardIos className="setting-body__card-header-right-icon" />
            </div>
            <div className={`setting-body__card-body ${showCardState.showSecurity ? "show" : ""}`}>
              <div className="card-body__item-row">
                <span>Profile photo</span>
                <div className="card-body__item-select">
                  <button
                    className="card-body__item-current-select"
                    onClick={() => privacyDispatch({ type: "profilePhoto" })}
                  >
                    <span>Everyone</span>
                    <ExpandMore className="card-body__item-current-select-icon" />
                  </button>
                  <div
                    className={`card-body__item-list-select ${
                      privacyState.profilePhoto ? "show" : ""
                    }`}
                  >
                    <button>Everyone</button>
                    <button>Selected</button>
                    <button>Nobody</button>
                  </div>
                </div>
              </div>
              <div className="card-body__item-row">
                <span>Last seen</span>
                <div className="card-body__item-checkbox-container">
                  <div
                    className={`card-body__item-custom-checkbox ${
                      lastSeenCheckbox ? "checked" : ""
                    }`}
                  >
                    <label htmlFor="card-body__item-last-seen-checkbox"></label>
                    <input
                      type="checkbox"
                      id="card-body__item-last-seen-checkbox"
                      onChange={(e) => {}}
                      onClick={() => setLastSeenCheckbox(!lastSeenCheckbox)}
                      checked={lastSeenCheckbox}
                    />
                    <Brightness1 className="card-body__item-last-seen-checkbox-icon card-body__item-checkbox-icon" />
                  </div>
                </div>
              </div>
              <div className="card-body__item-row">
                <span>Status</span>
                <div className="card-body__item-select">
                  <button
                    className="card-body__item-current-select"
                    onClick={() => privacyDispatch({ type: "status" })}
                  >
                    <span>Everyone</span>
                    <ExpandMore className="card-body__item-current-select-icon" />
                  </button>
                  <div
                    className={`card-body__item-list-select ${privacyState.status ? "show" : ""}`}
                  >
                    <button>Everyone</button>
                    <button>Selected</button>
                    <button>Nobody</button>
                  </div>
                </div>
              </div>
              <div className="card-body__item-row">
                <span>Read receipts</span>
                <div className="card-body__item-checkbox-container">
                  <div
                    className={`card-body__item-custom-checkbox ${
                      readReceiptsCheckbox ? "checked" : ""
                    }`}
                  >
                    <label htmlFor="card-body__item-read-receipts-checkbox"></label>
                    <input
                      type="checkbox"
                      id="card-body__item-read-receipts-checkbox"
                      onChange={(e) => {}}
                      onClick={() => setReadReceiptsCheckbox(!readReceiptsCheckbox)}
                      checked={readReceiptsCheckbox}
                    />
                    <Brightness1 className="card-body__item-read-receipts-checkbox-icon card-body__item-checkbox-icon" />
                  </div>
                </div>
              </div>
              <div className="card-body__item-row">
                <span>Groups</span>
                <div className="card-body__item-select">
                  <button
                    className="card-body__item-current-select"
                    onClick={() => privacyDispatch({ type: "groups" })}
                  >
                    <span>Everyone</span>
                    <ExpandMore className="card-body__item-current-select-icon" />
                  </button>
                  <div
                    className={`card-body__item-list-select ${privacyState.groups ? "show" : ""}`}
                  >
                    <button>Everyone</button>
                    <button>Selected</button>
                    <button>Nobody</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="setting-body__card">
            <div
              className="setting-body__card-header"
              onClick={() => showCardDispatch({ type: "showPrivacy" })}
            >
              <Lock className="setting-body__card-header-left-icon" />
              <div className="setting-body__card-header-text">Security</div>
              <ArrowForwardIos className="setting-body__card-header-right-icon" />
            </div>
            <div className={`setting-body__card-body ${showCardState.showPrivacy ? "show" : ""}`}>
              <div className="card-body__item-row">
                <span>Show security notification</span>
                <div className="card-body__item-checkbox-container">
                  <div
                    className={`card-body__item-custom-checkbox ${
                      securityCheckbox ? "checked" : ""
                    }`}
                  >
                    <label htmlFor="card-body__item-security-checkbox"></label>
                    <input
                      type="checkbox"
                      id="card-body__item-security-checkbox"
                      onChange={(e) => {}}
                      onClick={() => setSecurityCheckbox(!securityCheckbox)}
                      checked={securityCheckbox}
                    />
                    <Brightness1 className="card-body__item-security-checkbox-icon card-body__item-checkbox-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="setting-body__card">
            <div
              className="setting-body__card-header"
              onClick={() => showCardDispatch({ type: "showHelp" })}
            >
              <Help className="setting-body__card-header-left-icon" />
              <div className="setting-body__card-header-text">Help</div>
              <ArrowForwardIos className="setting-body__card-header-right-icon" />
            </div>
            <div className={`setting-body__card-body ${showCardState.showHelp ? "show" : ""}`}>
              <div className="card-body__item">
                <a href="/#">FAQs</a>
                <a href="/#">Contact</a>
                <a href="/#">Terms & Privacy policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
