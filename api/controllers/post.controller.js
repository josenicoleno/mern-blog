import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
import { verifyRecaptcha } from "../utils/recaptcha.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }

  const { recaptchaToken, ...postData } = req.body
  
  // Verificar reCAPTCHA
  const recaptchaResult = await verifyRecaptcha(recaptchaToken)
  if (!recaptchaResult.success) {
    return next(errorHandler(400, "reCAPTCHA verification failed. Please try again."))
  }

  if (!postData.title || !postData.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = postData.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  // Procesar tags: convertir string "Hola, Mundo" en array ["Hola", "Mundo"]
  console.log(postData.tags);
  let tags = [];
  
  if (typeof postData.tags === "string") {
    tags = postData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
  } else if (Array.isArray(postData.tags)) {
    tags = postData.tags;
  }
  const newPost = new Post({
    ...postData,
    tags,
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

export const getPosts = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  try {
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .populate("userId", "username profilePicture")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const totalPostsLastMonth = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      posts,
      totalPosts,
      totalPostsLastMonth,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          tags: req.body.tags,
          status: req.body.status,
          slug: req.body.slug,
        },
      },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
