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
import { ReviewPolicy } from "../app/http/policies/reviewPolicy.js";
import { ProductReviewController } from "../app/http/controllers/ProductReviewController.js";

const router = express.Router();

router.get("/", ProductPolicy.index, asyncRoute(ProductController.index));

router.post(
    "/",
    ProductPolicy.store,
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true,
    }),
    asyncRoute(ProductController.store)
);

router.get("/:id", ProductPolicy.show, asyncRoute(ProductController.show));

router.put("/:id", ProductPolicy.update,
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true,
    }),
    asyncRoute(ProductController.update)
);

router.delete(
    "/:id",
    ProductPolicy.destroy,
    asyncRoute(ProductController.destroy)
);

//reviews 

router.get("/:id/reviews", ReviewPolicy.index, asyncRoute(ProductReviewController.index));
router.post("/:id/reviews", ReviewPolicy.store, asyncRoute(ProductReviewController.store));
router.put("/:id/reviews/:reviewId", ReviewPolicy.update, asyncRoute(ProductReviewController.update));
router.delete("/:id/reviews/:reviewId", ReviewPolicy.destroy, asyncRoute(ProductReviewController.destroy));


export default router;