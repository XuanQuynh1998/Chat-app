import express from "express";
import ConversationController from "../controllers/ConversationController.js";

const router = express.Router();

router.post("/", ConversationController.conversation);
router.get("/:userId", ConversationController.getConversation);

export default router;
