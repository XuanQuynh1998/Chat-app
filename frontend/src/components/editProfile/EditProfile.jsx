import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../redux/actions/users.js";
import allActions from "../../redux/actions/index.js";
import Loading from "../loading/Loading.jsx";
import "./editProfile.css";
import {
  EditOutlined,
  Close,
  PersonOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  WebOutlined,
} from "@material-ui/icons";

export default function EditProfile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authenticate.user);
  const updateProfileState = useSelector((state) => state.updateProfile);

  const [editProfileNav, setEditProfileNav] = useState({
    personal: true,
    about: false,
  });

  const [profileInfo, setProfileInfo] = useState({
    fullName: user.userInfo.fullName,
    avatar: user.userInfo.avatar,
    phone: user.userInfo.phone,
    location: user.userInfo.location,
    website: user.userInfo.website,
    about: user.userInfo.about,
  });

  const submitProfile = () => {
    const formData = new FormData();
    for (var key in profileInfo) {
      formData.append(key, profileInfo[key]);
    }
    dispatch(updateProfileAction(formData));
  };

  if (updateProfileState.loading) {
    return <Loading />;
  }

  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-header__text">
              <EditOutlined />
              <h5>Edit Profile</h5>
            </div>
            <button className="modal-close-btn" onClick={() => dispatch(allActions.editProfile())}>
              <Close className="modal-close-btn__icon" />
            </button>
          </div>
          <div className="edit-profile-body">
            <div className="edit-profile-nav">
              <div
                className={`edit-profile-nav__item ${editProfileNav.personal ? "nav-active" : ""}`}
              >
                <a
                  href="#personal"
                  className="edit-profile-nav__item-link"
                  onClick={() => setEditProfileNav({ personal: true, about: false })}
                >
                  Personal
                </a>
              </div>
              <div className={`edit-profile-nav__item ${editProfileNav.about ? "nav-active" : ""}`}>
                <a
                  href="#about"
                  className="edit-profile-nav__item-link"
                  onClick={() => setEditProfileNav({ personal: false, about: true })}
                >
                  About
                </a>
              </div>
              <div className="edit-profile-nav__item">
                <a href="#socials" className="edit-profile-nav__item-link">
                  Social Links
                </a>
              </div>
            </div>
            <div className="edit-profile-content">
              <div
                className={`edit-profile-content__item-container ${
                  editProfileNav.personal ? "show" : ""
                }`}
              >
                <div className="edit-profile-content__item">
                  <span>Fullname</span>
                  <div className="edit-profile-content__item-input">
                    <input
                      type="text"
                      onChange={(e) => {
                        setProfileInfo({
                          ...profileInfo,
                          fullName: e.target.value,
                        });
                      }}
                      value={profileInfo.fullName}
                    />
                    <div className="edit-profile-content__item-input-icon-wrap">
                      <PersonOutlined className="edit-profile-content__item-input-icon" />
                    </div>
                  </div>
                </div>
                <div className="edit-profile-content__item">
                  <span className="edit-profile-content__item-label">Avatar</span>
                  <div className="edit-profile-content__item-avatar">
                    <div className="edit-profile-content__item-current-avatar">
                      <img src={user.userInfo.avatar} alt="" />
                    </div>
                    <label
                      htmlFor="edit-profile-content__item-input-avatar"
                      className="edit-profile-content__item-input-avatar-label"
                    >
                      Choose file
                    </label>
                    <input
                      type="file"
                      id="edit-profile-content__item-input-avatar"
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          avatar: e.target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
                <div className="edit-profile-content__item">
                  <span className="edit-profile-content__item-label">Location</span>
                  <div className="edit-profile-content__item-input">
                    <input
                      type="text"
                      onChange={(e) => {
                        setProfileInfo({
                          ...profileInfo,
                          location: e.target.value,
                        });
                      }}
                      value={profileInfo.location}
                    />
                    <div className="edit-profile-content__item-input-icon-wrap">
                      <LocationOnOutlined className="edit-profile-content__item-input-icon" />
                    </div>
                  </div>
                </div>
                <div className="edit-profile-content__item">
                  <span className="edit-profile-content__item-label">Phone</span>
                  <div className="edit-profile-content__item-input">
                    <input
                      type="text"
                      onChange={(e) => {
                        setProfileInfo({
                          ...profileInfo,
                          phone: e.target.value,
                        });
                      }}
                      value={profileInfo.phone}
                    />
                    <div className="edit-profile-content__item-input-icon-wrap">
                      <PhoneOutlined className="edit-profile-content__item-input-icon" />
                    </div>
                  </div>
                </div>
                <div className="edit-profile-content__item">
                  <span className="edit-profile-content__item-label">Website</span>
                  <div className="edit-profile-content__item-input">
                    <input
                      type="text"
                      onChange={(e) => {
                        setProfileInfo({
                          ...profileInfo,
                          website: e.target.value,
                        });
                      }}
                      value={profileInfo.website}
                    />
                    <div className="edit-profile-content__item-input-icon-wrap">
                      <WebOutlined className="edit-profile-content__item-input-icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`edit-profile-content__item-container ${
                  editProfileNav.about ? "show" : ""
                }`}
              >
                <div className="edit-profile-content__item">
                  <span className="edit-profile-content__item-label">
                    Write a few words that describe you
                  </span>
                  <div className="edit-profile-content__item-input">
                    <textarea
                      name="about"
                      onChange={(e) => {
                        setProfileInfo({
                          ...profileInfo,
                          about: e.target.value,
                        });
                      }}
                      value={profileInfo.about}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-footer__btn-submit" onClick={submitProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
