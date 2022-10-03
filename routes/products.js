import express from "express";
const router = express.Router();

router.get("/", function(req, res, next) {
    res.send("Vous optonez la liste des produits");
});

export default router;