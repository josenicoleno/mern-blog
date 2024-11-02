import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../routes/user.route.js";
import authRoutes from "../routes/auth.route.js";
import postRoutes from "../routes/post.route.js";
import commentRoutes from "../routes/comment.route.js";
import categoryRoutes from "../routes/category.route.js";
import contactRoutes from "../routes/contact.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import ServerlessHttp from "serverless-http";
import { Module } from "module";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const app = express();

const router = express.Router();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/contact", contactRoutes);

const __variableOfChoice = path.resolve();
app.use(express.static(path.join(__variableOfChoice, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__variableOfChoice, "/client/dist/index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.use("/.netlify/functions/index", router);
export default router;
export const handler = ServerlessHttp(app);
