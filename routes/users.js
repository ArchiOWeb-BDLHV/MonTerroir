import express from "express";
import { UserController } from "../app/http/controllers/UserController.js";
import { UserPolicy } from "../app/http/policies/UserPolicy.js";
import asyncRoute from "./asyncRoute.js";

const router = express.Router();

router.get("/", UserPolicy.index, asyncRoute(UserController.index));

router.post("/", UserPolicy.store, asyncRoute(UserController.store));

router.get("/:id", UserPolicy.show, asyncRoute(UserController.show));

router.put("/:id", UserPolicy.update, asyncRoute(UserController.update));

router.delete("/:id", UserPolicy.destroy, asyncRoute(UserController.destroy));

export default router;