import express from "express";
import { index, store } from "../app/http/controllers/MessageController.js";
const router = express.Router();

router.get("/", index);

router.post("/", store);

export default router;