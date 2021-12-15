import axios from "axios";

const loginService = async (username, password) => {
    const loginRes = await axios({
        method: "post",
        data: {
            username: username,
            password: password,
        },
        withCredentials: true,
        url: "http://localhost:4000/auth/login",
    });

    return loginRes.data.success;
};

const registerService = async (listRegisterInfo) => {
    const registerRes = await axios({
        method: "post",
        data: {
            email: listRegisterInfo[0],
            username: listRegisterInfo[1],
            password: listRegisterInfo[2],
            retypePassword: listRegisterInfo[3],
        },
        withCredentials: true,
        url: "http://localhost:4000/auth/register",
    });

    return registerRes.data.success;
};

const checkLoginService = async () => {
    const checkUserLoginRes = await axios({
        method: "get",
        url: "http://localhost:4000/auth/check_login",
        withCredentials: true,
    });

    return checkUserLoginRes.data.authenticated;
};

const getUserInfo = async () => {
    const userInfo = await axios({
        method: "get",
        url: "http://localhost:4000/auth/user",
        withCredentials: true,
    });

    return userInfo;
};

const logoutService = async () => {
    const logoutRes = await axios({
        method: "get",
        url: "http://localhost:4000/auth/logout",
        withCredentials: true,
    });

    return logoutRes.data.success;
};

export { loginService, registerService, checkLoginService, getUserInfo, logoutService };
