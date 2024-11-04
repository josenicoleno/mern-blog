import express from "express";
import { createParam, deleteParam, getParams, updateParam } from "../controllers/param.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, createParam);
router.get("/:key", getParams);
router.put("/:id", verifyToken, updateParam);
router.delete("/:id", verifyToken, deleteParam);

export default router;