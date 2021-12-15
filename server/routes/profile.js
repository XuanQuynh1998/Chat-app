import express from "express";
import ProfileController from "../controllers/ProfileController.js";

const router = express.Router();

router.post("/update_profile", ProfileController.updateProfile);
router.post("/add_friends", ProfileController.addFriends);
router.get("/add_friends_action/:action", ProfileController.addFriendsAction);
router.get("/get_invited_friends", ProfileController.getInvitedFriends);
router.get("/get_friends", ProfileController.getFriends);

export default router;
