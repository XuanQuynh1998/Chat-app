import axios from "axios";

const updateProfile = async (profileData) => {
    const updateProfileRes = await axios({
        method: "post",
        data: profileData,
        withCredentials: true,
        url: "http://localhost:4000/profile/update_profile",
    });

    return updateProfileRes.data.success;
};

export { updateProfile };
