import express from "express";
import { MessageController } from "../app/http/controllers/MessageController.js";
import asyncRoute from "./asyncRoute.js";


const router = express.Router();

router.get("/", asyncRoute(MessageController.index));

router.post("/", asyncRoute(MessageController.store));

router.get("/:id", asyncRoute(MessageController.show));

router.put("/:id", asyncRoute(MessageController.update));

router.delete("/:id", asyncRoute(MessageController.destroy));

export default router;