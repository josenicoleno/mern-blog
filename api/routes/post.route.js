import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/");
router.post("/create", verifyToken, createPost);
router.put("/update/:postId", verifyToken, updatePost);
router.delete("/delete/:postId", verifyToken, deletePost);

export default router;
