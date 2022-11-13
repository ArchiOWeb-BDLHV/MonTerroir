import express from "express";
import { ProductorController } from "../app/http/controllers/ProductorController.js";
import { ProductorReviewController } from "../app/http/controllers/ProductorReviewController.js";
import { ProductorPolicy } from "../app/http/policies/productorPolicy.js";
import { ReviewPolicy } from "../app/http/policies/reviewPolicy.js";
import asyncRoute from "./asyncRoute.js";

const router = express.Router();

router.get("/", ProductorPolicy.index, asyncRoute(ProductorController.index));
router.post("/", ProductorPolicy.store, asyncRoute(ProductorController.store));
router.get("/:id", ProductorPolicy.show, asyncRoute(ProductorController.show));
router.put("/:id", ProductorPolicy.update, asyncRoute(ProductorController.update));
router.delete("/:id", ProductorPolicy.destroy, asyncRoute(ProductorController.destroy));

// review routes
router.get("/:id/reviews", ReviewPolicy.index, asyncRoute(ProductorReviewController.index));
router.post("/:id/reviews", ReviewPolicy.store, asyncRoute(ProductorReviewController.store));
router.put("/:id/reviews/:reviewId", ReviewPolicy.update, asyncRoute(ProductorReviewController.update));
router.delete("/:id/reviews/:reviewId", ReviewPolicy.destroy, asyncRoute(ProductorReviewController.destroy));

export default router;