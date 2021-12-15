import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import multer from "multer";
import { uploadFiles } from "../config/cloudinary.config.js";
const upload = multer({ dest: "./uploads/", limit: { fileSize: 50 } }).array("file");

class MessageController {
  async messages(req, res, next) {
    try {
      if (req.user) {
        upload(req, res, async () => {
          const fileList = await uploadFiles(req.files);

          const { senderId, conversationId, text } = req.body;
          await Message.updateOne(
            { conversationId: conversationId },
            {
              $push: { messages: { text: text, senderId: senderId, files: fileList } },
              lastestMessage: {
                text: text,
                senderId: senderId,
                files: fileList,
                sendingTime: Date.now(),
              },
            },
            { upsert: true, new: true }
          );
          const messages = await Message.findOne(
            { conversationId: conversationId },
            { messages: 1, _id: 0 }
          );
          return res.status(200).json(messages);
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getMessages(req, res, next) {
    try {
      if (req.user) {
        const messages = await Message.findOne(
          {
            conversationId: req.params.conversationId,
          },
          { messages: 1, _id: 0 }
        );
        return res.status(200).json(messages || {});
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getLastestMessages(req, res, next) {
    try {
      if (req.user) {
        const joinedConversations = await Conversation.find(
          {
            members: { $in: [`${req.user._id}`] },
          },
          { _id: 1 }
        );

        const listConversationId = joinedConversations.map((conversationId) => conversationId._id);

        const lastestMessages = await Message.find(
          {
            conversationId: { $in: listConversationId },
          },
          { lastestMessage: 1, conversationId: 1, _id: 0 }
        );

        return res.status(200).json(lastestMessages);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getAllMediaFiles(req, res) {
    try {
      if (req.user) {
        Message.findOne(
          { conversationId: req.params.conversationId },
          { "messages.files.videos": 1, "messages.files.images": 1, _id: 0 },
          (err, result) => {
            const allMediaFiles = result.messages
              .map((message) => [...message.files.images, ...message.files.videos])
              .flat();
            return res.status(200).json(allMediaFiles);
          }
        );
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default new MessageController();
