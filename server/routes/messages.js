import express from "express";
import MessageController from "../controllers/MessageController.js";

const router = express.Router();

router.post("/", MessageController.messages);
router.get("/lastest_messages", MessageController.getLastestMessages);
router.get("/all_media_files/:conversationId", MessageController.getAllMediaFiles);
router.get("/:conversationId", MessageController.getMessages);

export default router;
