import express from "express";
import { ConversationController } from "../app/http/controllers/ConversationController.js";
import { MessageController } from "../app/http/controllers/MessageController.js";
import { MessagePolicy } from "../app/http/policies/messagePolicy.js";
import asyncRoute from "./asyncRoute.js";
import { ConversationPolicy } from "../app/http/policies/conversationPolicy.js";

const router = express.Router();

router.get("/", ConversationPolicy.index, asyncRoute(ConversationController.index));

router.post("/", ConversationPolicy.store, asyncRoute(ConversationController.store));

router.get("/:id", ConversationPolicy.show, asyncRoute(ConversationController.show));

router.put("/:id", ConversationPolicy.update, asyncRoute(ConversationController.update));

router.delete("/:id", ConversationPolicy.destroy, asyncRoute(ConversationController.destroy));


//message

router.get("/:convId/messages", MessagePolicy.index, asyncRoute(MessageController.index));
router.post("/:convId/messages", MessagePolicy.store, asyncRoute(MessageController.store));
router.get("/:convId/messages/:messageId", MessagePolicy.show, asyncRoute(MessageController.show));
router.put("/:convId/messages/:messageId", MessagePolicy.update, asyncRoute(MessageController.update));
router.delete("/:convId/messages/:messageId", MessagePolicy.destroy, asyncRoute(MessageController.destroy));



export default router;