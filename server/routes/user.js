import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/check_login", UserController.checkLogin);
router.get("/user", UserController.getUserInfo);
router.get("/logout", UserController.logout);

export default router;
