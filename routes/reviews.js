import express from "express";
import { index, store, show, update, destroy } from "../controllers/ReviewController.js";

const router = express.Router();

// router.get("/", function(req, res, next) {
//     res.send("Got a response from the reviews route");
// });

router.get("/", index);
router.post("/", store);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;