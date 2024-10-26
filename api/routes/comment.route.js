import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComment,
  likeComment,
  getComments
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComment/:postId", getPostComment);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/update/:commentId", verifyToken, editComment);
router.delete("/delete/:commentId", verifyToken, deleteComment);
router.get("/", verifyToken, getComments);

export default router;
