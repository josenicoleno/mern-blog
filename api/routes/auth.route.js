import express from "express";
import {
  signup,
  signin,
  googleAuth,
  forgotPassword,
  resetPassword,
  getUserByToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/reset-password/:token", getUserByToken);

export default router;
