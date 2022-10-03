import express from "express";
import { index, store, show } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", index);

router.post("/", store);

router.get("/:id", show);

export default router;