import React, { useState } from "react";
import { useDispatch } from "react-redux";
import allActions from "../../redux/actions/index.js";
import { logoutAction } from "../../redux/actions/users.js";
import { activeComponentAction } from "../../redux/actions/navbar.js";
import "./navbar.css";
import {
  Chat,
  ChatBubbleOutline,
  PersonOutlineOutlined,
  StarBorderOutlined,
  ArchiveOutlined,
  NightsStayOutlined,
  AccountCircleOutlined,
  AccountBoxOutlined,
  Settings,
  ExitToApp,
} from "@material-ui/icons";

export default function Navbar() {
  const [ariaExpanded, setAriaExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState("chats");
  const dispatch = useDispatch();

  const changeAriaExpanded = () => {
    setAriaExpanded(!ariaExpanded);
  };

  const activeComponentHandle = (name) => {
    setActiveComponent(name);
    dispatch(activeComponentAction(name));
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="navbar">
      <div className="navbar__group">
        <div className="navbar__group-item-logo">
          <a href="/#" title="" className="navbar__group-logo">
            <Chat className="navbar__group-logo-icon" />
          </a>
        </div>
        <div className="navbar__group-chats-item">
          <div className="navbar__group-item">
            <a
              href="/#"
              title=""
              data-placement="left"
              data-original-title="Chats"
              className={`navbar__group-item-link ${
                activeComponent === "chats" ? "active" : null
              } `}
              onClick={() => activeComponentHandle("chats")}
            >
              <ChatBubbleOutline className="navbar__group-icon" />
            </a>
          </div>
          <div className="navbar__group-item">
            <a
              href="/#"
              title=""
              data-placement="left"
              data-original-title="Friends"
              className={`navbar__group-item-link ${
                activeComponent === "friends" ? "active" : null
              } `}
              onClick={() => activeComponentHandle("friends")}
            >
              <PersonOutlineOutlined className="navbar__group-icon" />
            </a>
          </div>
          <div className="navbar__group-item">
            <a
              href="/#"
              title=""
              data-placement="left"
              data-original-title="Favorites"
              className="navbar__group-item-link"
            >
              <StarBorderOutlined className="navbar__group-icon" />
            </a>
          </div>
          <div className="navbar__group-item">
            <a href="/#" title="" data-placement="left" data-original-title="Archived">
              <ArchiveOutlined className="navbar__group-icon" />
            </a>
          </div>
        </div>

        <div className="navbar__group-item">
          <a href="/#" title="" data-placement="left" data-original-title="Themes Mode">
            <NightsStayOutlined className="navbar__group-icon" />
          </a>
        </div>
        <div className="navbar__group-item">
          <a
            href="/#"
            title=""
            aria-expanded={ariaExpanded}
            data-placement="left"
            data-original-title="User Menu"
            onClick={changeAriaExpanded}
          >
            <AccountCircleOutlined className="navbar__group-icon" />
          </a>
          <div className="dropdown-menu">
            <div
              className="dropdown-menu__item"
              onClick={() => {
                dispatch(allActions.showProfile());
                changeAriaExpanded();
              }}
            >
              <div className="dropdown-menu__item-text">Profile</div>
              <AccountBoxOutlined className="dropdown-menu__icon" />
            </div>
            <div
              className="dropdown-menu__item"
              onClick={() => {
                dispatch(allActions.showSettings());
                changeAriaExpanded();
              }}
            >
              <div className="dropdown-menu__item-text">Settings</div>
              <Settings className="dropdown-menu__icon" />
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-menu__item" onClick={logout}>
              <div className="dropdown-menu__item-text">Logout</div>
              <ExitToApp className="dropdown-menu__icon" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
