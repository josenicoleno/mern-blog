import express from "express";
import { routerNetlify } from "../controllers/netlify.controller.js";
const router = express.Router();

router.get("/", routerNetlify);

export default router;