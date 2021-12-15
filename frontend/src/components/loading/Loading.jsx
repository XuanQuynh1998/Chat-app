import React from "react";
import "./loading.css";
import loadingImg from "../../public/assets/loading.png";

export default function Loading() {
    return (
        <div className="loading">
            <div className="loading-img">
                <img src={loadingImg} alt="" />
            </div>
        </div>
    );
}
