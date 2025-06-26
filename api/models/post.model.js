import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://www.hostinger.it/tutorial/wp-content/uploads/sites/24/2023/09/come-scrivere-un-blog-768x334.webp",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    tags: {
      type: [String],
      default: [],
    },
    status:{
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
