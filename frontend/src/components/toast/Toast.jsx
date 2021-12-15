import React from "react";
import "./toast.css";
import { CheckCircleOutlined } from "@material-ui/icons";

export default function Toast({ type, message }) {
    return (
        <div className="toast">
            <div className={`toast-item ${type === "success" ? "toast-active" : ""}`}>
                <CheckCircleOutlined className="toast-icon" />
                <p className="toast-message">{message}</p>
            </div>
        </div>
    );
}
