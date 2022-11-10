// import express from "express";
// import {
//     index,
//     store,
//     show,
//     update,
//     destroy,
// } from "../app/http/controllers/ProductController.js";
// import asyncRoute from "./asyncRoute.js";

import express from "express";
import { ProductController } from "../app/http/controllers/ProductController.js";
import { ProductPolicy } from "../app/http/policies/productPolicy.js";
import asyncRoute from "./asyncRoute.js";
import fileUpload from "express-fileupload";

const router = express.Router();

router.get("/", ProductPolicy.index, asyncRoute(ProductController.index));

router.post(
  "/",
  ProductPolicy.store,
  fileUpload,
  asyncRoute(ProductController.store)
);

router.get("/:id", ProductPolicy.show, asyncRoute(ProductController.show));

router.put("/:id", ProductPolicy.update, asyncRoute(ProductController.update));

router.delete(
    "/:id",
    ProductPolicy.destroy,
    asyncRoute(ProductController.destroy)
);

export default router;