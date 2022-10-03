import express from "express";
import { index, store } from "../app/http/controllers/ReviewController.js";

const router = express.Router();

// router.get("/", function(req, res, next) {
//     res.send("Got a response from the reviews route");
// });

router.get("/", index);
router.post("/", store);

export default router;