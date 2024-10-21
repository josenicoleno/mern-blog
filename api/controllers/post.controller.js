import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const getPosts = async (req, res, next) => {};
export const getPost = async (req, res, next) => {};
export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json({ savedPost });
  } catch (error) {
    next(error);
  }
};
export const updatePost = async (req, res, next) => {};
export const deletePost = async (req, res, next) => {};
