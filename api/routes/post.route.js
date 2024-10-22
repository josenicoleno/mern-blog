import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/getposts", getPosts);
router.get("/post/:slug", getPost);
router.post("/create", verifyToken, createPost);
router.put("/update/:postId", verifyToken, updatePost);
router.delete("/delete/:postId/:userId", verifyToken, deletePost);

export default router;
