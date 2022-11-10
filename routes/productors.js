import express from "express";
import { ProductorReviewController } from "../app/http/controllers/ProductorReviewController.js";
import { ReviewPolicy } from "../app/http/policies/reviewPolicy.js";
import asyncRoute from "./asyncRoute.js";

const router = express.Router();

router.get("/", ReviewPolicy.index, asyncRoute(ProductorReviewController.index));
router.post("/", ReviewPolicy.store, asyncRoute(ProductorReviewController.store));
// router.get("/:id", ReviewPolicy.show, asyncRoute(ProductorReviewController.show));
router.put("/:id", ReviewPolicy.update, asyncRoute(ProductorReviewController.update));
router.delete("/:id", ReviewPolicy.destroy, asyncRoute(ProductorReviewController.destroy));

// review routes
router.get("/:id/reviews", asyncRoute(ProductorReviewController.index));

export default router;
