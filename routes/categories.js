import express from "express";
import { CategoryController } from "../app/http/controllers/CategoryController.js";
import { CategoryPolicy } from "../app/http/policies/CategoryPolicy.js";
import asyncRoute from "./asyncRoute.js";

const router = express.Router();

router.get("/", CategoryPolicy.index, asyncRoute(CategoryController.index));

router.post("/", CategoryPolicy.store, asyncRoute(CategoryController.store));

router.get("/:id", CategoryPolicy.show, asyncRoute(CategoryController.show));

router.put("/:id", CategoryPolicy.update, asyncRoute(CategoryController.update));

router.delete("/:id", CategoryPolicy.destroy, asyncRoute(CategoryController.destroy));

export default router;