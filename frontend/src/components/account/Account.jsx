import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../redux/actions/index.js";
import "./account.css";

import {
  Close,
  ArrowForwardIos,
  PersonOutlined,
  AttachFileOutlined,
  InsertDriveFile,
  GetApp,
  MoreHoriz,
} from "@material-ui/icons";

const initialShowCardState = {
  showAbout: false,
  showAttachedFiles: false,
};

const showCardReducer = (state, action) => {
  for (let index in initialShowCardState) {
    if (index === action.type) {
      return { ...initialShowCardState, [action.type]: !state[index] };
    }
  }
};

export default function Account() {
  const [state, showCardDispatch] = useReducer(showCardReducer, initialShowCardState);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authenticate.user);

  return (
    <div className="account">
      <header className="account-header">
        <div className="account-header__text">Profile</div>
        <button
          className="account-header__close-btn"
          onClick={() => dispatch(allActions.showProfile())}
        >
          <Close className="account-header__close-btn-icon" />
        </button>
      </header>
      <div className="account-body">
        <div className="account-body__user">
          <div className="account-body__user-avatar">
            <img src={user?.userInfo?.avatar} alt="" />
          </div>
          <div className="account-body__user-info">
            <h5>{user?.userInfo?.fullName || user?.username}</h5>
            <small>Last seen: Today</small>
          </div>
          <p className="account-body__user-about">{user?.userInfo?.about}</p>
        </div>
        <div className="account-body__card-container">
          <div className="account-body__card">
            <div
              className="account-body__card-header"
              onClick={() => showCardDispatch({ type: "showAbout" })}
            >
              <PersonOutlined className="account-body__card-header-left-icon" />
              <div className="account-body__card-header-text">About</div>
              <ArrowForwardIos className="account-body__card-header-right-icon" />
            </div>
            <div className={`account-body__card-body ${state.showAbout ? "show" : ""}`}>
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
          <div className="account-body__card">
            <div
              className="account-body__card-header"
              onClick={() => showCardDispatch({ type: "showAttachedFiles" })}
            >
              <AttachFileOutlined className="account-body__card-header-left-icon" />
              <div className="account-body__card-header-text">Attached Files</div>
              <ArrowForwardIos className="account-body__card-header-right-icon" />
            </div>
            <div className={`account-body__card-body ${state.showAttachedFiles ? "show" : ""}`}>
              <div className="card-body__item">
                <div className="card-body__attached">
                  <div className="card-body__attached-img">
                    <InsertDriveFile />
                  </div>
                  <div className="card-body__attached-info">
                    <h5>Admin-A.zip</h5>
                    <p>12.5 MB</p>
                  </div>
                  <div className="card-body__attached-btn-group">
                    <button>
                      <GetApp className="card-body__attached-btn-icon" />
                    </button>
                    <button>
                      <MoreHoriz className="card-body__attached-btn-icon" />
                    </button>
                  </div>
                </div>
                <div className="card-body__attached">
                  <div className="card-body__attached-img">
                    <InsertDriveFile />
                  </div>
                  <div className="card-body__attached-info">
                    <h5>Admin-A.zip</h5>
                    <p>12.5 MB</p>
                  </div>
                  <div className="card-body__attached-btn-group">
                    <button>
                      <GetApp className="card-body__attached-btn-icon" />
                    </button>
                    <button>
                      <MoreHoriz className="card-body__attached-btn-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
