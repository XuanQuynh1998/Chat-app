import React, { useState } from "react";
import { registerService } from "../../services/auth.js";
import "./register.css";
import "../login/login.css";
import { Chat, PersonOutlined, LockOutlined, MailOutlined } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

export default function Register() {
    const history = useHistory();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRetypePassword, setRegisterRetypePassword] = useState("");

    const register = async (e) => {
        e.preventDefault();
        const registerRes = await registerService([
            registerEmail,
            registerUsername,
            registerPassword,
            registerRetypePassword,
        ]);
        registerRes ? history.push("/login") : history.push("/register");
    };

    return (
        <div className="login-page">
            <div className="login-page-container">
                <div className="login-page-logo">
                    <div className="login-page-logo__wrap">
                        <Chat className="login-page-logo__icon" />
                    </div>
                </div>
                <h5 className="login-page-title">Register</h5>
                <form action="" className="login-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Email"
                            className="form__input"
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                        <div className="form__input-icon-wrap">
                            <MailOutlined className="form__input-icon" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            className="form__input"
                            onChange={(e) => setRegisterUsername(e.target.value)}
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
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <div className="form__input-icon-wrap">
                            <LockOutlined className="form__input-icon" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Re-type Password"
                            className="form__input"
                            onChange={(e) => setRegisterRetypePassword(e.target.value)}
                        />
                        <div className="form__input-icon-wrap">
                            <LockOutlined className="form__input-icon" />
                        </div>
                    </div>
                    <button className="login-form__btn btn btn-primary" onClick={register}>
                        Register
                    </button>
                    <div className="text-muted register-text">Already have an account?</div>
                    <Link to="/login" className="login-form__btn btn btn-normal">
                        Sign in!
                    </Link>
                </form>
            </div>
        </div>
    );
}
