import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import User from "../models/User.js";

cloudinary.config({
  cloud_name: "xquynh1998",
  api_key: "249314197687684",
  api_secret: "XsAaWAq-5Oeb5RkJlrSoIpLOBqs",
  secure: true,
});

const deleteUploadedFile = async (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
};

const getCurrentAvatarId = async (username) => {
  try {
    const getAvatarIdRes = await User.findOne({ username: username }, { "userInfo.avatarId": 1 });
    return getAvatarIdRes.userInfo.avatarId;
  } catch (err) {
    console.log(err);
  }
};

const uploadAvatar = async (filePath, username) => {
  try {
    const currentAvatarId = await getCurrentAvatarId(username);
    if (currentAvatarId) {
      await cloudinary.uploader.destroy(currentAvatarId);
    }

    const uploadRes = await cloudinary.uploader.upload(filePath, {
      transformation: {
        width: 120,
        height: 120,
        crop: "thumb",
      },
      folder: "avatar/",
      resource_type: "auto",
    });

    await deleteUploadedFile(filePath);

    return { avatarUrl: uploadRes.secure_url, avatarId: uploadRes.public_id };
  } catch (err) {
    console.log(err);
  }
};

const uploadFiles = async (filesInfo) => {
  const upload = async ({ file, uploadFolder, fileType }) => {
    const uploadRes = await cloudinary.uploader.upload(file.path, {
      folder: `files/${uploadFolder}/`,
      resource_type: "auto",
    });

    await deleteUploadedFile(file.path);

    return {
      fileUrl: uploadRes.url,
      fileType: fileType,
      fileName: file.originalname,
    };
  };

  try {
    const fileList = await Promise.all(
      filesInfo.map(async (file) => {
        switch (file.mimetype.split("/")[0]) {
          case "image": {
            const res = await upload({ file, uploadFolder: "images", fileType: "image" });
            return res;
          }
          case "video": {
            const res = await upload({ file, uploadFolder: "videos", fileType: "video" });
            return res;
          }
          case "audio": {
            const res = await upload({ file, uploadFolder: "audio", fileType: "audio" });
            return res;
          }
          default: {
            const res = await upload({ file, uploadFolder: "raws", fileType: "raw" });
            return res;
          }
        }
      })
    );

    const fileObj = {
      images: fileList.filter((file) => file.fileType === "image"),
      videos: fileList.filter((file) => file.fileType === "video"),
      audio: fileList.filter((file) => file.fileType === "audio"),
      raws: fileList.filter((file) => file.fileType === "raw"),
    };

    return fileObj;
  } catch (err) {
    console.log(err);
  }
};

export { uploadAvatar, uploadFiles };
