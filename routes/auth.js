import express from "express";
import { login, register, me } from "../app/http/controllers/AuthController.js";
import asyncRoute from "./asyncRoute.js";



const router = express.Router();

router.post("/login", asyncRoute(login));

router.post("/register", asyncRoute(register));

router.get('/me', asyncRoute(me))


export default router;