import express from "express";
import { ConversationController } from "../app/http/controllers/ConversationController.js";
import asyncRoute from "./asyncRoute.js";

const router = express.Router();

router.get("/", asyncRoute(ConversationController.index));

router.post("/", asyncRoute(ConversationController.store));

router.get("/:id", asyncRoute(ConversationController.show));

router.put("/:id", asyncRoute(ConversationController.update));

router.delete("/:id", asyncRoute(ConversationController.destroy));

export default router;