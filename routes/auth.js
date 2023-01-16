import express from "express";
import { login, register, me } from "../app/http/controllers/AuthController.js";
import asyncRoute from "./asyncRoute.js";
import fileUpload from "express-fileupload";



const router = express.Router();

router.post("/login", asyncRoute(login));

router.post("/register",
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        createParentPath: true,
    }),
    asyncRoute(register));

router.get('/me', asyncRoute(me))


export default router;