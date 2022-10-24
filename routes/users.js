import express from "express";
import { index, store, show, update, destroy } from "../app/http/controllers/UserController.js";
import asyncRoute from "./asyncRoute.js";
import { is } from "../app/http/middlewares/AuthorizationMiddleware.js";
import { Role } from "../app/models/role.js";
import { UserPolicy } from "../app/http/policies/userPolicy.js";


const router = express.Router();

router.get("/", is(Role.ADMIN), UserPolicy.index, asyncRoute(index))
    .post("/", asyncRoute(store))
    .get("/:id", UserPolicy.show, asyncRoute(show))
    .put("/:id", asyncRoute(update))
    .delete("/:id", asyncRoute(destroy));

export default router;