import express from "express";
import { ConversationController } from "../app/http/controllers/ConversationController.js";
import { MessageController } from "../app/http/controllers/MessageController.js";
import { MessagePolicy } from "../app/http/policies/messagePolicy.js";
import asyncRoute from "./asyncRoute.js";

const router = express.Router();

router.get("/", asyncRoute(ConversationController.index));

router.post("/", asyncRoute(ConversationController.store));

router.get("/:id", asyncRoute(ConversationController.show));

router.put("/:id", asyncRoute(ConversationController.update));

router.delete("/:id", asyncRoute(ConversationController.destroy));


//message

router.get("/:convId/messages", MessagePolicy.index, asyncRoute(MessageController.index));


export default router;