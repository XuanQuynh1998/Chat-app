import * as mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import User from "../models/User.js";

class ConversationController {
  async conversation(req, res, next) {
    try {
      if (req.user) {
        const { name, arrayMembers } = req.body;
        const newConversation = new Conversation({
          name: name,
          members: arrayMembers,
        });
        const existConversation = await Conversation.findOne({ members: arrayMembers });

        if (!existConversation) {
          const savedConversation = await newConversation.save();
          const friendId = savedConversation.members.find((id) => id !== req.user._id);
          const friendInfo = await User.findOne({ _id: friendId }, { username: 1, userInfo: 1 });

          return res.status(200).json({ friendInfo, conversation: savedConversation });
        }
        const friendId = existConversation.members.find((id) => id !== req.user._id);
        const friendInfo = await User.findOne({ _id: friendId }, { username: 1, userInfo: 1 });

        return res.status(200).json({ friendInfo, conversation: existConversation });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getConversation(req, res, next) {
    try {
      if (req.user) {
        let listFriendInfo = [];
        const conversations = await Conversation.find({
          members: { $in: [req.params.userId] },
        });

        for (let conversation of conversations) {
          const friendId = conversation.members.find((member) => member !== req.params.userId);
          const friendInfo = await User.findOne(
            {
              _id: friendId,
            },
            { username: 1, userInfo: 1 }
          );
          listFriendInfo.push({ friendInfo, conversation });
        }

        return res.status(200).json(listFriendInfo);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
export default new ConversationController();
