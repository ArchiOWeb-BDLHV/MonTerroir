import express from "express";
import { index, store, show, update, destroy } from "../app/http/controllers/UserController.js";
import asyncRoute from "./asyncRoute.js";
import { is } from "../app/http/middlewares/AuthorizationMiddleware.js";
import { Role } from "../app/models/role.js";


const router = express.Router();

router.get("/", is(Role.ADMIN), asyncRoute(index));

router.post("/", asyncRoute(store));

router.get("/:id", asyncRoute(show));

router.put("/:id", asyncRoute(update));

router.delete("/:id", asyncRoute(destroy));

export default router;