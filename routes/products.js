import express from "express";
import {
    index,
    store,
    show,
    update,
    destroy,
} from "../app/http/controllers/ProductController.js";
import asyncRoute from "./asyncRoute.js";

const router = express.Router();

router.get("/", asyncRoute(index));

router.post("/", asyncRoute(store));

router.get("/:id", asyncRoute(show));

router.put("/:id", asyncRoute(update));

router.delete("/:id", asyncRoute(destroy));

export default router;