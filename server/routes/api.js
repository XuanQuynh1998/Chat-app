import express from "express";
import APIController from "../controllers/APIController.js";

const router = express.Router();

router.get("/user", APIController.getUser)

export default router;
