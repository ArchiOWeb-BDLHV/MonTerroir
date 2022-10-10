import express from "express";
import { index, store, show, update, destroy } from "../app/http/controllers/ReviewController.js";
import safeRoute from "./safeRoute.js";

const router = express.Router();

// router.get("/", function(req, res, next) {
//     res.send("Got a response from the reviews route");
// });

router.get("/", safeRoute(index));
router.post("/", safeRoute(store));
router.get("/:id", safeRoute(show));
router.put("/:id", safeRoute(update));
router.delete("/:id", safeRoute(destroy));

export default router;