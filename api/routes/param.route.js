import express from "express";
import { createParam } from "../controllers/param.controller.js";
const router = express.Router();

router.post("/create", createParam);

export default router;