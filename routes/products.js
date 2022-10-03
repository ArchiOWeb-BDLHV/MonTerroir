import express from "express";
import Product from "../models/product.js";
import { index, store } from "../controllers/ProductController.js";
const router = express.Router();

router.get("/", index);

router.post("/", store);

export default router;