import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginAction } from "../../redux/actions/users.js";
import { useDispatch } from "react-redux";
import { Chat, PersonOutlined, LockOutlined, Facebook, Twitter } from "@material-ui/icons";
import { GoogleOutlined } from "@ant-design/icons";
import "./login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginAction(username, password));
    };

    return (
        <div className="login-page">
            <div className="login-page-container">
                <div className="login-page-logo">
                    <div className="login-page-logo__wrap">
                        <Chat className="login-page-logo__icon" />
                    </div>
                </div>
                <h5 className="login-page-title">Sign in</h5>
                <form action="" className="login-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username or Email"
                            className="form__input"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="form__input-icon-wrap">
                            <PersonOutlined className="form__input-icon" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form__input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="form__input-icon-wrap">
                            <LockOutlined className="form__input-icon" />
                        </div>
                    </div>
                    <div className="login-form-action">
                        <label className="login-form-action__save-password">
                            <input type="checkbox" className="login-form-action__save-password--checkbox" />
                            <div className="login-form-action__save-password-text">Remember me</div>
                        </label>
                        <div className="login-form-action__reset-password">Reset password</div>
                    </div>
                    <button className="login-form__btn btn btn-primary" onClick={handleLogin}>
                        Sign in
                    </button>
                    <div className="login-form__socials">
                        <div className="text-muted">Login with your social media account</div>
                        <div className="login-form__socials-list">
                            <a href="/" title="Facebook" className="socials-icon__btn btn-facebok">
                                <Facebook className="socials-icon" />
                            </a>
                            <a href="/" title="Twitter" className="socials-icon__btn btn-twitter">
                                <Twitter className="socials-icon" />
                            </a>
                            <a href="/" title="Google" className="socials-icon__btn btn-google">
                                <GoogleOutlined className="socials-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="text-muted">Don't have an account?</div>
                    <Link to="/register" className="login-form__btn btn btn-normal">
                        Register now!
                    </Link>
                </form>
            </div>
        </div>
    );
}
