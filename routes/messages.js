import express from "express";
import { index, store } from "../controllers/MessageController.js";
const router = express.Router();

router.get("/", function(req, res, next) {
    res.send("Got a response from the messages route");
});

router.get("/", index);

router.post("/", store);

export default router;