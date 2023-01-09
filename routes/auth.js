import express from "express";
import { login, register } from "../app/http/controllers/AuthController.js";
import asyncRoute from "./asyncRoute.js";


const router = express.Router();

router.post("/login", asyncRoute(login));

router.post("/register",
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true,
    }),
    asyncRoute(register));


export default router;