import User from "../models/User.js";
import multer from "multer";
import { uploadAvatar } from "../config/cloudinary.config.js";
const upload = multer({ dest: "./uploads/", limit: { fileSize: 50 } }).single("avatar");

class ProfileController {
  async updateProfile(req, res, next) {
    try {
      if (req.user) {
        upload(req, res, async () => {
          if (req.body) {
            const userInfo = req.body;
            const avatar = req.file;
            if (avatar) {
              const avatarInfo = await uploadAvatar(
                `./uploads/${avatar.filename}`,
                req.user.username
              );
              userInfo["avatar"] = avatarInfo.avatarUrl;
              userInfo["avatarId"] = avatarInfo.avatarId;
            }

            const newUserInfo = await User.findOneAndUpdate(
              { username: req.user.username },
              { userInfo: userInfo },
              { new: true }
            );

            return res.json({
              success: true,
              authenticate: true,
              userInfo: newUserInfo,
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addFriends(req, res, next) {
    const findExistEmail = async (email) => {
      const user = await User.findOne({ email: email });
      return user ? true : false;
    };

    const findExistFriend = async (email) => {
      const friend = await User.findOne({ email: email, friends: req.user.email });
      console.log(friend);
      return friend ? true : false;
    };

    const findExistFriendRequest = async (email) => {
      const friendRequests = await User.findOne({ email: email, friendRequests: req.user.email });
      return friendRequests ? true : false;
    };
    try {
      if (req.user) {
        const { friendEmail } = req.body;
        if (friendEmail !== req.user.email) {
          const isExistEmail = await findExistEmail(friendEmail);
          if (isExistEmail) {
            const isExistFriendRequest = await findExistFriendRequest(friendEmail);
            const isExistFriend = await findExistFriend(friendEmail);

            if (!isExistFriendRequest && !isExistFriend) {
              const friendRequestInfo = await User.findOneAndUpdate(
                { email: friendEmail },
                {
                  $push: { friendRequests: req.user.email },
                },
                { new: true }
              );
              return res.status(200).json({
                success: true,
                friendRequestInfo: {
                  userInfo: friendRequestInfo.userInfo,
                  username: friendRequestInfo.username,
                  _id: friendRequestInfo._id,
                },
              });
            } else {
              return res.status(200).json({ success: false, errorCode: 2 });
            }
          }
          return res.status(200).json({ success: false, errorCode: 1 });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async addFriendsAction(req, res) {
    try {
      if (req.user) {
        const { action } = req.params;
        const { friendEmail } = req.query;
        if (action === "accept") {
          const userInfo = await User.findOneAndUpdate(
            { username: req.user.username },
            {
              $pull: { friendRequests: friendEmail },
              $push: { friends: friendEmail },
            },
            {
              new: true,
            }
          );
          const friendsInfo = await User.find(
            { email: { $in: userInfo.friends } },
            { userInfo: 1, username: 1 }
          ).sort({ "userInfo.fullName": 1 });

          return res.status(200).json({ action: "accept", friendsInfo });
        }
        if (action === "reject") {
          await User.updateOne(
            { username: req.user.username },
            {
              $pull: { friendRequests: friendEmail },
            }
          );
          return res.status(200).json({ action: "reject" });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async getInvitedFriends(req, res, next) {
    try {
      if (req.user) {
        const listFriendsRequests = await User.findOne(
          { username: req.user.username },
          { friendRequests: 1 }
        );
        const listFriendsRequestsInfo = await User.find(
          {
            email: { $in: listFriendsRequests.friendRequests },
          },
          { userInfo: 1, username: 1, email: 1 }
        );
        return res.status(200).json(listFriendsRequestsInfo);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async getFriends(req, res) {
    try {
      if (req.user) {
        const friendEmails = await User.findOne(
          { username: req.user.username },
          { _id: 0, friends: 1 }
        );
        const friendsInfo = await User.find(
          { email: { $in: friendEmails.friends } },
          { userInfo: 1, username: 1 }
        ).sort({ "userInfo.fullName": 1 });

        return res.status(200).json(friendsInfo);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new ProfileController();
